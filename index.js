const app = require('./app')
const http = require('http')
const { info } = require('./utils/logger')
const { PORT } = require('./utils/config')

const server = http.createServer(app)

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})