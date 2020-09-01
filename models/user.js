const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const userSchema = new Schema({
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
	},
	movies: [{
		type: Schema.Types.ObjectId,
    	ref: 'Movie'
	}]
}, { timestamps: true })

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User