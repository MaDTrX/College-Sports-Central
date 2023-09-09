import express from'express'
import * as flightCtrl from '../controllers/flights.js'
const flightRouter = express.Router()

flightRouter.get('/', flightCtrl.getData)
flightRouter.get('/aircrafts', flightCtrl.getflightLocation)
flightRouter.get('/charters', flightCtrl.getflights)
flightRouter.get('/filter', flightCtrl.getDateRange)
// flightRouter.post('/save', flightCtrl.saveData)
// flightRouter.put('/update', flightCtrl.updateData)

export default flightRouter