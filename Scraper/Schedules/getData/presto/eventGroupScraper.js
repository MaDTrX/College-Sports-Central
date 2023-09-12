
const cheerio = require('cheerio')
const pretty = require('pretty');
const fs = require('fs')
const presto = require('../../../urlConfig/prestoSports/prestoSportsUrls').prestoEndpoints()
const utilities = require('../../tools/utilities')
const sportCodes = utilities.getSportCodes()
const axios = require('axios');
const { prestoSports } = require('../../../urlConfig/prestoSports/prestoSportsSchools');

const currentYear = '2022-23'

async function getEventGroupSchedules() {
    let prestoSports = await presto
    console.log(prestoSports, 'prestooooo')
    let gameidx
    let targetSchoolSportsSchedules = []
    let currentSeasonNotAvailable = []
    for (let i = 0; i < prestoSports.length; i++) {
        targetSchoolSportsSchedules.push({
            schoolName: prestoSports[i].schoolName,
            accountID: prestoSports[i].accountID,
            orgID: prestoSports[i].orgID,
            conferenceName: prestoSports[i].conferenceName,
            conferenceID: prestoSports[i].conferenceID,
            location: prestoSports[i].location,
            sports: {}
        })
        gameidx = i
        for (key in prestoSports[i]) {
            if (sportCodes[key]) {
                targetSchoolSportsSchedules[gameidx].sports[key] = {
                    sportCode: sportCodes[key],
                    '2022' : []
                }
                
                try {
                    let url = prestoSports[i][key].replace('2021-22', currentYear)
                    console.log(url)
                    const res = await axios.get(url)
                    const $ = cheerio.load(res.data)
                    $('.event-row').each((i, el) => {
                        let splitDate = $(el).find('.date').attr('title').split('.')
                        let date = splitDate[1].trim()
                        targetSchoolSportsSchedules[gameidx].sports[key]['2022'].push ({
                            compEventDate: date,
                            venueHostStatus : $(el).find('.venue').attr('title')[0],
                            compEventName: $(el).find('.team-name').text().trim(),
                            compEventTime : $(el).find('.status').text().trim(),
                        })
                    })
                } catch (err) {
                    currentSeasonNotAvailable.push({
                        school: prestoSports[i].schoolName,
                        sport: key,
                        url: prestoSports[i][key].replace('2021-22', currentYear)
                    })
                    // console.log(currentSeasonNotAvailable)
                    continue
                }
            }
        }
    }
    const stringify = await JSON.stringify(targetSchoolSportsSchedules);

    await fs.writeFile("json/prestoSchedules.json", stringify, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
    const stringify2 = await JSON.stringify(currentSeasonNotAvailable);

    await fs.writeFile("json/prestoNoCurrentSeason.json", stringify2, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
}
getEventGroupSchedules()