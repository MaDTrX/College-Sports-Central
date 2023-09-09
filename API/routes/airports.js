import express from'express'
import * as airportCtrl from '../controllers/airports.js'
const airportRouter = express.Router()

airportRouter.get('/', airportCtrl.getData)
airportRouter.get('/get', airportCtrl.getOne)
airportRouter.post('/save', airportCtrl.saveData)

export default airportRouter