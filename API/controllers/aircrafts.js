import {Aircraft} from "../models/aircraft.js"

export const getData = async (req, res) => {
    Aircraft.find({}, (err, aircrafts) => {
        if (err) res.json({ message: 'err' })
        res.json(aircrafts)
    })
}
export const saveData = async(req, res) => {
    try {
        await Aircraft.create(req.body)
    } catch (err){
        console.log(err.message)
         res.status(400).end()
    }
    res.status(200).end()
}
