import axios from "axios";

const getIndieSportsUrls = async ($, school, agent) => {
  let sportsArray = [];
  let url = school.athleticUrl.endsWith("/")
    ? school.athleticUrl
    : `${school.athleticUrl}/`;
  try {
  } catch (err) {
  }
  return sportsArray;
};
export default getAllSportsUrls;
