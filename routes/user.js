const router = require('express').Router();
const userCtrl = require('../controllers/user')
const authUser = require('../helpers/auth')

router.post('/users/signup', userCtrl.userSignup)
router.post('/users/login', userCtrl.userLogin)
router.get('/users', userCtrl.allUsers)

module.exports = router