const fetch = require('node-fetch')
const cheerio = require('cheerio')
const pretty = require('pretty')
async function getSchedules() {
    // let res = await fetch('https://und.com/sports/football/schedule/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //notre dame -> University of iowa -> kansas -> vander
    // $('.schedule__row').each((i, el) => {
    //     const date = $(el).find('.date').find('time').text() + ' ' + $(el).find('.date').find('span').text()
    //     const at = $(el).find('.time').find('small').text()
    //     const locations = $(el).find('.title').find('p').text()
    //     const time =  $(el).find('.time').find('span').text()
    //     const opponent = $(el).find('.title').find('span:last').text()

    //     console.llog({
    //         venueHostStatus : pretty(at[1]),
    //         compEventName : pretty(opponent),
    //         compEventTime : pretty(time),
    //         compEventDate: pretty(date),
    //         compEventLocName : pretty(locations)
    //     })
    // })



    // let res = await fetch('https://vucommodores.com/sports/football/schedule/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //notre dame -> University of iowa -> kansas -> vander
    // $('.schedule__row').each((i, el) => {
    //     const time = $(el).find('.time').find('span').text().trim()
    //     const date = $(el).find('.date').find('time:first').text().trim()
    //     const locations = $(el).find('.title').find('p').text().trim()
    //     const opp = $(el).find('.title').find('span:last').text().trim().split('\n')
    //     const atSplit = $(el).attr().class.split(' ')
    //     const at = atSplit[1][0].toUpperCase()
    //     const opponent = opp[1].trim()
    //     // console.llog(opp[1].trim())

    //     console.llog({
    //         venueHostStatus : pretty(at),
    //         compEventName : pretty(opponent),
    //         compEventTime : pretty(time),
    //         compEventDate: pretty(date),
    //         compEventLocName : pretty(locations)
    //     })
    // })





    // let res = await fetch('https://kuathletics.com/sports/football/schedule/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //notre dame -> University of iowa -> kansas -> vander
    // $('.schedule__row').each((i, el) => {
    //     const date = $(el).find('.date').find('time:last').text().trim()
    //     const locations = $(el).find('.title').find('p').text().trim()
    //     const time =  $(el).find('.time').find('span').text().trim()
    //     const opponent = $(el).find('.title').find('span:last').text().trim()
    //     const atSplit = $(el).attr().class.split(' ')
    //     const at = atSplit[1][0].toUpperCase()

    //     // console.llog(at)

    //     console.llog({
    //         venueHostStatus : pretty(at),
    //         compEventName : pretty(opponent),
    //         compEventTime : pretty(time),
    //         compEventDate: pretty(date),
    //         compEventLocName : pretty(locations)
    //     })
    // })





    // let res = await fetch('https://hawkeyesports.com/sports/football/schedule/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //notre dame -> University of iowa -> kansas -> vander
    // $('.schedule__row').each((i, el) => {
    //     const date = $(el).find('.date').find('time:last').text().trim()
    //     const locations = $(el).find('.title').find('p').text().trim()
    //     const time =  $(el).find('.result').find('span').text().trim()
    //     const opponent = $(el).find('.title').find('span:last').text().trim()
    //     const atSplit = $(el).attr().class.split(' ')
    //     const at = atSplit[1][0].toUpperCase()

    //     // console.llog(at)

    //     console.llog({
    //         venueHostStatus : pretty(at),
    //         compEventName : pretty(opponent),
    //         compEventTime : pretty(time),
    //         compEventDate: pretty(date),
    //         compEventLocName : pretty(locations)
    //     })
    // })




    // let res = await fetch('https://golobos.com/sports/baseball/schedule/')
    // let data = await res.text()
    // let $ = cheerio.load(data)
    // // arkansas -> miami -> new mexico
    // $('.item').each((i, el) => {
    //     // console.llog(pretty($(el).text().trim()))
    //         const date = $(el).find('.date').find('span:first').text().trim()
    //         const locations = $(el).find('.name').find('p').text().trim()
    //         const time =  $(el).find('.result').text().trim()
    //         const opponent = $(el).find('.name').find('h3').text().trim()
    //         const at = $(el).find('.status').text().trim()


    //         // console.llog(date)

    //         console.llog({
    //             venueHostStatus : pretty(at[0]),
    //             compEventName : pretty(opponent),
    //             compEventTime : pretty(time),
    //             compEventDate: pretty(date),
    //             compEventLocName : pretty(locations)
    //         })
    //     })




    // let res = await fetch('https://arkansasrazorbacks.com/sport/m-basebl/schedule/')
    // let data = await res.text()
    // let $ = cheerio.load(data)
    // // arkansas -> miami -> new mexico
    // $('.item').each((i, el) => {
    //     // console.llog(pretty($(el).text().trim()))
    //         const date = $(el).find('strong').text().trim()
    //         const locations = $(el).find('.time-container').find('.place').text().trim()
    //         const time =  $(el).find('.time').find('span').text().trim()
    //         const opponent = $(el).find('.opponent').text().trim()
    //         const at = $(el).find('.type').text().trim()


    //         // console.llog(date)

    //         console.llog({
    //             venueHostStatus : pretty(at[0]),
    //             compEventName : pretty(opponent),
    //             compEventTime : pretty(time),
    //             compEventDate: pretty(date),
    //             compEventLocName : pretty(locations)
    //         })
    //     })




    // let res = await fetch('https://miamihurricanes.com/sports/baseball/schedule/')
    // let data = await res.text()
    // let $ = cheerio.load(data)
    // // arkansas -> miami -> new mexico
    // $('.item').each((i, el) => {
    //     // console.llog(pretty($(el).text().trim()))
    //         const date = $(el).find('.date').find('span:last').text().trim()
    //         const locations = $(el).find('.name').find('p').text().trim()
    //         const time =  $(el).find('.result').find('span').text().trim()
    //         const opponent = $(el).find('.name').find('h3').text().trim()
    //         const atSplit = $(el).attr().class.split(' ')
    //         const at = atSplit[1] ? atSplit[1][0].toUpperCase() : ''

    //         // console.llog(atSplit)

    //         console.llog({
    //             venueHostStatus : pretty(at),
    //             compEventName : pretty(opponent),
    //             compEventTime : pretty(time),
    //             compEventDate: pretty(date),
    //             compEventLocName : pretty(locations)
    //         })
    //     })


    let res = await fetch('https://lsusports.net/sports/bsb/schedule/')
    let data = await res.text()
    let $ = cheerio.load(data)
    // LSU ->
        $('.schedule-table_row_top').each((i, el) => {
           
                    const date = $(el).find('time').text().trim()
                    const locations = $(el).find('.schedule-table_row_cell_placement_text').find('span').text().trim()
                    const time =  $(el).find('.result').find('span').text().trim()
                    const opponent = $(el).find('.schedule-table_row_cell_placement_text').find('p').text().trim()
                    const atSplit = $(el).attr().class.split(' ')
                    const at = atSplit[1] ? atSplit[1][0].toUpperCase() : ''

                    // console.llog(atSplit)

              console.llog({
                venueHostStatus : pretty(at),
                compEventName : pretty(opponent),
                compEventTime : pretty(time),
                compEventDate: pretty(date),
                compEventLocName : pretty(locations)
            })
        })
        



    // let res = await fetch('https://seminoles.com/sports/baseball/schedule/season/2021-22/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //FLORIDA
    // $('.seminoles--box').each((i, el) => {
    //     console.llog(pretty($(el).text().trim()))
    // })
    // let res = await fetch('https://clemsontigers.com/sports/baseball/schedule/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //clemson
    // $('.schedule__item').each((i, el) => {
    //     console.llog(pretty($(el).text().trim()))
    // })
    // let res = await fetch('https://virginiasports.com/sports/baseball/schedule/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //virginia
    // $('.schedule__item-row').each((i, el) => {
    //     console.llog(pretty($(el).text().trim()))
    // })
    // let res = await fetch('https://ramblinwreck.com/sports/m-basebl/schedule/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //georgia tech
    // $('.inner').each((i, el) => {
    //     console.llog(pretty($(el).text().trim()))
    // })
    // let res = await fetch('https://ohiostatebuckeyes.com/sports/m-basebl/')
    // let data = await res.text()
    // // console.llog(data)
    // let $ = cheerio.load(data)
    // //OHIO
    // $('.ohio--schedule-item').each((i, el) => {
    //     console.llog(pretty($(el).text().trim()))
    // })

}

getSchedules()
module.exports = {
    getSchedules
}