import express from'express'
import * as schoolSportsCtrl from '../controllers/schoolSports.js'
const schoolSportRouter = express.Router()

schoolSportRouter.get('/', schoolSportsCtrl.getData)
schoolSportRouter.post('/save', schoolSportsCtrl.saveData)

export default schoolSportRouter