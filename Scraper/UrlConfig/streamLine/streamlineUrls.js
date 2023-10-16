const fs = require('fs')
const schools = require('./streamlineSchools').streamLine()

const ncaaClients = require('../../json/AthleticLinks.json')
const year = ''
const path = "/schedule"
const endpoints = {
    "Baseball": `baseball${path}`,
    "Football": `football${path}`,
    "Men's Basketball": `mbasketball${path}`,
    "Men's Gymnastics": `mgym${path}`,
    "Men's Ice Hockey": `mhockey${path}`,
    "Men's Soccer": `msoccer${path}`,
    "Men's Track  Field": `mtrack${path}`,
    "Men's Indoor Track": `mtrack${path}`,
    "Men's Outdoor Track": `mtrack${path}`,
    "Men's Volleyball": `mvolleyball${path}`,
    "Women's Basketball": `wbasketball${path}`,
    "Women's Gymnastics": `wgym${path}`,
    "Women's Ice Hockey": `whockey${path}`,
    "Women's Soccer": `wsoccer${path}`,
    "Women's Softball": `softball${path}`,
    "Women's Track  Field": `wtrack${path}`,
    "Women's Indoor Track": `wtrack${path}`,
    "Women's Outdoor Track": `wtrack${path}`,
    "Women's Volleyball": `volleyball${path}`,
}
async function streamLineEndpoints() {

    for (let j = 0; j < ncaaClients.length; j++) {
        for (key in ncaaClients[j]) {
            if (ncaaClients[j][key] === "0") {
                delete ncaaClients[j][key]
            }
        }
    }
    for (let i = 0; i < schools.length; i++) {
        for (let j = 0; j < ncaaClients.length; j++) {
            if (ncaaClients[j].nameOfficial == schools[i].schoolName) {
                for (key in ncaaClients[j]) {
                    if (ncaaClients[j][key] === "1") {
    
                        schools[i][`${key}`] = schools[i].athleticsURL[schools[i].athleticsURL.length - 1] === '/' ? schools[i].athleticsURL + endpoints[`${key}`] : schools[i].athleticsURL.trim() + '/' + endpoints[`${key}`]
                    }
    
                }
    
            }
    
        }
    }
    const stringify = await JSON.stringify(schools);


    await fs.writeFile("../../json/StreamLineSports.json", stringify, 'utf8', function (err) {
        if (err) {
            console.llog("An error occured while writing JSON Object to File.");
            return console.llog(err);
        }
        console.llog("JSON file has been saved.");
    });


}
streamLineEndpoints()
