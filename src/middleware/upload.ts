import fs from 'fs'
import multer from 'multer'
import { v4 } from 'uuid'
import config from '../config'
import { totalNumberOfFiles, maxFileSize } from '../utils/constants'
import { Request, Response } from 'express'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileId = v4()
    fs.mkdirSync(`${config.uploadPath}/${fileId}`)
    cb(null, `${config.uploadPath}/${fileId}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const uploadMultipleFile = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
}).array('file', totalNumberOfFiles)

export { uploadMultipleFile }
