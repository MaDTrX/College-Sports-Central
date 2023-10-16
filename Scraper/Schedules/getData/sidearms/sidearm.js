require('dotenv');
const cheerio = require('cheerio')
const pretty = require('pretty');
const _ = require('underscore');
const moment = require('moment');

const locEditor = require('../../cleanData/editLocTime')
const nameOfficial = require('../../cleanData/nameOff')
const oppName = require('../../cleanData/oppName')
const idInsert = require('../../cleanData/addIDs')
//const distances = require('../../cleanData/addDistance')

const dateTimeUtil = require('../../cleanData/dateTimeUtil');
// const logging = require('../../services/dataDogLogging').config({ service:'school-schedule-scraper'});

async function sidearmScrape(school, sportCode,$) {
    const targetSchoolSportsSchedules = []
    const schoolName = school.schoolName;
    try {
        //grabs schedule title containing year and splits it to and array, first index is the year
        const year = FindSeasonYear($);

        //tranforms year to fit schema
        $('tbody').each((o, el) => {
            $(el).find('tr').each((p, el) => {
                const variables = $(el).find('td').toArray()
                const location = $(variables[4]).text().split('/')
                let date = dateTimeUtil.ParseDate($(variables[0]).text().trim());
                let timed = dateTimeUtil.ParseTime($(variables[1]).text().trim());
                            
                if (!dateTimeUtil.IsValidDate(date)) {
                    var test = pretty(date[0].trim())
                }
                const schoolSchedule = { 
                    schoolName: schoolName,
                    //grabs the date and trims the ends removing any spaces
                    compEventDate: dateTimeUtil.IsValidDate(date) 
                        ? date.format() 
                        : pretty(date[0].trim()),
                    //grabs the time
                    compEventTime: moment.isMoment(timed)
                        ? timed.format().slice(11)
                        : timed,
                    // grabs the first letter of the venue status
                    venueHostStatus: pretty($(variables[2]).text())[0],
                    // grabs the opponent name or event name
                    compEventName: pretty($(variables[3]).text()),
                    //grabs the location of the game is available
                    compEventLocName: $(variables[4]).text().includes('/') ? pretty(location[0]) + ' @' + pretty(location[1]) : pretty($(variables[4]).text()),

                    academicYear: year,

                    sportCode: sportCode,
                    redirectUrl: school.redirected ? school.redirected : undefined
                }
                // Add to targetSchoolSportsSchedules
                if (schoolSchedule.compEventName) {
                    targetSchoolSportsSchedules.push(schoolSchedule)
                }
            })
        });        
    } catch (err) {
        console.lerror('scraper.sidearmScrape: '+ err.message + ' ' + school.sportCodeUrls[sportCode] + '\r\n'+ err);
        throw err;
    }

    if (targetSchoolSportsSchedules.length > 0) {
        try {
            let editLocation = await locEditor.editLocTime(targetSchoolSportsSchedules)
            let opp = await oppName.oppConvert(editLocation)
            let nameOff = await nameOfficial.convertNames(school,opp)
            let insertID = await idInsert.getIDs(school,nameOff)
        //let distCalc = await distances.getDistances(insertID)
        } catch (err) {
            console.lerror('scraper.sidearmScrape: '+ err.message + ' ' + school.sportCodeUrls[sportCode] + '\r\n'+ err);
            // swallow the exception
        }
        return targetSchoolSportsSchedules;
    }
}
async function sidearmScrape2(school, sportCode,$) {
    const targetSchoolSportsSchedules = []
    const schoolName = school.schoolName;
    try {
        //grabs schedule title containing year and splits it to and array, first index is the year
        const year = FindSeasonYear($);

        //tranforms year to fit schema
        $('.s-game-card').each((o, el) => {
            $(el).find('.s-game-card__header-inner-top-inner').each((p, el2) => {
                const gameCard = {};
                gameCard.OpponentName = $(el2).find('.s-game-card__header__team-event-info a')[0].firstChild.data;
                const variables = $(el2).find('p span').toArray();
                var index = 0;
                if ($(variables[index]).children.length === 0) {
                    index++;
                }
                gameCard.LocationName = $(variables[index]).children[0].data;
                //var venueName = undefined;
                if ($(variables[index+1]).attribs &&
                    $(variables[index+1]).attribs.class &&
                    $(variables[index+1]).attribs.class.search(/rounded\-full/g) > -1) {
                    gameCard.VenueName = gameCard.LocationName;
                    gameCard.LocationName = variables[index+1].children[0].data;
                    index += 2;
                }
                index++;
                gameCard.Date = dateTimeUtil.ParseDate(variables[index].children[0].data);
                if (variables[index+1].attribs.class.search(/rounded\-full/g) > -1) {
                    gameCard.Time = dateTimeUtil.ParseTime(variables[index+2].lastChild.data.trim());
                }
                var card = { // Add to targetSchoolSportsSchedules
                    schoolName: schoolName,
                    compEventDate: dateTimeUtil.IsValidDate(gameCard.Date) 
                        ? gameCard.Date.format() 
                        : pretty(gameCard.Date),
                    //grabs the time
                    compEventTime: moment.isMoment(gameCard.Time)
                        ? gameCard.Time.format().slice(11)
                        : gameCard.Time,
                    compEventName: gameCard.OpponentName,
                    //grabs the location of the game is available
                    compEventLocName: gameCard.VenueName !== undefined
                                        ? gameCard.VenueName + ' @ ' + gameCard.LocationName
                                        : gameCard.LocationName,
                    venueHostStatus: gameCard.VenueName !== undefined
                                        ? 'H'
                                        : 'A',
 
                    academicYear: year,

                    sportCode: sportCode,
                    redirectUrl: school.redirected ? school.redirected : undefined
                };           
                targetSchoolSportsSchedules.push(card)
            })
        });        
    } catch (err) {
        console.lerror('scraper.sidearmScrape: '+ err.message + ' ' + school.sportCodeUrls[sportCode] + '\r\n'+ err);
        throw err;
    }

    if (targetSchoolSportsSchedules.length > 0) {
        try {
            let editLocation = await locEditor.editLocTime(targetSchoolSportsSchedules)
            let opp = await oppName.oppConvert(editLocation)
            let nameOff = await nameOfficial.convertNames(school,opp)
            let insertID = await idInsert.getIDs(school,nameOff)
        //let distCalc = await distances.getDistances(insertID)
        } catch (err) {
            console.lerror('scraper2.sidearm2Scrape: '+ err.message + ' ' + school.sportCodeUrls[sportCode] + '\r\n'+ err);
            // swallow the exception
        }
        return targetSchoolSportsSchedules;
    }
}
async function sidearmScrape2(school, sportCode,$) {
    const targetSchoolSportsSchedules = []
    const schoolName = school.schoolName;
    try {
        //grabs schedule title containing year and splits it to and array, first index is the year
        const year = FindSeasonYear($);

        //tranforms year to fit schema
        ;
        $('.s-game-card').each((o, el) => {
            $(el).find('.s-game-card__header-inner-top-inner').each((p, el2) => {
                const gameCard = {};
                gameCard.OpponentName = $(el2).find('.s-game-card__header__team-event-info a')[0].firstChild?.data;
                const variables = $(el2).find('p span').toArray();
                var index = 0;
                if (variables[index].children.length === 0) {
                    index++;
                }
                gameCard.LocationName = variables[index].firstChild?.data;
                //var venueName = undefined;
                if (variables[index+1].attribs?.class?.search(/rounded\-full/g) > -1) {
                    gameCard.VenueName = gameCard.LocationName;
                    gameCard.LocationName = variables[index+2].firstChild?.data;
                    index += 2;
                }
                index++;
                gameCard.Score = variables[index++].firstChild?.data;
                gameCard.Date = dateTimeUtil.ParseDate(variables[index].firstChild?.data);
                if (variables[index+1].attribs?.class?.search(/rounded\-full/g) > -1) {
                    gameCard.Time = dateTimeUtil.ParseTime(variables[index+2].lastChild?.data.trim());
                }
                var card = { // Add to targetSchoolSportsSchedules
                    schoolName: schoolName,
                    compEventDate: dateTimeUtil.IsValidDate(gameCard.Date) 
                        ? gameCard.Date.format() 
                        : pretty(gameCard.Date),
                    //grabs the time
                    compEventTime: moment.isMoment(gameCard.Time)
                        ? gameCard.Time.format().slice(11)
                        : gameCard.Time,
                    compEventName: gameCard.OpponentName,
                    //grabs the location of the game is available
                    compEventLocName: gameCard.VenueName !== undefined
                                        ? gameCard.VenueName + ' @ ' + gameCard.LocationName
                                        : gameCard.LocationName,
                    venueHostStatus: gameCard.VenueName !== undefined
                                        ? 'H'
                                        : 'A',
 
                    academicYear: year,

                    sportCode: sportCode,
                    redirectUrl: school.redirected ? school.redirected : undefined
                };           
                targetSchoolSportsSchedules.push(card)
            })
        });        
    } catch (err) {
        console.lerror('scraper.sidearmScrape2: '+ err.message + ' ' + school.sportCodeUrls[sportCode] + '\r\n'+ err);
        throw err;
    }

    if (targetSchoolSportsSchedules.length > 0) {
        try {
            let editLocation = await locEditor.editLocTime(targetSchoolSportsSchedules)
            let opp = await oppName.oppConvert(editLocation)
            let nameOff = await nameOfficial.convertNames(school,opp)
            let insertID = await idInsert.getIDs(school,nameOff)
            //let distCalc = await distances.getDistances(insertID)
        } catch (err) {
            console.lerror('scraper2.sidearm2Scrape: '+ err.message + ' ' + school.sportCodeUrls[sportCode] + '\r\n'+ err);
            // swallow the exception
        }
        return targetSchoolSportsSchedules;
    }
}

