const axios = require('axios')
const Movie = require('../models/movie')
const { movieurl } = require('../utils/config')
const { info } = require('../utils/logger')

class movieController {
	static async getMovies (req, res, next) {
		try {
			let movielist = []
			for (let i = 1; i <= 10; i++) {
			let allmovies = await axios.get(`${movieurl}&page=${i}`)
			movielist.push(allmovies.data.results)
			}
			movielist = [].concat.apply([], movielist);
			res
			.status(200)
			.json({
				status: "success",
				count: movielist.length,
				movielist
			})
		} catch (error) {
			next(error)
		}
	}

	static async saveMovies (req, res, next) {
		try {
			const movie = new Movie(req.body)
			if (!movie.title || !movie.rating) {
				return res
				.status(400)
				.send({ 
					status: 'error', 
					data: {
						message: "Please provide movie title and rating"
					}
				});
			}
			const uniqueMovie = await Movie.findOne({ title: movie.title });
			if (uniqueMovie) {
				return res
				.status(400)
				.send({
					status: 'error',
					data: {
							message: `'${movie.title}' exists in your list`
					}
				});
			}
			await movie.save();
			return res
			.status(201)
			.send({ 
				status: 'success',
				data: {
					message: `Movie with title '${movie.title}' saved to your list successfully`, 
					movie
				}
			})
		} catch (error) {
			next(error)
		}
	}

	static async modifyMovies (req, res, next) {

	}

	static async deleteMovies (req, res, next) {

	}
}

module.exports = movieController