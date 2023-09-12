const locations = [
    "(TEXAS)", "(PA.)", "(PA)", "(LA.)", "(OHIO)", "(LOUISIANA)", "(OH)", "(LA)",
    "(KY.)", "(FLA)", "(FLA.)", "(MASS.)", "(MD.)", "(MD)", "(MINN.)", "(ILL.)",
    "(MARYLAND)", "(TX)", "(MINN)", "(CALIF.)", "(N.C.)", "(VA.)", "(MN)", "(MN.)",
    "(FL)", "(MONT.)", "(ARIZ.)", "(W.VA.)", "(AZ.)", "(MO.)", "(FL)", "(TENN.)",
    "(GA.)", "(N.Y.)", "(KY)", "(TN)", "(WV)", "(NY)", "(MISS.)", "(ALA.)",
    "(CHARLOTTE)", "(FLORIDA)", "(CALIFORNIA)", "(CA)", "(CHICAGO)", "(IOWA)",
    "(ST. LOUIS)", "(MICH.)", "(S.C.)", "(IND.)", "(NC)", "(S.D.)", "(N.E.B.)",
    "(NEB.)", "(#6 COLORADO STATE)", "(NEW YORK)", "(N.M.)", "(VS. LOYOLA/ST. FRANCIS/WILLIAM & MARY)", "(BROOKLYN)"
]

const sportCodes = {
    "Baseball": 'MBA',
    "Football": 'MFB',
    "Men's Basketball": 'MBB',
    "Men's Gymnastics": 'MGY',
    "Men's Ice Hockey": `MIH`,
    "Men's Soccer": 'MSO',
    "Men's Track & Field": 'MTF',
    "Men's Indoor Track": 'MTI',
    "Men's Outdoor Track": 'MTO',
    "Men's Volleyball": 'MVB',
    "Women's Basketball": 'WBB',
    "Women's Gymnastics": 'WGY',
    "Women's Ice Hockey": 'WIH',
    "Women's Soccer": 'WSO',
    "Women's Softball": 'WSB',
    "Women's Track & Field": 'WTF',
    "Women's Indoor Track": 'WTI',
    "Women's Outdoor Track": 'WTO',
    "Women's Volleyball": 'WVB',
}



module.exports = {
    getSportCodes,
    getLocations,
}

function getSportCodes () {
    return sportCodes
}
function getLocations () {
    return locations
}
