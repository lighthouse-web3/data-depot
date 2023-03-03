import app from './app'
import config from './config/index'

app.listen(config.port || 8000, () => {
  console.log(`Server is running on port ${config.port || 8000}`)
})
