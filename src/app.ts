import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import fileIntoController from './routes/fileInfo'
import uploadFileController from './routes/uploadFile'
import downloadController from './routes/download'
import errorHandler from './middleware/error-handler'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/files', fileIntoController)
app.use('/api/upload', uploadFileController)
app.use('/api/download', downloadController)

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
