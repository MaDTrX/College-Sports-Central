import {Coordinate} from "../models/coordinate.js"


export const getData = async (req, res) => {
    Coordinate.find({}, (err, aliases) => {
        if (err) res.json({ message: 'err' })
        res.json(aliases)
    })
}
export const saveData = async(req, res) => {
    try {
        await Coordinate.create(req.body)
    } catch (err) {
        console.log(err.message)
        res.status(400).end()
    }
    res.status(200).end()
}

