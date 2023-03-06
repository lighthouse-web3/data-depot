import { exec } from 'child_process'

export const execute = (command: any) => {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout, stderr) {
      if (!error) {
        resolve(stdout)
      } else {
        reject(stderr)
      }
    })
  })
}
