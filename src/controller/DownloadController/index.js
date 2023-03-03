const chalk = require('chalk')

exports.download_car = async (req, res, next) => {
  try {
    const file = `./carGenerated/${req.query.piece_cid}`
    res.download(file)
  } catch (error) {
    console.log(
      chalk.red(`Error: Failed to download- ${req.query.piece_cid}`)
    )
    next(error)
  }
}
