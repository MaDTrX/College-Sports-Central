const schools = require('./wmtSchools').wmt()
const ncaaClients = require('../../json/AthleticLinks.json')
const endpoints = require('../settings/endPoints').getEndpoints()
const path = "/schedule/season/2021-22"

async function wmtEndpoints() {

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
                        schools[i][`${key}`] = schools[i].athleticsURL + "sports/" + endpoints[`${key}`].wmt + path
                    }
                }
            }
        }
    }
    let newUrls = await validateURL.confirmUrl(schools)
    let result = await updateURLs.updateUrls(newUrls, schools)
    return result
}
wmtEndpoints()
