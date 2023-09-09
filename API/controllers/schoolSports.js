import {SchoolSport} from "../models/schoolSport.js"


export const getData = async (req, res) => {
    SchoolSport.find({}, (err, aliases) => {
        if (err) res.json({message: 'err'})
        res.json(aliases)
    })
}

export const saveData = async(req, res) => {
    console.log(req.body)
    try {
        await SchoolSport.create(req.body)
    } catch (err){
        console.log(err.message)
         res.status(400).end()
    }
    res.status(200).end()

}
