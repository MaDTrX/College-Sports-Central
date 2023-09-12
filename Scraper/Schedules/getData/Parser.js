const fetch = require('node-fetch');
const cheerio = require('cheerio');
const _ = require('underscore')
const moment = require('moment');
const dateTimeUtil = require('../cleanData/dateTimeUtil');

const fs = require('fs');
const axios = require('axios')
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

const sideArm = require('./sidearms/sidearm');
const sideArmPuppeteer = require('./sidearms/sideArmPuppeteer');
//const presto = require('./presto/eventGroupScraper');
//const streamline = require('./streamline/streamLineScraper')
const wmt = require('./wmt/wmt')
const logging = require('../services/dataDogLogging').config({ service:'school-schedule-scraper'});

async function Scrape(school, sportCode) {
    const logEntry = {
        'school': {
            'ncaaOrgId': school.ncaaOrgID,
            'schoolName': school.schoolName
        },
        'sportCode': sportCode
    }
    const scraper = DetermineParser(school);
    if (!scraper) {
        return;
    }
    logEntry.parser = scraper.name;

    if (!school.sportCodeUrls[sportCode]) {
        return;
    }
    let scheduleUrl = school.sportCodeUrls[sportCode];
    if (scheduleUrl[0] === '/') {
        if (school.athleticUrl[school.athleticUrl.length-1] === '/') {
            school.athleticUrl = school.athleticUrl.substr(0,school.athleticUrl.length-1);
        }
        scheduleUrl = school.athleticUrl + scheduleUrl;
    }
    if (school.isGrid && 
        scheduleUrl.includes("grid=true") === false) {
            if (scheduleUrl.includes("?")) {
                scheduleUrl += "&"
            }
            else {
                scheduleUrl += "?";
            }
            scheduleUrl += "grid=true"
        }
    logEntry.scheduleUrl = scheduleUrl;

    try {
        let data ='';
        // makes a request
        const res = await fetch(scheduleUrl)
        if (!res.ok) {
            console.error(res.status + ':' + res.statusText,logEntry);
            await DisableSportUrl(school,sportCode,res.status + ':' + res.statusText,new Date())
            return;
        }

        data = await res.text();
        if (res.redirected) {
            school.redirected = res.url;
        }
        
        let $ = cheerio.load(data);
        let parsedSite = [];
        try {
            parsedSite = await scraper(school, sportCode,$);
            if (!parsedSite) {
                console.warn('   Nothing returned from parser: ' + school.ncaaOrgID + '-' + school.schoolName + ' (' + sportCode + ')',logEntry);
                if (school.parser === "SideArm") {
                    school.parser = "SideArm2";
                    school.location = undefined;
                    try {
                        await axios.post(process.env.SchoolScheduleIntakeUrl + '/references/Schools', school, { httpsAgent: agent })
                    } catch (err) {
                        console.error('routine.sendData: ' + err.message + ' Request: ' + err.request.path + '\r\n' + err,logEntry)
                    }
                }
                try
                {
                    let $ = await sideArmPuppeteer.Load(scheduleUrl);
                    parsedSite = await scraper(school, sportCode,$);

                    if (!parsedSite) {
                        console.error('    Nothing returned from parser: ' + school.ncaaOrgID + '-' + school.schoolName + ' (' + sportCode + ')',logEntry);
                        await DisableSportUrl(school,sportCode,'Nothing returned from SideArm',new Date());
                        return;
                    }
                }
                catch (err) {
                    console.error('    ' + err.message + ': ' + school.ncaaOrgID + '-' + school.schoolName + ' (' + sportCode + ')',logEntry);
                    await DisableSportUrl(school,sportCode,err.message,new Date());
                    return;
                }
            }
        }
        catch (err) {
            console.error('    ' + err.message + ': ' + school.ncaaOrgID + '-' + school.schoolName + ' (' + sportCode + ')',logEntry);
            await DisableSportUrl(school,sportCode,err.message,new Date());
            return;
        }
        console.info('   ' + parsedSite[0].academicYear + ' ' + parsedSite[0].sportCode + ' ' + parsedSite[0].schoolName + ': ' + parsedSite.length,logEntry)
        let schoolSend = _.map(parsedSite,function(item) {
            return { 
                division: 1,
                academicYear: item.academicYear,
                schoolName: item.schoolName,
                accountID: item.accountID,
                ncaaOrgID: item.ncaaOrgId,
                sportCode: item.sportCode,
                redirectUrl: item.redirectUrl,
    
                compEventName: item.compEventName,
                opponentAccountID: item.opponentAccountID,
                opponentNCAAOrgId: item.opponentNCAAOrgId,
                compEventDateTime: item.compEventDateTime,
                compEventTimeZone: item.compEventTimeZone,
                status: item.status,
                compEventLocName: item.compEventLocName,
                venueHostStatus: item.venueHostStatus,
                latLng: {
                    Lat: item.latLng ? item.latLng.lat : '',
                    Lng: item.latLng ? item.latLng.lng : '',
                },
                compEventDistances: item.compEventDistance,
            }
        });
        if (schoolSend.length) {
            try {
                await axios.post(process.env.SchoolScheduleIntakeUrl + '/intake', schoolSend, { httpsAgent: agent })
            } catch (err) {
                console.error('routine.sendData: ' + err.message + ' Request: ' + err.request.path + '\r\n' + err,logEntry)
                return;
            }
        }
        return parsedSite;
    } catch (err) {
        console.error('parser.Scrape: '+ err.message + ' ' + school.sportCodeUrls[sportCode] + '\r\n'+ err,logEntry);
        return;
    }
}
async function DisableSportUrl(school,sportCode,reason,deactivationDate) {
    var disabled = await axios.post(process.env.SchoolScheduleIntakeUrl + '/intake/DisableUrl', [{
        "ncaaOrgId": school.ncaaOrgID,
        "schoolName": school.schoolName,
        "sportCode": sportCode,
        "url": school.sportCodeUrls[sportCode],
        "reason": reason,
        "deactivationDate": deactivationDate
    }], { httpsAgent: agent })
    var response = await disabled.data;
    return response;
}
function DetermineParser(school) {
    switch (school.parser.toLowerCase()) {
        case "sidearm":
            return sideArm.sidearmScrape;
        case "sidearm2":
            return sideArm.sidearmScrape;
        case "wmt":
            return wmt.wmtScrape;
            return 
        default:
            return null;
    }
}
module.exports = {
    Scrape
}