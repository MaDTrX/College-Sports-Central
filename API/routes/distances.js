import express from'express'
import * as distanceCtrl from '../controllers/distances.js'
const distanceRouter = express.Router()

distanceRouter.get('/', distanceCtrl.getData)
distanceRouter.post('/save', distanceCtrl.saveData)

export default distanceRouter