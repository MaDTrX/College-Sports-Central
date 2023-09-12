const cheerio = require("cheerio")
const puppeteer = require('puppeteer')

/**
 * This function will act as a preffix to sideArmsScrape for schools that require dom activation.
 * 
 * @param {string} headless_url 
 */
async function Load(headless_url) {
    const browser = await puppeteer.launch()
    const [page] = await browser.pages();

    await page.goto(headless_url, { waitUntil: 'networkidle0' });
    await page.click( 'button#_viewType_table');
    await page.waitForSelector('table')
    const html = await page.content();
    const $ = cheerio.load(html)
    await browser.close()
    return $
}
module.exports = {   
    Load
}