const fetch = require('node-fetch')

//const coordinateUrl = 'https://ncaaschedulesapi.herokuapp.com/coordinates'
//const timeZoneUrl = 'https://ncaaschedulesapi.herokuapp.com/timezones'
//const googleApi = require('../services/googleApi')
const moment = require('moment')
const dateTimeUtil = require('./dateTimeUtil');
const regex = /^([^M]+)M/g

async function editLocTime(schedules) {
/*
    let latLng = {}
    let timeZones = {}
    let newLatLng = []
    let newTimeZones = []
    let res = await fetch(coordinateUrl)
    let coords = await res.json()
    // console.llog(schedules.length)

    for (let i = 0; i < coords.length; i++) {
        latLng[coords[i].location] = {
            lat: coords[i].lat,
            lng: coords[i].lng
        }
    }

    let tzres = await fetch(timeZoneUrl)
    let tz = await tzres.json()

    for (let i = 0; i < tz.length; i++) {
        timeZones[tz[i].location] = tz[i].timeZone
    }
*/
    for (let i = 0; i < schedules.length; i++) {
        let loc = schedules[i]['compEventLocName']
        //* location edits turn into Map 
        if (loc === "State University, Ark.") loc = "Arkansas State University"
        if (loc === "Thomas & Mack Center") loc = "University of Nevada, Las Vegas"
        if (loc === " @ Thunderbird Soccer Field") loc = "Southern Utah University"
        if (loc === " @ Clover Field") loc = "Pomona, NY @ Clover Field"
        if (loc === " @ North Athletic Complex") loc = "Moon Township, Pa. @ North Athletic Complex"
        if (loc === " @ Soccer and Track & Field Stadium") loc = "Denton, TX @ Soccer and Track & Field Stadium"
        if (loc === " @ Maturi Pavilion") loc = "Maturi Pavilion - University of Minnesota"
        if (loc === "Champaign, Ill.") loc = "Champaign, Il"
        if (loc === " @ Tate Rink") loc = "West Point, New York"
        if (loc === "Founders Park") loc = "Founders Park - Columbia, SC"
        if (loc === "Norman, Okla. @ McCasland Field House") loc = "McCasland Field House"
        if (loc === "Greenville @ Alley Gymnasium") loc = "Greenville, SC"
        if (loc === "WSOC Announces 2022 Fall Slate @ Stuart & Suzanne Grant Stadium") loc = "Stuart & Suzanne Grant Stadium"
        if (loc === " @ Recreation Athletic Complex") loc = "Fairfax, VA @ Recreation Athletic Complex"
        if (loc === "Nats Youth Academy") loc = "Washington Nationals youth baseball academy"
        if (loc === "Shore Bird Stadium") loc = "Perdue Stadium"
        if (loc === "Hurricane Stadium") loc = "PNC Arena"
        if (loc === "Beaumont") loc = "Beaumont, TX"
        if (loc === "South Bound, Ind") loc = "South Bend, Ind"
        if (loc === "Fleming Gym") loc = "University of North Carolina at Greensboro"
        if (loc === "AT&T Field | Chattanooga, TN") loc = "Chattanooga, TN"
        if (loc === "Norman @ L. Dale Mitchell Park") loc = "L. Dale Mitchell Park - University of Oklahoma"
        if (loc === "Norman @ Lloyd Noble Center") loc = "Lloyd Noble Center - University of Oklahoma"
        if (loc.includes("Klöckner")) loc = "Charlottesville, Va. @ Klockner Stadium"
        if (loc.includes("Honolulu")) loc = "Honolulu, HI"
        if (loc.includes("SAN ANTONIO, TEXAS")) loc = "San Antonio, TX"
        if (loc.includes("Alamodome")) loc = "San Antonio, TX"
        if (loc.includes("Dickies Arena")) loc = "Fort Worth, TX"
        if (loc.includes("NRG Stadium")) loc = "Houston, TX"
        if (loc.includes("Carver–Hawkeye")) loc = "Iowa City, IA"
        if (loc.includes("Harrah’s")) loc = "Asheville, N.C. @ Harrahs Cherokee Center Asheville"
        if (loc.includes("San José")) loc = "San Jose, CA"
        if (loc.includes("Entertainment & Sports Arena")) loc = "Washington, DC"
        if (loc.includes("Betty & Bobby")) loc = "Missouri State University"
        if (loc.includes("The Roof")) loc = "Boston, MA"
        if (loc.includes("Waipi‘o") || loc.includes("Waipio")) loc = "Waipahu, HI"
        if (loc.includes("Lakeside Field")) loc = "Lakeside Field Northwestern"
        if (loc.includes("Home @")) loc = "Colorado College"
        let location = loc.toUpperCase()

        /*
        if (location
            && !location.includes("TBA")
            && location !== "TBD"
            && location !== "HOME"
            && !location.includes("HOST ")
            && !location.includes("SITE")
            && !location.includes(" SEED")
            //&& !latLng[loc]
            ) {
            try {
                latLng[loc] = await googleApi.getCoordinates(encodeURIComponent(loc))
                  schedules[i]['latLng'] = latLng[loc]
                  let coordInfo = {
                      location: loc,
                      lat: latLng[loc]['lat'],
                      lng: latLng[loc]['lng']
                  }
                  newLatLng.push(coordInfo)

            } catch (err) {
                console.lerror('editLocTime.editLocTime: ' + err.message + '\r\n' + err)
                continue
            }

        } else if (location && location !== "TBA" && latLng[loc]) {
            schedules[i]['latLng'] = latLng[loc]
        }
        
        if (latLng[loc] && !timeZones[loc]) {
            try {
                timeZones[loc] = await googleApi.getTimezone(latLng[loc].lat, latLng[loc].lng)
                  schedules[i]['compEventTimeZone'] = timeZones[loc]
                  let tz = {
                      location: loc,
                      timeZone: timeZones[loc],
                  }
                  newTimeZones.push(tz)
            } catch (err) {
                console.lerror('editLocTime.editLocTime: ' + err.message + '\r\n' + err)
                continue
            }
        } else if (latLng[loc] && timeZones[loc]) {
            schedules[i]['compEventTimeZone'] = timeZones[loc]
        }*/

        let date = schedules[i]['compEventDate']
        let time = schedules[i]['compEventTime'];

        //* time edits
        if (dateTimeUtil.IsValidDate(date)) {
            schedules[i].compEventDateTime = moment(date).format().slice(0, -15);
            if (!isTrackAndField(schedules[i]['sportCode']) &&
                dateTimeUtil.IsValidTime(time)) {
                schedules[i].compEventDateTime = dateTimeUtil.Combine(date, time);
            }
        }
        ;
        if (!dateTimeUtil.IsValidTime(time)) {
            schedules[i]["status"] = time;
        }
        if (!schedules[i].compEventDateTime ||
            !dateTimeUtil.IsValidDate(schedules[i].compEventDateTime)) {
            console.ldebug('Invalid Date: ' + schedules[i].compEventDateTime);
        }
    }
/*
    if (newLatLng.length) {
        try {
            let sendCoords = await fetch('https://ncaaschedulesapi.herokuapp.com/coordinates/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLatLng)
            })
            console.llog(sendCoords.status, 'coords')
        } catch (err) {
            console.llog(err.message, 'sendcoords')
        }
    }

    if (newTimeZones.length) {
        try {
            let sendTz = await fetch('https://ncaaschedulesapi.herokuapp.com/timezones/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTimeZones)
            })

        } catch (err) {
            console.llog(err.message, 'sendTz')
        }
    }
*/
    return schedules;
}
function isTrackAndField(sportCode) {
    // Track and Field
    if (sportCode === 'MTI' || sportCode === 'WTI' ||
        sportCode === 'MTO' || sportCode === 'WTO' ||
        sportCode === 'MTF' || sportCode === 'WTF') {
        return true;
    }
    return false;
}

module.exports = {
    editLocTime
}
