require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Person = require('./models/person')
const User = require('./models/user')

const app = express()
const PORT = 3001

app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' })
})

// Get all persons
app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

// Get a person by ID
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// Add a new person (POST) with validation
app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({ name, number })

  try {
    const savedPerson = await person.save()
    res.status(201).json(savedPerson)
  } catch (error) {
    next(error) // forwards validation errors to the error handler
  }
})

// Delete a person
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Update a person (PUT) with validation
app.put('/api/persons/:id', async (req, res, next) => {
  const { name, number } = req.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.json(updatedPerson)
  } catch (error) {
    next(error) // forwards validation errors to the error handler
  }
})

// User registration
app.post('/users', async (req, res) => {
  const { username, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, passwordHash })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  res.json({ message: `Welcome ${username}` })
})

// --- Step 4 additions ---

// Unknown endpoint handler
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})