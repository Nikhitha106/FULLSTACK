// bloglist-backend/index.js

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Blog = require('./models/blog') // Blog model

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const mongoUrl = 'mongodb://127.0.0.1:27017/bloglist' // Replace if using Atlas
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error))

// Test route
app.get('/', (req, res) => {
  res.send('Hello World')
})

// GET all blogs
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// POST a new blog
app.post('/api/blogs', async (req, res) => {
  const body = req.body

  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

// DELETE a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end() // 204 = No Content
  } catch (error) {
    res.status(400).json({ error: 'malformatted id' })
  }
})

// Start server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})