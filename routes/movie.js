const router = require('express').Router();
const movieCtrl = require('../controllers/movie')

router.get('/movies', movieCtrl.getMovies)
router.post('/movies', movieCtrl.saveMovies)
router.put('/movies', movieCtrl.modifyMovies)

module.exports = router