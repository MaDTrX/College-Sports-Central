import express from'express'
import * as tzCtrl from '../controllers/timezones.js'
const timezoneRoutes = express.Router()

timezoneRoutes.get('/', tzCtrl.getData)
timezoneRoutes.post('/save', tzCtrl.saveData)

export default timezoneRoutes