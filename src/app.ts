import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import config from './config'
import dataRouter from './routes/data'
import uploadFileRouter from './routes/uploadFile'
import dealRouter from './routes/deal'
import downloadRouter from './routes/download'
import deleteRouter from './routes/delete'
import errorHandler from './middleware/error-handler'
import authRouter from './routes/auth'
import EventEmitter from './errors/eventEmitter'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/upload', uploadFileRouter)
app.use('/api/download', downloadRouter)
app.use('/api/delete', deleteRouter)
app.use('/api/data', dataRouter)
app.use('/api/auth', authRouter)
app.use('/api/deal', dealRouter)

app.use(errorHandler)

app.use('/', (req, res) => {
  res.status(404).end()
})

if (!fs.existsSync(config.uploadPath)) {
  fs.mkdirSync(config.uploadPath)
}
if (!fs.existsSync(config.carPath)) {
  fs.mkdirSync(config.carPath)
}

export default app
