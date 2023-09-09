import axios from "axios";
import fetch from "node-fetch"
import * as cheerio from "cheerio";
import getSideArmsSportsUrls from "../sideArms/SideArmsSportsUrls.js";
import getPrestoSportsUrls from "../prestoSports/prestoSportsUrls.js";
import getWmtSportsUrls from "../wmt/wmtSportsUrls.js";
// import getPrestoSportsUrls from "../independents/independentSportsUrls.js";
// import getIndieSportsUrls from "../streamLine/streamLineSportsUrls.js";
// import getStreamLineSportsUrls from "../streamLine/streamLineSportsUrls.js";

export const selectParser = async (url, agent, school) => {
  let sidearm = [];
  let sidearms2 = [];
  let presto = [];
  let wmt = [];
  let streamline = [];
  let indie = [];
  let puppList = [];
  let parser, schoolSportsArray;
  // if (school.parser === "presto" || school.parser === "Presto") {
    try {
      const response = await axios.get(`${url}?skip=true`, {
        httpsAgent: agent,
      });
    
      const $ = cheerio.load(response.data);
    
      if ($("a:last").attr("href")?.includes("sidearmsports")) {
        if ($(".w-full").hasClass("w-full")) {
          parser = "sidearm2";
        } else {
          parser = "sidearm";
          schoolSportsArray = await getSideArmsSportsUrls($, school, agent);
          sidearm.push(url);
        }
      } else if (
        $(".sidearm-app-content-container").hasClass(
          "sidearm-app-content-container"
        )
      ) {
        parser = "sidearm2";
        sidearms2.push(url);
      } else if (
        $("a:last").attr("href")?.includes("prestosports") ||
        $("footer").find("a:last").attr("href")?.includes("prestosports") ||
        $(".container").find("a:last").attr("href")?.includes("prestosports") ||
        $(".site-footer").find("a:last").attr("href")?.includes("prestosports")
      ) {
        parser = "presto";
        schoolSportsArray =  await getPrestoSportsUrls($, school, agent)
        presto.push(url);
      } else if (
        $("footer").find("a:last").attr("href")?.includes("wmt.digital") ||
        $("script").get()[5].attribs["id"]?.includes("wmt") ||
        $("script").get()[3].attribs["id"]?.includes("wmt")
      ) {
        parser = "WMT";
        // schoolSportsArray =  await getWmtSportsUrls($, school, agent)
        wmt.push(url);
      } else if (
        $(".footer").find("a:last").attr("href")?.includes("streamline") ||
        $(".container").find("a:last").attr("href")?.includes("streamline") ||
        $("a:last").attr("href")?.includes("streamline")
      ) {
        parser = "streamline";
        // schoolSportsArray =  await getStreamlineSportsUrls($, school, agent)
        streamline.push(url);
      } else if (
        $("body").text()?.includes("JavaScript enabled") ||
        $("body").text()?.includes("cdn.prestosports")
      ) {
        parser = "puppeteer";
        // schoolSportsArray =  await getPuppeteerSportsUrls($, school, agent)
        puppList.push(url);
      } else {
        parser = "independent";
        // schoolSportsArray =  await getIndieSportsUrls($, school, agent)
        indie.push(url);
      }
      let data = { 
        // academicYear: school.academicYear,
        accountId: school.accountId,
        division: school.division,
        orgId: school.orgId,
        // orgTypeId: school.orgTypeId,
        // orgTypeName: school.orgTypeName,
        // schoolId: school.schoolId,
        schoolName: school.schoolName,
        parser: parser,
        athleticUrl: url,
        schoolSports: schoolSportsArray,
      };
      console.log(data)
      return data;
    } catch (err) {
      console.log(err, "error parsing data")
      return err
    }
  // }
};
  