const { createCar } = require('./helper/createCar')
const createFileRecord = require('../../databaseOperations/createFileRecord')

exports.upload_multiple_files = async (req, res, next) => {
  try {
    const timestamp = Date.now()
    for (let i = 0; i < req.files.length; i++) {
      const record = {
        id: req.files[i].destination.split('/')[1],
        name: req.files[i].originalname,
        size: req.files[i].size,
        mimeType: req.files[i].mimetype,
        payloadCid: '',
        pieceCid: '',
        pieceSize: null,
        fileStatus: 'Creating CAR',
        createdAt: timestamp,
        lastUpdate: timestamp,
      }
      const createRecord = await createFileRecord(record)
      createCar(req.files[i].destination.split('/')[1])
    }

    res.status(200).send({
      message: 'Uploaded the files successfully',
    })
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size cannot be larger than 100GB!',
      })
    }
    next(err)
  }
}
