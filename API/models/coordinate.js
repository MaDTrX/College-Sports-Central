
import mongoose from "mongoose"
const Schema = mongoose.Schema

const coordinatesSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    })


export const Coordinate = mongoose.model('Coordinates', coordinatesSchema) 