const blogRouter = require('express').Router()
const Blog = require('../models/blog')

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
  const blog = new Blog(request.body).save()
  response.status(201).json(blog)
})

module.exports = blogRouter