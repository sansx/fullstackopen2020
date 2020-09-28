const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const {
    title,
    url
  } = request.body
  if (!title || !url) return response.status(400).end()
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = new Blog(request.body).save()
  const user = await User.findById(decodedToken.id)
  user.notes = user.notes.concat(blog._id)
  await user.save()
  response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  try {
    let blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true
    })
    response.status(200).json(blog)
  } catch (error) {
    response.status(400).end()
  }
})

module.exports = blogRouter