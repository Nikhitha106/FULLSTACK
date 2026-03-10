const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],       // Name cannot be empty
    minlength: [3, 'Name must be at least 3 characters'] // Name must be at least 3 letters
  },
  number: {
    type: String,
    required: [true, 'Number is required'],      // Number cannot be empty
    minlength: [8, 'Number must be at least 8 digits'] // Number must be at least 8 digits
  }
})

// Optional: format returned object
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)