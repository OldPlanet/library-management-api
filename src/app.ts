import express from 'express'
import bodyParser from 'body-parser'
import { globalErrorHandler } from './middlewares/error.middleware'
import router from './routers'

const app = express()

app.use(bodyParser.json())
app.use(router)
app.use(globalErrorHandler)

export default app
