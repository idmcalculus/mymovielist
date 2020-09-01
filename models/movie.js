const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const movieSchema = new Schema({
  title: {
    type: String,
	required: true,
	unique: true
  },
  rating: {
    type: Number,
	required: true,
	min: 1,
	max: 10
  }
}, { timestamps: true })

movieSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
})

movieSchema.plugin(uniqueValidator)

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie