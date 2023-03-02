const getFileList = require('../../databaseOperations/getFileList')
const searchFileById = require('../../databaseOperations/searchFileById')

exports.get_file_list = async (req, res) => {
  try {
    const fileList = await getFileList(parseInt(req.query.pageNo))
    res.status(200).send(fileList)
  } catch (err) {
    res.status(500)
  }
}

exports.search_file_by_id = async (req, res) => {
  try {
    const fileInfo = await searchFileById(req.query.fileId)
    res.status(200).send(fileInfo)
  } catch (err) {
    res.status(500)
  }
}
