import altPresto from "./altPresto.js";
import { validateUrl } from "../settings/validateUrl.js"

const getPrestoSportsUrls = async ($, school, agent) => {
  const regex = /(?:\s*\b(?:(?:Sports: |Teams: |: Schedule|Schedule)\.?))+/gm
  let sportsArray = [];
  let failed = [];
  let url = school.athleticUrl.endsWith("/")
    ? school.athleticUrl.slice(0, -1)
    : `${school.athleticUrl}`;
  try {
    let urlSet = new Set()
    $(".submenu")
      .find("ul")
      .each((i, el) => {    
        $(el)
        .find("li")
        .each(async (j, innerEl) => {
     
          if (
            $(innerEl).find("a").attr("href").includes("schedule") &&
            !$(innerEl).find("a").attr("href").includes("schedule-all")
            ) {
              let rawPath = $(innerEl).find("a").attr("href")
              if (urlSet.has(rawPath)) {
                return
              } else{
                urlSet.add(rawPath)
                let idxStart = rawPath.indexOf('/sports')
                let path = rawPath.slice(idxStart)
                let rawSportName = $(innerEl).find("a").attr("aria-label").replace(regex, " ").trim()
                let sportName = rawSportName.replace("'s", "s")
                let sportUrl = `${url}${path}`;
                sportsArray.push({
                    sportName: sportName,
                    scheduleUrl: sportUrl,
                    division: 1,
                    deactivationDate: await validateUrl(sportUrl, agent)?.date || "",
                    deactivationReason: await validateUrl(sportUrl, agent)?.reason || "",
                  })
              }
              } else if ($(innerEl).find("a").attr("href").includes("index") &&
                $(innerEl).find("a").attr("aria-label").includes("Teams: ") &&
                $(innerEl).contents().length  === 1 ){
                const sportPage = `${url}${$(innerEl).find("a").attr("href")}`
                const sportDetails = await altPresto(sportPage, agent, url)
                if(sportDetails) {
                  sportsArray.push({
                    sportName: sportDetails?.name,
                    scheduleUrl: sportDetails?.url,
                    division: 1,
                    deactivationDate: await validateUrl(sportDetails?.url, agent)?.date || "",
                    deactivationReason: await validateUrl(sportDetails?.url, agent)?.reason || "",
                  })
                }
              }
            });
      });
    return sportsArray;
  } catch (err) {
    console.log(err.message, "message");
    failed.push(url);
  }
};
export default getPrestoSportsUrls;
