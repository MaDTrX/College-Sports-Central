
function updateUrls (corrections, affiliates) {
    let map = {}
        for (let j = 0 ; j < corrections.length; j++) {
            if (map[corrections[j].school] === undefined) {
                map[corrections[j].school]  = {}
                map[corrections[j].school][corrections[j]['sport']] = corrections[j].url
            }
            map[corrections[j].school][corrections[j]['sport']] = corrections[j].url      
    }
    
    // update the old urls with the new ones
    for (let i = 0 ; i < affiliates.length; i++) {
        if (map[affiliates[i].schoolName] !== undefined) {
        for (key in map[affiliates[i].schoolName]) {
                affiliates[i][key] = map[affiliates[i].schoolName][key]
            }
        }
    }
    return affiliates
}

module.exports = {
    updateUrls
}



