const manualschools = [
    {
        schoolName: 'University of Rhode Island',
        athleticsURL: 'http://www.gorhody.com',
        location: 'Kingston,RI',
        logo: 'https://dbukjj6eu5tsf.cloudfront.net/gorhody.com/images/responsive_2020/logo_main-nav.svg',
        primaryBackground: '',
        primaryText: '',
        safeTextWhite: '',
        safeTextBlack: '',
    },
    {
        schoolName: 'Belmont University',
        athleticsURL: 'https://www.belmontbruins.com/',
        location: 'Nashville, TN',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Belmont_Bruins_logo.svg/300px-Belmont_Bruins_logo.svg.png',
        primaryBackground: '',
        primaryText: '',
        safeTextWhite: '',
        safeTextBlack: '',
    },
    {
        schoolName: "California State University, Sacramento",
        athleticsURL: "https://www.hornetsports.com/",
        location: "Sacramento, CA",
        logo: "https://i.pinimg.com/originals/2b/78/f1/2b78f1ac63f7edde125a1322dc9d547a.png",
        primaryBackground: "",
        primaryText: "",
        safeTextWhite: "",
        safeTextBlack: ""
    }
]
module.exports = {
    getManualSchools
}
function getManualSchools () {
    return manualschools
}