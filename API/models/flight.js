import mongoose from "mongoose"
const Schema = mongoose.Schema

const geometrySchema = new Schema({
    coordinates: Array,
    type: String
})
const flightPathSchema = new Schema({
        team: String,
        effDate: Date,
        disDate: Date,
        deptArp: String,
        deptGeo: geometrySchema,
        deptTime: String,
        arrvArp: String,
        arrvGeo: geometrySchema,
        arrvTime: String,
        config: String,
        blockTime: String,
        serviceType: String,
        fltDesg: String,
})

const flightSchema = new Schema({
    geometry: geometrySchema,
    subfleet: {type: String, required: true, unique: true},   
    paths: [flightPathSchema]
},
    {
        timestamps: true
    })


export const Flight = mongoose.model('Flights', flightSchema) 