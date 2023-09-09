import * as cheerio from "cheerio";
import pretty from "pretty";
import axios from "axios";
import https from "https";
import {config} from "dotenv";
import {filterUrl} from "./settings/filterUrls.js";
import {selectParser} from "./settings/parseUrls.js";
config();

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const urlsSearch = async () => {
  const response = await axios.get(process.env.SchoolSportsEndpoint, agent);
  const schoolSports = response.data;
  const zeroMatches = [];
  let result = []
  let school

  for (let i = 0; i < schoolSports.length; i++) {
    let athUrl = schoolSports[i].athleticUrl;
    athUrl = filterUrl(athUrl);

    try {
       school =  await selectParser(athUrl, agent, schoolSports[i]);
       if (school) {
        let requestBody = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(school)
        }
        await fetch(process.env.SchoolSportsPOST, requestBody);
       }
       result.push(school)
    } catch (err) {
      try {
        const response = await axios.get(
          `${process.env.NCAA_SRC}${Number(schoolSports[i].orgId)}`,
          agent
        );
        const $ = cheerio.load(response.data);
        const links = pretty($(".list-group").last().text());
        let athleticLinks = links.split("\n");
        let athUrl = athleticLinks[2].trim();
        athUrl = filterUrl(athUrl);
        school = await selectParser(athUrl, agent, schoolSports[i]);
        if (school) {
          let requestBody = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(school)
          }
          await fetch(process.env.SchoolSportsPOST, requestBody);
         }
        result.push(school)
      } catch (err) {
        console.log("zeroMatches", err)
        zeroMatches.push({
          err: err,
        });
      }
    }
  }
   return result;
};

urlsSearch();
