import axios from "axios";
import * as cheerio from "cheerio"

const altPresto = async (sportPage, agent, url) => {
    try {
        let result
        const response =  await axios.get(sportPage, agent)
        const $ = cheerio.load(response.data)
        $(".secondary-nav").find('li').each((i, el) => {
            const rawPath = $(el).find('a').attr('href')
            if(rawPath.includes('schedule')) {
                 result = {
                    url: `${url}${rawPath}`,
                    name: $(".secondary-nav").find('h1').text().replace("'s", "s")
                }
            }
        })
        return result
    } catch (err) {
        return {
            name: "",
            url: ""
        }
    }
}
export default altPresto