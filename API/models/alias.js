import mongoose from "mongoose"
const Schema = mongoose.Schema

const aliasSchema = new Schema({
    teamID: {
        type: String,
        required: false
    },
    accountName: {
        type: String, required: true, unique: true
    },
    aliases: {
        type: Array,
        required: false
    }
},
    {
        timestamps: true
    })

export const Alias = mongoose.model('Alias', aliasSchema)