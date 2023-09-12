//url data to be cleaned
const axios = require('axios')
const grid = 'grid=true'
const sideArmsPath = "/schedule.aspx?path="
const year = '/2021-22'
const prestoPath = year + "/schedule"
const wmtPath = '/schedule/season' + year

//* all possible sport parameters
const urlSwitch = 'https://schoolscheduleintake.azurewebsites.net/references/sportcodes'
// console.log(urlSwitch)



async function confirmUrl(affiliate) {
    // console.log('affiliate', affiliate)
    let urls = []
    for (let i = 0; i < affiliate.length; i++) {
        for (key in affiliate[i]) {
            //grabbing only sportUrl key value pairs
            //splitting them by sport
            if (key === "Baseball" ||
                key === "Football" ||
                key === "Men's Basketball" ||
                key === "Men's Gymnastics" ||
                key === "Men's Ice Hockey" ||
                key === "Men's Soccer" ||
                key === "Men's Track & Field" ||
                key === "Men's Indoor Track" ||
                key === "Men's Outdoor Track" ||
                key === "Men's Volleyball" ||
                key === "Women's Basketball" ||
                key === "Women's Gymnastics" ||
                key === "Women's Ice Hockey" ||
                key === "Women's Soccer" ||
                key === "Women's Softball" ||
                key === "Women's Track & Field" ||
                key === "Women's Indoor Track" ||
                key === "Women's Outdoor Track" ||
                key === "Women's Volleyball") {
                urls.push({
                    school: affiliate[i].schoolName,
                    athUrl: affiliate[i].athleticsURL,
                    sport: key,
                    url: affiliate[i][key]
                })
            }
        }
    }



    let urlFailure = []

    for (let h = 0; h < urls.length; h++) {

        try {
            //try making a request to each url
            let res = await axios.get(urls[h].url)
            //if the status url includes 'index', a redirect has happened

        } catch (err) {
            
            let found = false
            let count = 0
            
            while (count < 12) {
                //test all other route parameter and update to the correct one
                try {
                    if (urls[h].url.includes(prestoPath)) {
                        let res = await axios.get(urls[h].athUrl + "sports/" + urlSwitch[urls[h].sport][count] + prestoPath)
                        if (res.status === 200) {
                            found = true
                            urls[h].url = urls[h].athUrl + "sports/" + urlSwitch[urls[h].sport][count] + prestoPath
                            count = 12
                        }
                    }
                    if (urls[h].url.includes(wmtPath)) {
                        let res = await axios.get(urls[h].athUrl + "sports/" + urlSwitch[urls[h].sport][count] + wmtPath)
                        if (res.status === 200) {
                            found = true
                            urls[h].url = urls[h].athUrl + "sports/" + urlSwitch[urls[h].sport][count] + wmtPath
                            count = 12
                        }
                    }
                    if (urls[h].url.includes(sideArmsPath)) {
                        let res = await axios.get(urls[h].athUrl + path + urlSwitch[urls[h].sport][count] + '&' + grid)
                        if (res.status === 200) {
                            found = true
                            urls[h].url = urls[h].athUrl + path + urlSwitch[urls[h].sport][count] + '&' + grid
                            count = 12
                        }
                    }
                } catch (err) {
                    count++
                    continue
                }
                // console.log(found)
                if (!found) urlFailure.push(urls[h].url)
                continue
            }
        }
    }
    console.log("urlsURLS", urls)
    return urls
}

module.exports = {
    confirmUrl
}