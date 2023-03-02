const exec = require('child_process').exec

exports.execute = (command) => {
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
