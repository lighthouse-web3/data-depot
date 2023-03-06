import chalk from 'chalk'
import type { NextFunction, Request, Response } from 'express'

exports.download_car = async (req: any, res: Response, next: NextFunction) => {
  try {
    const file = `./carGenerated/${req.query.piece_cid}`
    res.download(file)
  } catch (error: any) {
    console.log(chalk.red(`Error: Failed to download- ${req.query.piece_cid}`))
    next(error)
  }
}
