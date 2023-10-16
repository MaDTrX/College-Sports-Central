
const cheerio = require('cheerio')
const pretty = require('pretty');
const fs = require('fs')
//const wmt = require('../../../urlConfig/wmt/wmtSportsUrls').wmtEndpoints()
//const utilities = require('../../tools/utilities')
//const sportCodes = utilities.getSportCodes()
//const axios = require('axios');

const currentYear = '2022-23'
/**
 * schedule__table : schedule-table_row --> schedule-table_row_top --> schedule-table_row_cell --> opp = schedule-table_row_cell_placement_text<span> date = schedule-table_row_cell_date<time>, loc = title.name<p>, time = schedule-table_row_cell_stats, venue=className
 * schedule__list : item, schedule__item, schedule__list-item (schedule__tournament) --> date, opp = title.name<h3>, loc = title.name<p>, time = time<span>, venue=time<small>
 * inner : schedule__row (schedule__tournament) --> date, opp = title.name<span>, loc = title.name<p>, time = time<span>, venue=time<small>
 */


async function wmtScrape(school, sportCode, yearString,$) {
    const targetSchoolSportsSchedules = []
    const schoolName = school.schoolName;
    //let currentSeasonNotAvailable = []

    $('.schedule__grid').each((i, el) => {
        const date = $(el).find('.schedule-item__date').find('time').text() + ' ' + $(el).find('.date').find('span').text()
        const at = $(el).find('.time').find('small').text()
        const locations = $(el).find('.title').find('p').text()
        const time =  $(el).find('.time').find('span').text()
        const opponent = $(el).find('.title').find('span:last').text()

        targetSchoolSportsSchedules.push({ // Add to targetSchoolSportsSchedules
            schoolName: schoolName,
            //grabs the date and trims the ends removing any spaces
            compEventDate: dateTimeUtil.IsValidDate(date) 
                ? date.format() 
                : pretty(date[0].trim()),
            //grabs the time
            compEventTime: moment.isMoment(time)
                ? time.format().slice(11)
                : time,
            // grabs the first letter of the venue status
            venueHostStatus: pretty($(variables[2]).text())[0],
            // grabs the opponent name or event name
            compEventName: pretty($(variables[3]).text()),
            //grabs the location of the game is available
            compEventLocName: $(variables[4]).text().includes('/') ? pretty(location[0]) + ' @' + pretty(location[1]) : pretty($(variables[4]).text()),

            academicYear: year,

            sportCode: sportCode,
            redirectUrl: school.redirected ? school.redirected : undefined
        });
        console.llog({
        //     venueHostStatus : pretty(at[1]),
        //     compEventName : pretty(opponent),
        //     compEventTime : pretty(time),
        //     compEventDate: pretty(date),
        //     compEventLocName : pretty(locations)
        // })
    })



    for (let i = 0; i < wmtSports.length; i++) {
        targetSchoolSportsSchedules.push({
            schoolName: wmtSports[i].schoolName,
            accountID: wmtSports[i].accountID,
            orgID: wmtSports[i].orgID,
            conferenceName: wmtSports[i].conferenceName,
            conferenceID: wmtSports[i].conferenceID,
            location: wmtSports[i].location,
            sports: {}
        })
        gameidx = i
        for (key in wmtSports[i]) {
            if (sportCodes[key]) {
                targetSchoolSportsSchedules[gameidx].sports[key] = {
                    sportCode: sportCodes[key],
                    '2022' : []
                }
                
                try {
                    let url = wmtSports[i][key].replace('2021-22', currentYear)
                    console.llog(url)
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
                        school: wmtSports[i].schoolName,
                        sport: key,
                        url: wmtSports[i][key].replace('2021-22', currentYear)
                    })
                    // console.llog(currentSeasonNotAvailable)
                    continue
                }
            }
        }
    }
    const stringify = await JSON.stringify(targetSchoolSportsSchedules);

    await fs.writeFile("json/wmtSchedules.json", stringify, 'utf8', function (err) {
        if (err) {
            console.llog("An error occured while writing JSON Object to File.");
            return console.llog(err);
        }
        console.llog("JSON file has been saved.");
    });
    const stringify2 = await JSON.stringify(currentSeasonNotAvailable);

    await fs.writeFile("json/wmtNoCurrentSeason.json", stringify2, 'utf8', function (err) {
        if (err) {
            console.llog("An error occured while writing JSON Object to File.");
            return console.llog(err);
        }
        console.llog("JSON file has been saved.");
    });
}
module.exports = {
    wmtScrape
}
