const jwt = require('jsonwebtoken');
const { info } = require('../utils/logger')
const { jwtKey } = require('../utils/config')

const authUser = async (req, res, next) => {
	const token = await req.headers.auth || await req.headers.authorization
	if (!token) {
		return res
		.status(401)
		.send('Access Denied')
	}
	try {
        const verified = jwt.verify(token, jwtKey);
        req.user = verified;
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authUser