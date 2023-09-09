import mongoose from "mongoose"
const Schema  =  mongoose.Schema


const placeSchema =  new Schema({
    code: String,
    name: String
})

const elevationSchema = new Schema({
    feet: Number,
    meters: Number
})

const coordinatesSchema = new Schema({
    decimal: Number,
    degrees: String
})

const geometrySchema = new Schema({
    coordinates: Array,
    type: String
})

const timeZoneSchema = new Schema({
    dst: Number,
    gmt: String,
    tzid: String,
    zone: String,
})

const airportSchema = new Schema ({
    city: String,
    country: placeSchema,
    elevation: elevationSchema,
    geometry: geometrySchema,
    iata: {type: String, required: true, unique: true},
    icao: {type: String, required: true, unique: true},
    latitude: coordinatesSchema,
    longitude: coordinatesSchema,
    name: String,
    state: placeSchema,
    status: String,
    timezone: timeZoneSchema,
    type: String
})

export const Airport =  mongoose.model("Airports", airportSchema)