import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import fileInfo from './routes/fileInfo'
import uploadFile from './routes/uploadFile'
import download from './routes/download'
import errorHandler from './middleware/error-handler'
import gitHubOauthController from './routes/authGoogle'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/files', fileInfo)
app.use('/api/upload', uploadFile)
app.use('/api/download', download)
app.use('/api/sessions', gitHubOauthController)


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