function FindSeasonYear($) {
    //let altYear = yearString + '-' + (Number(yearString.slice(2)) + 1)
    //const yearToggle = [altYear, yearString]
    let year = undefined;

    const seasonDate = /(\d{4}\-\d{2}|\d{4})/;
    let season = $('title').text().match(seasonDate);
    if (!season) {
        season = $('.sidearm-schedule-title').find('h2').text().match(seasonDate);
    }
    if (!season) {
        season = $('h2.s-common__header-title').text().match(seasonDate);
    }
    if (!season) {
        var title = $('meta[name="og:title"]');
        if (title.length && title.attribs) {
            season = title[0].attribs["content"].match(seasonDate);
        }
    }
    if (season) {
        //year = pretty(season[season.length-1]).split(' ')[0].substring(0,4);
        year = pretty(season[season.length-1]);
        if (year.indexOf('-') > -1) {
            year = year.substring(year.indexOf('-')+1)
            if (year.length === 2) {
                year = '20' + year;
            }
        }
    }
    if (!year) {
        throw new Error(`Could not determine year: {season}`)
    }
    if (year < new Date().getFullYear() - 1) {
        throw new Error(`Year ${year} < current year`);
    }
    return year;
}

module.exports = {
    sidearmScrape,
    sidearmScrape2
}