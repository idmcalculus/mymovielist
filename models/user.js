const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	token: {
        type: String,
        required: true
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)