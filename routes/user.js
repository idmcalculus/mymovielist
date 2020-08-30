const router = require('express').Router();
const userCtrl = require('../controllers/user')

router.post('/user/signup', userCtrl.userSignup)
router.post('/user/login', userCtrl.userLogin)

module.exports = router