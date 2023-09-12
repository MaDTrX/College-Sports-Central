const locations = require('../tables/references').getLocations()
const locationMap = new Set(locations)

function oppConvert(schedules) {
    const set = new Set()
    for (let j = 0; j < schedules.length; j++) {
            set.add(schedules[j].compEventName)
            let opponent = schedules[j].compEventName.toUpperCase()
            if (!opponent.includes(" VS ") && !opponent.includes(" VS. ") && !opponent.includes("CONFERENCE") && !opponent.includes(" OR ") && !opponent.includes(" V ")) {


                //removing end hashtags
                if (opponent.endsWith("#")) opponent = opponent.slice(0, -1)

                //removing everything before a colon
                if (opponent.includes(":")) {
                    let split = opponent.split(":")
                    let lastidx = split.length - 1
                    opponent = split[lastidx].trim()
               
                }

                //removing end parenthesis
                if (opponent.endsWith(")")) {
                    for (let i = opponent.length - 1; i >= 0; i--) {
                        if (opponent[i] === "(") {
                            let removal = opponent.slice(i)
                            if (!locationMap.has(removal)) {
                                opponent = opponent.replace(removal, "")
                                // removals.add(removal)
                            }
                            break
                        }
                    }
                }


                //removing start parenthesis
                if (opponent.startsWith("(")) {
                    let idx = opponent.indexOf('(')
                    let idx2 = opponent.indexOf(')') + 1
                    let opp1 = opponent.slice(0, idx)
                    let opp2 = opponent.slice(idx2)
                    opponent = opp1 + opp2

                }

                //removing brackets
                if (opponent.includes("[")) {
                    let idx = opponent.indexOf('[')
                    let idx2 = opponent.indexOf(']') + 1
                    let opp1 = opponent.slice(0, idx)
                    let opp2 = opponent.slice(idx2)
                    opponent = opp1 + opp2

                }

                // removes VS. and "AT " at the start of the string 
                if (opponent.startsWith('VS. ') || opponent.startsWith('AT ')) {
                    let split = opponent.split(" ")
                    let newOpp = ''
                    for (let i = 1; i < split.length; i++) {
                        newOpp += split[i] + ' '
                    }
                    opponent = newOpp
                }

                // removes "NO. " at the start of the string 
                if (opponent.startsWith('NO. ')) {
                    let split = opponent.split(" ")
                    let newOpp = ''
                    for (let i = 2; i < split.length; i++) {
                        newOpp += split[i] + ' '
                    }
                    opponent = newOpp
                }

                //removes all "NO."
                if (opponent.includes('NO.')) {
                    let idx = opponent.indexOf("NO.") + 5
                    opponent = opponent.slice(idx).trim()
            
                }

                if (opponent.includes('#')) {
                    let regex = /([A-Z])\w+/g
                    let newOpp = opponent.match(regex)
                    opponent = newOpp.join(" ").trim()
            
                }


                if (opponent.endsWith(") ") && !opponent.includes("(")) {
               
                    opponent = opponent.replace(")", "")
                 
                }

                if (opponent.startsWith('SEED')) {
                    let split = opponent.split(" ")
                    let newOpp = ''
                    for (let i = 1; i < split.length; i++) {
                        newOpp += split[i] + ' '
                    }
                  
                    opponent = newOpp
                }
                if (opponent.endsWith(' / EXHIBITION')) {
                    let split = opponent.split(" / ")
                    let newOpp = split[0]
              
                    opponent = newOpp
                }
                if (opponent.endsWith('SPRING TOURNAMENT')) {
                    let idx = opponent.indexOf("SPRING TOURNAMENT")
                    let newOpp = opponent.slice(0, idx)
                  
                    opponent = newOpp
                }


                schedules[j].compEventName = opponent.trim()
            }
    }
    return schedules
}
module.exports = {
    oppConvert
}