require('dotenv').config()
const axios = require('axios')
const geocode = "https://maps.googleapis.com/maps/api/geocode/json?address="
const tz = "https://maps.googleapis.com/maps/api/timezone/json?location="
const timeStamp = "&timestamp=1331161200"
const units = '&units=imperial'

async function getTimezone(lat, lng) {
    try {

        const res = await axios.get(tz + lat + "%2C" + lng + timeStamp  + process.env.GOOGLE_API_KEY)
        const data = res.data
        return data.timeZoneName

    } catch (err) {
        console.error('googleApi.getTimezone: ' + err.message+'\r\n'+err);
        return err
    }
}

async function getCoordinates(loc) {
    try {

        let res = await axios.get(geocode + loc + process.env.GOOGLE_API_KEY)
        let data = res.data
        if (data && data.status &&
            data.status === 'ZERO_RESULTS') {
            return null;
        }
        return data.results[0].geometry.location

    } catch (err) {

        console.error('googleApi.getCoordinates: '+err.message+'\r\n'+err);
        return err
    }
}
async function getDistances(school, destination, url) {
    try {
        const res = await axios.get(url + `origins=${school}&destinations=${destination}` + units + process.env.GOOGLE_API_KEY)
        const data = await res.data
        try {
            if (data.rows[0].elements[0].distance) {
            let distance = data.rows[0].elements[0].distance.text
            let calcDist = {
                schoolName: school,
                distance: distance
            }
            return calcDist
        }

        } catch (err) {    
        }
    } catch (err) {
        console.exception('googleApi.getDistances:' + err.message+'\r\n'+err);
        return err
    }
    return null;
}

module.exports = {
    getTimezone,
    getCoordinates,
    getDistances
}