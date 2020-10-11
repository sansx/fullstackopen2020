const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const {
    title,
    url
  } = request.body
  if (!title || !url) return response.status(400).end()

  const decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null
  const user = await User.findById(decodedToken.id)
  if (!request.token || !decodedToken || !decodedToken.id || !user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = await new Blog({
    ...request.body,
    user: user._id
  }).save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null

  if (!request.token || !decodedToken || !decodedToken.id || blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  await blog.remove()
  const user = await User.findById(decodedToken.id).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1
  })
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null

  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    let blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true
    }).populate('user', {
      username: 1,
      name: 1,
      id: 1
    })
    response.status(200).json(blog)
  } catch (error) {
    response.status(400).end()
  }
})

blogRouter.post('/:id/comments', async (request, response) => {
  const {
    comment
  } = request.body
  if (!comment || comment === '') return response.status(400).json({
    error: 'comment can not be null'
  })

  const decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null
  const user = await User.findById(decodedToken.id)
  if (!request.token || !decodedToken || !decodedToken.id || !user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })

  blog.comments.push(comment)
  blog.save()
  response.status(201).json(blog)
})

module.exports = blogRouter