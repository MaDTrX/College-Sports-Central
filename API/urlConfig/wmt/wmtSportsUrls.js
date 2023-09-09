import axios from "axios";
import { validateUrl } from "../settings/validateUrl.js";
import {filterUrl} from "../settings/filterUrls.js";

const getWmtSportsUrls = async ($, school, agent) => {
  let sportsArray = [];
  let failed = []
  let url = school.athleticUrl.endsWith("/")
  ? school.athleticUrl.slice(0, -1)
  : `${school.athleticUrl}`;
  url = filterUrl(url); 
  try {
    const response = await axios.get(`${url}/wp-json/v1/sports`)
    // console.log(response.data)  

  } catch(err) {
    console.log(url)
  }
};
export default getWmtSportsUrls;
