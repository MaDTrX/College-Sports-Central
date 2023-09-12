const ncaaClients = require('../settings/athleticsUrls').urlsSearch()
//manually created reference for school names
const ref = require('../../json/references.json')
const fs = require('fs')
const axios = require('axios')

//schools not found in sidearms partner but are partnered with them

async function getSideArmPartners() {
    //sidearms partners source
    const res = await axios.get('https://services.sidearmsports.com/services/clients.ashx')
    const data = res.data.sites
    const ncaaSideArms = []
    //add manual schools
    for (let i = 0; i < manualschools.length; i++) {
        ncaaSideArms.push(manualschools[i])
    }
    
    for (let i = 0; i < data.length; i++) {
        //*limiting to D1 but extends to D2 and D3
        //* excluding conference partners
        //*grabbing name, location, logo & school colors
        if ((data[i].division === 'DI')
            &&
            (data[i].school_name !== null)) {
            ncaaSideArms.push({
                schoolName: data[i].school_name.trim(),
                athleticsURL: data[i].client_url,
                location: data[i].location,
                logo: data[i].client_image_url,
                primaryBackground: data[i].primary_background,
                primaryText: data[i].primary_text,
                safeTextWhite: data[i].safe_text_white,
                safeTextBlack: data[i].safe_text_black,
            })
        }
    }
    //creating a hashmap for a quick lookup for accountNames
    let map = {}
    for (let i = 0; i < ref.length; i++) {
        for (key in ref[i]) {
            map[ref[i][key]] = ref[i].accountName
        }
    }
    //cross-checking schoolnames
    for (let i = 0; i < ncaaSideArms.length; i++) {
        if (map[ncaaSideArms[i].schoolName] !== undefined)
            ncaaSideArms[i].schoolName = map[ncaaSideArms[i].schoolName]
    }

    const grid = 'grid=true'
    const path = "/schedule.aspx?path="

    //removes sports the arent targeted by the company
    for (let i = 0; i < ncaaClients.length; i++) {
        for (key in ncaaClients[i]) {
            if (ncaaClients[i][key] === "0") {
                delete ncaaClients[i][key]
            }
        }
    }
    //adds ids and athletic urls
    for (let i = 0; i < ncaaSideArms.length; i++) {
        for (let j = 0; j < ncaaClients.length; j++) {
            if (ncaaClients[j].nameOfficial == ncaaSideArms[i].schoolName) {
                ncaaSideArms[i].accountID = ncaaClients[j]['accountID']
                ncaaSideArms[i].orgID = ncaaClients[j]['orgID']
                ncaaSideArms[i].conferenceID = ncaaClients[j]['conferenceID']
                ncaaSideArms[i].conferenceName = ncaaClients[j]['conferenceName']

                for (key in ncaaClients[j]) {
                    if (ncaaClients[j][key] === "1") {
                        ncaaSideArms[i][`${key}`] = ncaaSideArms[i].athleticsURL + path + endpoints[`${key}`] + '&' + grid
                    }

                }

            }

        }
    }

    const stringify = await JSON.stringify(ncaaSideArms);

    //* raw data for urls the will be editted to sideArms.json after getting passed through urlStatus and UrlController
    await fs.writeFile("json/SideArmSports.json", stringify, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });

}
getSideArmPartners()
