import express from'express'
import * as aircraftCtrl from '../controllers/aircrafts.js'
const aircraftRouter = express.Router()

aircraftRouter.get('/', aircraftCtrl.getData)
aircraftRouter.post('/save', aircraftCtrl.saveData)

export default aircraftRouter