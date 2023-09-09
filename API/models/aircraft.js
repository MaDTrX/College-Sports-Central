import mongoose from "mongoose"
const Schema = mongoose.Schema

const aircraftSchema = new Schema({
    subFleet: {
        type: String, required: true, unique: true
    }
},
    {
        timestamps: true
    })

export const Aircraft = mongoose.model('Aircrafts', aircraftSchema)