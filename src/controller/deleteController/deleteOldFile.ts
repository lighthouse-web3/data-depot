import config from '../../config'
import fs from 'fs'
import path from 'path'

export const deleteOldFiles = () => {
  const directoryPath = config.carPath
  const files = fs.readdirSync(directoryPath)

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file)
    const fileAge = Date.now() - fs.statSync(filePath).mtime.getTime()

    if (fileAge > THIRTY_DAYS) {
      fs.unlinkSync(filePath)
      console.log(`Deleted ${file}`)
    }
  })
}
