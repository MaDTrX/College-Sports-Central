import axios from "axios"
import moment from "moment"

export const validateUrl  = async (url, agent) => {
    try {
        const response = await axios.get(url, agent)
        if (response.status === 200 && response.config.url === url) return ""
    } catch (err) {
        console.log(err.message)
        return {
            reason : err.message,
            date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        }
    }
}
