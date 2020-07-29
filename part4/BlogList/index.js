const app = require('./app')
const http = require('http')
const config = require('./utils/config')

const logger = require('./utils/logger')

// const mongoUrl = 'mongodb+srv://Admin:admin123@cluster0.dcvdw.mongodb.net/BlogList'
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const server = http.createServer(app)


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})