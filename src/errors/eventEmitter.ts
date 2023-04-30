import EventEmitter from 'events'

export const eventEmitter = new EventEmitter()

eventEmitter.on('unKnownError', (message) => {
  // Emit pubSub events
  console.log(message)
})

eventEmitter.on('customError', ({ name, statusCode, errors }) => {
  // Emit pubSub events
  console.log(name, statusCode, errors)
})

export default {}
