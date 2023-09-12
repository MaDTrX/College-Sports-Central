async function getIDs(school, schedule) {

    let scheduleIDs = {}

    scheduleIDs[school.schoolName.toUpperCase()] = {
        ncaaOrgID: school.ncaaOrgID,
        accountID: school.accountID
    }

    if (schedule && schedule.length) {
        for (let i = 0; i < schedule.length; i++) {
            if (scheduleIDs[schedule[i].schoolName.toUpperCase()]) {
                schedule[i]['accountID'] = scheduleIDs[schedule[i].schoolName].accountID
                schedule[i]['ncaaOrgId'] = scheduleIDs[schedule[i].schoolName].ncaaOrgID
            }
            if (scheduleIDs[schedule[i].compEventName.toUpperCase()]) {
                schedule[i]['opponentAccountID'] = scheduleIDs[schedule[i].compEventName].accountID
                schedule[i]['opponentNCAAOrgId'] = scheduleIDs[schedule[i].compEventName].ncaaOrgID
            }
        }
    }

    return schedule
}

module.exports = {
    getIDs
}
