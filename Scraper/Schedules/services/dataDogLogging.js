require('dotenv').config()
const axios = require('axios')
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

const os = require("os");
const util = require('util');

const loggingUrl = 'https://http-intake.logs.datadoghq.com/v1/input/';
const eventUrl = 'https://api.datadoghq.com/api/v1/events?api_key=';
let _options = {};
const log_stdout = process.stdout;
const log_stderr = process.stderr;
const prevconsole = {};
prevconsole.log = console.log;
prevconsole.debug = console.debug;
prevconsole.info = console.info;
prevconsole.error = console.error;
prevconsole.warn = console.warn;

console.log = function(msg,logEntry) {
    datadoglog(util.format(msg),'info',logEntry,console.log.caller?.name);
    prevconsole.log(msg);
}
console.trace = function(msg,logEntry) {
    datadoglog(util.format(msg),'verbose',logEntry,console.trace.caller?.name);
    prevconsole.debug(msg);
}
console.debug = function(msg,logEntry) {
    datadoglog(util.format(msg),'debug',logEntry,console.debug.caller?.name);
    prevconsole.debug(msg);
}
console.info = function(msg,logEntry) {
    datadoglog(util.format(msg),'info',logEntry,console.info.caller?.name);
    prevconsole.info(msg);
}
console.warn = function(msg,logEntry) {
    datadoglog(util.format(msg),'warn',logEntry,console.warn.caller?.name);
    prevconsole.warn(msg);
}
console.error = function(msg,logEntry) {
    datadoglog(util.format(msg),'error',logEntry,console.error.caller?.name);
    prevconsole.error(msg);
}
async function datadoglog(message,severity,logDetails,caller,request,response) {
    var logEntry = {
        "ddsource": caller,
        "hostname": os.hostname(),
        "service": _options.service,
        "severity": severity,
        "message": message,
    };
    if (logDetails) {
        logEntry.details = logDetails;
    }
    if (request) {
        logEntry.request = request;
    }
    if (response) {
        logEntry.response = response;
    }
    await SendMessage(logEntry);
}
async function exception(message,severity='error',caller,exception,request,response) {
    var logEntry = {
        "ddsource": caller,
        "hostname": os.hostname(),
        "service": _options.service,
        "severity": severity,
        "message": message,
        "exception": exception,
    };
    if (request) {
        logEntry.request = request;
    }
    if (response) {
        logEntry.response = response;
    }
    SendMessage(logEntry);
}
async function SendMessage(logEntry) {
    let response = {};
    try
    {
        const url = loggingUrl + process.env.DATA_DOG_KEY;
        const res = await axios.post(url,logEntry,{ httpsAgent: agent })
                           /*.then(function(res) {
                            response = res.data;
                           },function (err) {
                            let errorMessage = err;
                            prevconsole.debug(err.message);
                           })*/
                           ;
        const response = await res;
        if (response.status !== 200) {
            prevconsole.error(response.data.message);
        }
    }
    catch (err) {
        prevconsole.debug( err.message, 'Failed Send');
    }
}
function config(options) {
    _options = options;
}

module.exports = {
    datadoglog,
    exception,
    config
}