const movies = require('../controllers/movie')

describe('movies', () => {
	test('only 4 movies are returned', () => {
		expect(movies()).toBe(200)
	})
})