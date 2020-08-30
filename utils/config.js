require('dotenv').config()

const PORT = process.env.PORT || 3007
const url = process.env.CONNECTION_URL
const jwtKey = process.env.JWT_KEY
const movieurl = 'https://api.themoviedb.org/3/discover/movie?api_key=b878e30ed372ec1f08a0cbd32c85e88d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false'

module.exports = { PORT, url, jwtKey, movieurl }