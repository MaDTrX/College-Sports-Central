//ncaaSchools is an array of objects containing the schools target sports will be called from api
const ref = require('../../json/ncaaSchools.json')
const cheerio = require('cheerio')
const pretty = require('pretty')
const axios = require('axios')

// add id here
function reduceRef() {
    let result = []
    for (let i = 0; i < ref.length; i++) {
        //grab targetSchoolSports count 
        result.push({
            "orgID": ref[i].Org_ID,
            "nameOfficial": ref[i].Name_Official,
            "Baseball": ref[i]["Baseball"],
            "Men's Basketball": ref[i]["Men's Basketball"],
            "Football": ref[i]["Football"],
            "Men's Gymnastics": ref[i]["Men's Gymnastics"],
            "Men's Ice Hockey": ref[i]["Men's Ice Hockey"],
            "Men's Soccer": ref[i]["Men's Soccer"],
            "Men's Outdoor Track": ref[i]["Men's Outdoor Track"],
            "Men's Volleyball": ref[i]["Men's Volleyball"],
            "Women's Basketball": ref[i]["Women's Basketball"],
            "Women's Gymnastics": ref[i]["Women's Gymnastics"],
            "Women's Ice Hockey": ref[i]["Women's Ice Hockey"],
            "Women's Soccer": ref[i]["Women's Soccer"],
            "Women's Outdoor Track": ref[i]["Women's Outdoor Track"],
            "Women's Volleyball": ref[i]["Women's Volleyball"],
            "Men's Indoor Track": ref[i]["Men's Indoor Track"],
            "Women's Indoor Track": ref[i]["Women's Indoor Track"],
        })
    }
    return result
}

async function urlsSearch() {
    let reducedRef = reduceRef()
    const result = []
    for (let i = 0; i < reducedRef.length; i++) {
        //fetch Athletics Urls from Ncaa Site
        try {
            const response = await axios.get(`https://web3.ncaa.org/directory/orgDetail?id=${Number(reducedRef[i].orgID)}`)
            const $ = cheerio.load(response.data)
            //grabs all links posted
            const links = pretty($('.list-group').last().text())
            //grabs athletic links only
            const athleticLinks = links.split('\n')
            //? could possibly also grab school/venue location
            result.push({
                ...reducedRef[i],
                athleticsURL: athleticLinks[2]
            })
        } catch (err) {
            console.log(err)
            continue

        }

    }
    return result
}

module.exports = {
    urlsSearch
}
