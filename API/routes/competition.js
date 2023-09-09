import express from'express'
import * as compCtrl from '../controllers/competitions.js'
const competitionRouter = express.Router()

competitionRouter.get('/', compCtrl.getData)
competitionRouter.post('/save', compCtrl.saveData)

export default competitionRouter