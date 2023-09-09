import express from'express'
import * as schoolInfoCtrl from '../controllers/schoolInfo.js'
const schoolInfoRouter = express.Router()

schoolInfoRouter.get('/presto', schoolInfoCtrl.getPresto)
schoolInfoRouter.get('/streamline', schoolInfoCtrl.getStreamline)
schoolInfoRouter.get('/sidearms', schoolInfoCtrl.getSideArms)
schoolInfoRouter.get('/wmt', schoolInfoCtrl.getWmt)
schoolInfoRouter.get('/indie', schoolInfoCtrl.getIndie)
schoolInfoRouter.post('/save', schoolInfoCtrl.addData)

export default schoolInfoRouter