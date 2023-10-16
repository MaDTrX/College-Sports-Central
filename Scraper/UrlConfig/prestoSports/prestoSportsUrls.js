const schools = require('./prestoSportsSchools').prestoSports()
const athleticsUrl = require('../../json/newAthleticLinks.json')
const endpoints = require('../settings/endPoints').getEndpoints()
const validateURL = require('../settings/urlStatus')
const updateURLs = require('../settings/urlController')
const path = "/schedule"
const year = '/2021-22'


async function prestoEndpoints () {
    let ncaaClients =  athleticsUrl

    for (let j = 0; j < ncaaClients.length; j++) {
        for (key in ncaaClients[j]) {
            if (ncaaClients[j][key] === "0") {
                delete ncaaClients[j][key]
            }
        }
    }
    for (let i = 0; i < schools.length; i++) {
        for (let k = 0; k < ncaaClients.length; k++) {
            if (ncaaClients[k].nameOfficial == schools[i].schoolName) {
                schools[i].accountID = ncaaClients[k].accountID
                schools[i].orgID = ncaaClients[k].orgID
                schools[i].conferenceName = ncaaClients[k].conferenceName
                schools[i].conferenceID = ncaaClients[k].conferenceID
                for (key in ncaaClients[k]) {
                    if (ncaaClients[k][key] === "1") {
                        schools[i][`${key}`] = schools[i].athleticsURL + "sports/" + endpoints[`${key}`].presto + year + path
                    }
                }

            }
        }
        
    }
    let newUrls = await validateURL.confirmUrl(schools)
    let result = await updateURLs.updateUrls(newUrls, schools)
    // console.llog("NewUrls", result)
    return result
}

module.exports = {
    prestoEndpoints
}