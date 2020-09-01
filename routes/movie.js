const router = require('express').Router();
const movieCtrl = require('../controllers/movie')
const authUser = require('../helpers/auth');

router.get('/movies', movieCtrl.getMovies)
router.get('/movies/:userId', authUser, movieCtrl.getMyMovies)
router.post('/movies/:userId', authUser, movieCtrl.saveMovies)
router.put('/movies/:id', authUser, movieCtrl.modifyMovies)
router.delete('/movies/:id', authUser, movieCtrl.deleteMovies)

module.exports = router