import mongoose from "mongoose"
const Schema = mongoose.Schema

const distanceSchema = new Schema({
    travel: {
        type: String,
        required: false
    },
    distance: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    })



export const Distance = mongoose.model('Distance', distanceSchema)