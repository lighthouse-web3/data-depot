import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import dataRouter from './routes/data'
import uploadFileRouter from './routes/uploadFile'
import downloadRouter from './routes/download'
import errorHandler from './middleware/error-handler'
import authRouter from './routes/auth'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/upload', uploadFileRouter)
app.use('/api/download', downloadRouter)
app.use('/api/data', dataRouter)
app.use('/api/sessions', authRouter)
app.use(errorHandler)

app.use('/', (req, res) => {
  res.status(404).end()
})

const uploadDir = './uploads'
const carGenerated = './carGenerated'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}
if (!fs.existsSync(carGenerated)) {
  fs.mkdirSync(carGenerated)
}

export default app
