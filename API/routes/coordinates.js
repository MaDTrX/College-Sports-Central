import express from'express'
import * as coordCtrl from '../controllers/coordinates.js'
const coordinateRouter = express.Router()

coordinateRouter.get('/', coordCtrl.getData)
coordinateRouter.post('/save', coordCtrl.saveData)

export default coordinateRouter