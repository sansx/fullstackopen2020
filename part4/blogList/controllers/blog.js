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