const fs = require('fs')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { maxFileSize } = require('../utils/constants')
const { totalNumberOfFiles } = require('../utils/constants')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileId = uuidv4()
    fs.mkdirSync('uploads/' + fileId)
    cb(null, 'uploads/' + fileId)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const uploadMultipleFile = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
}).array('file', totalNumberOfFiles)

module.exports = { uploadMultipleFile }
