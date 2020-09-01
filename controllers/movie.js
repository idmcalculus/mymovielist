const axios = require('axios')
const Movie = require('../models/movie')
const User = require('../models/user')
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

	static async getMyMovies (req, res, next) {
		try {
			const id = req.params.userId
			const user = await User.findById(id)
			const myMoviesId = user.movies
			const myMovies = []
			for (let i=0; i<=myMoviesId.length; i++) {
				let eachId = myMoviesId[i]
				const eachMovie = await Movie.findById(eachId)
				myMovies.push(eachMovie)
			}
			return res
			.status(200)
			.json({
				status: "success",
				message: "My movie list fetched successfully",
				data: {
					myMovies
				}
			})
		} catch (error) {
			next(error)
		}
	}

	static async saveMovies (req, res, next) {
		try {
			const id = req.params.userId
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
			
			const user = await User.findByIdAndUpdate(id, { $push: { movies: movie} }, { new: true })
			
			return res
			.status(201)
			.send({ 
				status: 'success',
				message: `Movie with title '${movie.title}' saved to your list successfully`,
				data: { 
					movie, user
				}
			})
		} catch (error) {
			next(error)
		}
	}

	static async modifyMovies (req, res, next) {
		try {
			const id = req.params.id
			if (!id) {
				return res
				.status(400)
				.send({ 
					status: 'error',
					message: "Movie not found in your list"
				});
			}
			const { rating } = await req.body
			const updatedMovie = await Movie.findByIdAndUpdate(id, { rating }, { new: true })
			if (updatedMovie !== null) {
				return res
				.status(200)
				.send({ 
					status: 'success',
					message: `Rating of '${updatedMovie.title}' updated to ${updatedMovie.rating} successfully`,
					data: {
						updatedMovie
					}
				})
			}
			
		} catch (error) {
			next(error)
		}
	}

	static async deleteMovies (req, res, next) {
		try {
			const id = req.params.id
			if (!id) {
				return res
				.status(400)
				.send({ 
					status: 'error',
					message: "Movie not found in your list"
				});
			}
			const deletedMovie = await Movie.findByIdAndRemove(id)
			if (deletedMovie !== null) {
			  return res.status(204).end()
			}
		  } catch (error) {
			next(error)
		  }
	}
}

module.exports = movieController