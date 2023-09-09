import {Ncaa} from "../models/ncaa.js"

export const getData = async (req, res) => {
    Ncaa.find({}, (err, aliases) => {
        if (err) res.json({message: 'err'})
         res.json(aliases)
    })
}

