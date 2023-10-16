require('dotenv').config()
const _ = require('underscore')
const axios = require('axios')
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });
const Sentry = require("@sentry/node")
const parser = require('./Schedules/getData/Parser')

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

async function sendData(args) {
    request.Args = args;
    RegisterProcess('Start');

    const page = args[0];
    const pageSize = args[1];

    let url = process.env.SchoolScheduleIntakeUrl + '/References/Schools?page=' + page + '&pageSize=' + pageSize;
    if (args.length === 3) {
        url += '&' + args[2];
    }
    let schools = [];
    let res = await axios.get(url, { httpsAgent: agent })
                         .then(function(res) {
                            schools = res.data;
                         },function (err) {
                            Sentry.captureException(err)
                            throw err;
                         });
    var i = 0;
    const totalSchools = Object.keys(schools).length;
    for (const schoolNameKey in schools) {
        console.info('Processing[' + (++i) + '/' + totalSchools + ']: ' + schoolNameKey + ' Sports: ' + Object.keys(schools[schoolNameKey].sportCodeUrls).length)

        for (const sportsCodeKey in schools[schoolNameKey].sportCodeUrls) {
            console.info('  ' + sportsCodeKey + ' (' + schools[schoolNameKey].sportCodeUrls[sportsCodeKey] + ')');
            await parser.Scrape(schools[schoolNameKey], sportsCodeKey)
        }
    }
    RegisterProcess('Stop')
}
function GroupBySchools(schools) {
    let schoolGroupsWork = _.groupBy(schools, function (item) {
        return item.academicYear + '#' + item.schoolName + '#' + item.ncaaOrgID + '#' + item.accountID;
    });
    let schoolGroups = _.map(schoolGroupsWork, function (group) {
        return {
            academicYear: group[0].academicYear,
            schoolName: group[0].schoolName,
            ncaaOrgID: group[0].ncaaOrgID,
            accountID: group[0].accountID,
            sports: GroupBySports(group)
        }
    });
    return schoolGroups;
}
function GroupBySports(sports) {
    var sportsGroupWork = _.groupBy(sports,function(item) {
        return item.sportCode + '#' + item.redirectUrl;
    })
    var sportsGroup = _.map(sportsGroupWork, function (group) {
        return {
            sportCode: group[0].sportCode,
            redirectUrl: group[0].redirectUrl,
            games: _.map(group,function(item) {
                return {
                    compEventName: item.compEventName,
                    opponentAccountID: item.opponentAccountID,
                    opponentNCAAOrgId: item.opponentNCAAOrgId,
                    compEventDateTime: item.compEventDateTime,
                    compEventTimeZone: item.compEventTimeZone,
                    compEventLocName: item.compEventLocName,
                    venueHostStatus: item.venueHostStatus,
                    latLng: {
                        Lat: item.latLng ? item.latLng.lat : '',
                        Lng: item.latLng ? item.latLng.lng : '',
                    },
                    compEventDistances: item.compEventDistance,
                }
            })
        }
    });
    return sportsGroup;
}
const request = {
    "Action": '',
    "ProcessId": process.pid,
    "ProcessName": process.title,
    "Args": undefined,
    "ProcessStart": new Date(),
    "ProcessEnd": undefined 
 };
let currentProcess = {};
let time1 = undefined;
async function RegisterProcess(action) {
    request.Action = 0;
    if (action ==='Stop') {
        request.Action = 1;
        request.ProcessEnd = new Date();
    } else {
        time1 = performance.now();
        console.info(action +': '+ process.argv.slice(2).join(', '));
        request.Args = process.argv.slice(2);
        request.IsRunning = true;
    }
    try {
        // const currentProcessTask = await axios.post(process.env.SchoolScheduleIntakeUrl + '/Intake/Process', request, { httpsAgent: agent })
        currentProcess = await currentProcessTask.data;
    }
    catch (err) {
       Sentry.captureException(err)
    }
    if (action === 'Stop') {
        let time2 = performance.now()
        let diff = Math.floor(time2 - time1)

        console.info('routine: End of routine.sendData()\r\nSend to Intake: ' + diff / 1000 + ' secs');
    }
}
module.exports = {
    sendData
}

var args = [];
if (process.argv.length > 2) {
    args = process.argv.slice(2);
}
sendData(args)
