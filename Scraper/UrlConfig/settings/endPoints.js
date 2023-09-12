const endpoints = {
    "Baseball": {
        presto: 'bsb',
        wmt: 'baseball',
        sideArms: 'baseball'
    },
    "Football": {
        presto: 'fball',
        wmt: 'football',
        sideArms: 'football'
    },
    "Men's Basketball": {
        presto: 'mbkb',
        wmt: 'mbball',
        sideArms: 'mbball'
    },
    "Men's Gymnastics": {
        presto: 'mgym',
        wmt: 'm-gym',
        sideArms: 'mgym'
    },
    "Men's Ice Hockey": {
        presto: 'mhoc',
        wmt: 'mhockey',
        sideArms: 'mhockey'
    },
    "Men's Soccer": {
        presto: 'msoc',
        wmt: 'msoc',
        sideArms: 'msoc'
    },
    "Men's Track & Field": {
        presto: 'track',
        wmt: 'mtrack',
        sideArms: 'track'
    },
    "Men's Indoor Track": {
        presto: 'track',
        wmt: 'mtrack',
        sideArms: 'track'
    },
    "Men's Outdoor Track": {
        presto: 'track',
        wmt: 'mtrack',
        sideArms: 'track'
    },
    "Men's Volleyball": {
        presto: 'mvball',
        wmt: 'mvball',
        sideArms: 'mvball'
    },
    "Women's Basketball": {
        presto: 'wbkb',
        wmt: 'wbball',
        sideArms: 'wbball'
    },
    "Women's Gymnastics": {
        presto: 'wgym',
        wmt: 'w-gym',
        sideArms: 'wgym'
    },
    "Women's Ice Hockey": {
        presto: 'whoc',
        wmt: 'whockey',
        sideArms: 'whockey'
    },
    "Women's Soccer": {
        presto: 'wsoc',
        wmt: 'wsoc',
        sideArms: 'wsoc'
    },
    "Women's Softball": {
        presto: 'sball',
        wmt: 'softball',
        sideArms: 'softball'
    },
    "Women's Track & Field": {
        presto: 'track',
        wmt: 'wtrack',
        sideArms: 'track'
    },
    "Women's Indoor Track": {
        presto: 'track',
        wmt: 'wtrack',
        sideArms: 'track'
    },
    "Women's Outdoor Track": {
        presto: 'track',
        wmt: 'wtrack',
        sideArms: 'track'
    },
    "Women's Volleyball": {
        sideArms: 'wvball',
        wmt: 'wtrack',
        presto: 'wvball'
    }
}
const urlSwitches = {
    "Baseball": ['bsb', 'base', 'm-basebl', 'baseball'],
    "Football": ['fb', 'fball', 'm-footbl', 'football'],
    "Men's Basketball": ['m_bkb', 'basketball-men', 'mbb', 'mbasket', 'mbkb', 'm-baskbl', 'mb'],
    "Men's Gymnastics": ['gym', 'gymnastics', 'mgym', 'm-gym'],
    "Men's Ice Hockey": ['mhockey', 'mice', 'mhock', 'mhoc', 'm-hockey'],
    "Men's Soccer": ['soccer', 'socc', 'msoccer', 'msoc', 'm-soccer'],
    "Men's Track & Field": ['mtrack', 'trackfield', 'track', 'trun', 'mcross', 'xc', 'xctrack', 'trk', 'm-track', 'c-xc'],
    "Men's Indoor Track": ['mtrack', 'trackfield', 'track', 'trun', 'mcross', 'xc', 'xctrack', 'trk', 'm-track', 'c-xc', 'c-itrack'],
    "Men's Outdoor Track": ['mtrack', 'trackfield', 'track', 'trun', 'mcross', 'xc', 'xctrack', 'trk', 'm-track', 'c-xc', 'c-track'],
    "Men's Volleyball": ['mvball', 'm-volley'],
    "Women's Basketball": ['w_bkb', 'wbasket', 'basketball-women', 'wbb', 'wbkb', 'w-baskbl'],
    "Women's Gymnastics": ['gym', 'gymnastics', 'wgym', 'w-gym'],
    "Women's Ice Hockey": ['wice', 'whockey', 'whock', 'whoc', 'w-hockey'],
    "Women's Soccer": ['soccer', 'wsoccer', 'soc', 'wsoc', 'w-soccer'],
    "Women's Softball": ['sball', 'w-softball', 'softball'],
    "Women's Track & Field": ['wtrack', 'track', 'trackfield', 'trun', 'wcross', 'xc', 'xctrack', 'trk', 'w-track', 'c-xc'],
    "Women's Indoor Track": ['wtrack', 'track', 'trackfield', 'trun', 'wcross', 'xc', 'xctrack', 'trk', 'w-track', 'c-xc', 'c-itrack'],
    "Women's Outdoor Track": ['wtrack', 'track', 'trackfield', 'trun', 'wcross', 'xc', 'xctrack', 'trk', 'w-track', 'c-xc', 'c-track'],
    "Women's Volleyball": ['vb', 'volleyball', 'vball', 'wvball', 'w-volley'],
}
function getUrlSwitches() {
    return urlSwitches
}

function getEndpoints() {
    return endpoints
}



module.exports = {
    getEndpoints,
    getUrlSwitches
}