const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { jwtKey } = require('../utils/config')

class UserController {
	static async userSignup (req, res, next) {
		try {
			const user = new User(req.body);
			if (!user.name || !user.email || !user.password) {
				return res.status(400).send({ 
					status: 'error', 
					data: {
						message: "Please fill all required fields"
					}
				});
			  }
			const uniqueUser = await User.findOne({ email: user.email });
			if (uniqueUser) {
				return res.status(400).send({
					status: 'error',
					data: {
							message: `${user.email} is already registered`
					}
				});
			}
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(user.password, salt);
			user.password = hashedPassword;
			const accessToken = jwt.sign({email: user.email, userId: user._id }, jwtKey, { expiresIn: '24hr' });
            user.token = accessToken;
			await user.save();
			return res
			.status(201)
			.send({ 
				status: 'success',
				data: {
					message: `${user.name} registered successfully`, 
					user
				}
			});
		} catch (error) {
			next(error)
		}
	}

	static async userLogin (req, res, next) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if(!user) {
				return res.status(404).send({ 
					status: 'error',
					data: {
						message: `${email} not found, please check your login details!`
					}
				});
			}
			const validPass = await bcrypt.compare(password, user.password);
			if (!validPass) {
				return res.status(404).send({ 
					status: 'error',
					data: {
						message: "Incorrect password provided, please try again "
					}
				});
			}
			const accessToken = jwt.sign({email: user.email, _id: user._id, role: user.role}, jwtKey, { expiresIn: "1hr" });
			const result = await User.findByIdAndUpdate(user._id, {token: accessToken}, { new: true });
				res
				.header("x-auth-token", accessToken)
                .status(200)
                .json({
				status: 'success',
				data: {
					message: `${result.email} logged in successfully`,
					_id: result._id,
					token: result.token
				}
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;