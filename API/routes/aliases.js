import express from'express'
import * as aliasCtrl from '../controllers/aliases.js'
const aliasRouter = express.Router()

aliasRouter.get('/', aliasCtrl.getData)

export default aliasRouter