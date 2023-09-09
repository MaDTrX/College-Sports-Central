import express from'express'
import * as ncaaCtrl from '../controllers/ncaa.js'
const ncaaRouter = express.Router()

ncaaRouter.get('/', ncaaCtrl.getData)

export default ncaaRouter