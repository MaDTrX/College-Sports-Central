import axios from "axios";
import { validateUrl } from "../settings/validateUrl.js";


const getSideArmsSportsUrls = async ($, school, agent) => {
  let sportsArray = [];
  let url = school.athleticUrl.endsWith("/")
    ? school.athleticUrl
    : `${school.athleticUrl}/`;

    const response = await axios.get(`${url}services/sportnames.ashx`, agent);
    let sportsList = response.data.sports;
    for (let i = 0; i < sportsList.length; i++) {
      let currentSport = sportsList[i].sportInfo;
      let scheduleId = Number(currentSport["schedule_id"]);
      let notASport = currentSport["is_not_sport"];
      let sportQueryName = currentSport["sport_shortname"];
      let sportName = currentSport["sport_title"];
      let sportUrl = `${url}sports/${sportQueryName}/schedule/?grid=true`;
      
      if (scheduleId && notASport === "False") {
        sportsArray.push({
          sportName: sportName.replace("'s", "s"),
          scheduleUrl: sportUrl,
          division: 1,
          deactivationDate: await validateUrl(sportUrl, agent)?.date || "",
          deactivationReason: await validateUrl(sportUrl, agent)?.reason || "",
        });
      }
    }
  return sportsArray;
};
export default getSideArmsSportsUrls;
