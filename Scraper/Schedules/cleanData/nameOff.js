async function convertNames(school, schedules) {
    let map = {}
    let remainder = new Set()
    map[school.schoolName.toUpperCase()] = school.schoolName.toUpperCase()
    let aliasArr = school.aliases
    for (let j = 0; j < aliasArr.length; j++) {
        map[aliasArr[j].toUpperCase()] = school.schoolName.toUpperCase()
    }

    if (schedules && schedules.length) {
        for (let j = 0; j < schedules.length; j++) {
            let opponent = schedules[j].compEventName.toUpperCase()
            let home = schedules[j].schoolName.toUpperCase()
            schedules[j].schoolName = home
            if (map[opponent]) {
                schedules[j].compEventName = map[opponent]
            } else {
                remainder.add(opponent)
            }
        }
    }

    return schedules
}
module.exports = {
    convertNames
}