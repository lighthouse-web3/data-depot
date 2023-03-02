const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
require('dotenv').config()

const app = express()

global.__basedir = __dirname

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/files', require('./routes/fileInfo'))
app.use('/api/upload', require('./routes/uploadFile'))
app.use('/api/download', require('./routes/download'))

app.use((req, res, next) => {
  let err = new Error(
    `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`,
    404
  )
  next(err)
})

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

module.exports = app
