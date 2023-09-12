const fetch = require('node-fetch')
const matrixApi = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
const distanceUrl = 'https://ncaaschedulesapi.herokuapp.com/distances'
//const googleApi = require('../services/googleApi')

async function distMap() {

    let map = {}
    let res = await fetch(distanceUrl)
    let distances = await res.json()

    for (let i = 0; i < distances.length; i++) {
        map[distances[i].travel] = distances[i].distance
    }
    return map
}

async function getDistances(schedules) {

    let distanceMap = await distMap()
    let newDistanceMaps = []
    //Error Handling for failed distances
    let faliedDist = new Set()

    if (schedules && schedules.length) {
        for (let i = 0; i < schedules.length; i++) {
            console.info('addDistance.getDistances: ' + schedules[i].schoolName + '-' + schedules[i].compEventName + ' (' + schedules[i].compEventLocName + ')')
            let destination = schedules[i].compEventLocName
            let opponent = schedules[i].compEventName
            let school = schedules[i].schoolName
            schedules[i]['compEventDistance'] = []

            if (schedules[i].venueHostStatus === "H" && !distanceMap[opponent + "_" + destination] && !faliedDist.has(opponent + "_" + destination)) {
              /*const calcDist = await googleApi.getDistances(opponent, destination, matrixApi)
                if (calcDist) {
                    distanceMap[opponent + '_' + destination] = calcDist.distance
                    schedules[i]['compEventDistance'].push(calcDist)
                    newDistanceMaps.push({
                        travel: opponent + '_' + destination,
                        distance: calcDist.distance
                    })

                } else {
                    faliedDist.add(opponent + "_" + destination)
                }
              */
            } else if (schedules[i].venueHostStatus === "H" && distanceMap[opponent + "_" + destination]) {
                schedules[i]['compEventDistance'] = [{
                    schoolName: opponent,
                    distance: distanceMap[opponent + "_" + destination]
                }]
            }

            if (schedules[i].venueHostStatus === "A" && !distanceMap[school + "_" + destination] && !faliedDist.has(opponent + "_" + destination)) {
                try {
                  /*const calcDist = await googleApi.getDistances(school, destination, matrixApi)
                    if (calcDist) {
                        distanceMap[school + '_' + destination] = calcDist.distance
                        schedules[i]['compEventDistance'].push(calcDist)
                        newDistanceMaps.push({
                            travel: school + '_' + destination,
                            distance: calcDist.distance
                        })
                  */
                } catch (err) {
                    faliedDist.add(school + "_" + destination)
                    schedules[i]['compEventDistance'].push(calcDist)
                }
            } else if (schedules[i].venueHostStatus === "A" && distanceMap[school + "_" + destination]) {
                schedules[i]['compEventDistance'] = [{
                    schoolName: school,
                    distance: distanceMap[school + "_" + destination]
                }]
            }

            if (schedules[i].venueHostStatus === "N" && !distanceMap[opponent + "_" + destination] && !faliedDist.has(opponent + "_" + destination)) {
                const calcDist = await googleApi.getDistances(opponent, destination, matrixApi)

                if (calcDist) {
                    distanceMap[opponent + '_' + destination] = calcDist.distance
                    schedules[i]['compEventDistance'].push(calcDist)
                    newDistanceMaps.push({
                        travel: opponent + '_' + destination,
                        distance: calcDist.distance
                    })
                } else {
                    faliedDist.add(opponent + "_" + destination)
                }
            } else if (schedules[i].venueHostStatus === "N" && !distanceMap[school + "_" + destination] && !faliedDist.has(opponent + "_" + destination)) {
              const calcDist = await googleApi.getDistances(school, destination, matrixApi)

                if (calcDist) {
                    distanceMap[school + '_' + destination] = calcDist.distance
                    schedules[i]['compEventDistance'].push(calcDist)
                    newDistanceMaps.push({
                        travel: school + '_' + destination,
                        distance: calcDist.distance
                    })
                } else {
                    faliedDist.add(school + "_" + destination)
                }
              */
            } else if (schedules[i].venueHostStatus === "N" && distanceMap[school + "_" + destination]) {
                schedules[i]['compEventDistance'] = [{
                    schoolName: school,
                    distance: distanceMap[school + "_" + destination]
                }]

            } else if (schedules[i].venueHostStatus === "N" && distanceMap[opponent + "_" + destination]) {
                schedules[i]['compEventDistance'] = [{
                    schoolName: opponent,
                    distance: distanceMap[opponent + "_" + destination]
                }]
            }
        }
        let distlen = newDistanceMaps.length
        if (distlen) {
            for (let i = 0; i < distlen; i++) {
                try {
                    let sendDistances = await fetch('https://ncaaschedulesapi.herokuapp.com/distances/save', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newDistanceMaps[i])
                    })
                    console.log(sendDistances.status, 'Distances')
                } catch (err) {
                    console.log(err.message, 'err distances')
                }
            }
        }
    }
    return schedules
}
module.exports = {
    getDistances
}