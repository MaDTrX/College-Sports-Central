const moment = require('moment');
const momentTimzone = require('moment-timezone');
const regex = /^([^M]+)M/g
const timeFormat = /(\d{1,2}|\d{1,2}:\d{2}|\d{1,2}:\d{2}:\d{2})\s*(AM|PM)*(\-\d{2}:\d{2})*/

function ParseDate(date) {
    if (!date) {
        return date;
    }
    if (typeof date === 'string') {
        date = date.replace(/\((Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\)/g,'').trim();
    } else {
        console.log('Invalid Type: ' + typeof date);
    }
    if (!IsValidDate(date)) {
        console.debug('Invalid date' + date);
    }
    return moment(new Date(date));
}
function ParseTime(time) {
    if (!time) {
        return time;
    }
    if (typeof time === 'string') {
        time = time.toUpperCase().trim();

        if (time === "" || time.length === 0 || !time || time.includes("TBD") || time.includes("TBA")) {
            time = "TBA";
            return time;
        }
        if (time.includes("PPD")) {
            time = "POSTPONED"
            return time;
        }
        if (time.includes("CANCEL")) {
            time = "CANCELLED"
            return time;
        }
        if (time.includes("ALL DAY")) {
            time = "ALL DAY";
            return time;
        }
        time = time.replace(/\./g,'');
        if (time.includes(" OR ") && time.includes(",") && time.includes("PM")) {
            time = time.slice(0, time.indexOf(",")) + " PM";
        }
        if (time.includes("NOON") && !time.includes('/')) {
            time = "12 PM";
        }
        if ((time.includes("GM") && !time.includes("PM")) || time.includes("GA") || time.includes("MIN")) {
            time = "G-BASED";
            return time;
        }

        if (!timeFormat.test(time)) {
            console.ldebug('Invalid time: ' + time);
            return '00:00:00';
        }
        let momentTime = moment(time, ['h:m a', 'H:m']);
        // switch (time.match(/(ET|CT|MT|PT)$/)[0]) {
        //     case 'MT':
        //         momentTime = momentTime.tz('-07:00');
        // }
        return momentTime;
    } else {
        console.llog('Invalid Type: ' + typeof time);
    }
    return;
}
function Combine(date,time) {
    return moment(date).format().slice(0, 11) + moment(time,"hh:mm:ssZ").format().slice(11);
}
function IsValidDate(date) {
    try {
        Date.parse(date);
        return true;
    }
    catch (ex) {
        return false;
    }
}
function IsValidTime(time) {
    //return timeFormat.test(time);
    try {
        let momentTime = moment(time, ['h:m a', 'H:m']);
        return momentTime.isValid();
    }
    catch (ex) {
        return false;
    }
}
module.exports = {
    ParseDate,
    ParseTime,
    Combine,
    IsValidDate,
    IsValidTime
}