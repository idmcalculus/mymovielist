const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const moviesRouter = require('./routes/movie')
const userRouter = require('./routes/user')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const { url } = require('./utils/config')
const { info, errorlog } = require('./utils/logger')

const app = express()

mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

info('connecting to', url)

const mongoClient = async () => {
  try {
    const connected = await mongoose.connect(url)
    if (connected) {
      info('connected to MongoDB')
    }
  } catch (error) {
    errorlog('error connecting to MongoDB:', error.message)
  }
}

mongoClient()

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use('/api/v1', moviesRouter)
app.use('/api/v1', userRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app