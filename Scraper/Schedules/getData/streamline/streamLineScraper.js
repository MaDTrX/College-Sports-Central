const fetch = require('node-fetch');
const cheerio = require('cheerio')
const pretty = require('pretty');
const fs = require('fs')
const streamLine = require('../../../json/StreamLineSports.json')
const school = {
    "Baseball": `baseball`,
    "Football": `mfb`,
    "Men's Basketball": ``,
    "Men's Gymnastics": `mgym`,
    "Men's Ice Hockey": `mhockey`,
    "Men's Soccer": `msoc`,
    "Men's Track & Field": `track`,
    "Men's Indoor Track": `track`,
    "Men's Outdoor Track": `track&`,
    "Men's Volleyball": `mvball&`,
    "Women's Basketball": `wbball`,
    "Women's Gymnastics": `wgym`,
    "Women's Ice Hockey": `whockey`,
    "Women's Soccer": `wsoc`,
    "Women's Softball": `softball`,
    "Women's Track & Field": `track`,
    "Women's Indoor Track": `track`,
    "Women's Outdoor Track": `track`,
    "Women's Volleyball": `wvball`,
}

async function test() {
    let gameidx
    const targetSchoolSportsSchedules = []
    for (let i = 0; i < streamLine.length; i++) {
        targetSchoolSportsSchedules.push({
            schoolName: streamLine[i].schoolName,
            sports: {}
        })
        gameidx = i
        for (key in streamLine[i]) {
            if (school[key]) {
                targetSchoolSportsSchedules[gameidx].sports[key] = {}
                const res = await fetch(streamLine[i][key])
                const data = await res.text()
                const $ = cheerio.load(data)
                $('tbody').find('tr').each((i, el) => {
                    const variables = $(el).find('td').toArray()
                    console.log(pretty($(variables[0]).text()))
                    console.log(pretty($(variables[2]).find('span').text()))
                    console.log(pretty($(variables[5]).find('span').text()))
                    console.log(pretty($(variables[6]).text()))
                    // const location = $(variables[4]).text().split('/')
                    // targetSchoolSportsSchedules[gameidx].sports[key][season[0]].push({
                    //     date: pretty(pretty($(variables[0]).text())),
                    //     time: $(variables[1]).text() === '' ? 'TBA' : pretty($(variables[1]).text()),
                    //     at: pretty($(variables[2]).text()),
                    //     opponent: pretty($(variables[3]).text()),
                    //     location: $(variables[4]).text().includes('/') ? pretty(location[0]) + ' @' + pretty(location[1]) : pretty($(variables[4]).text())
                    // })
                })
            
            }
        }
    }
}
test()