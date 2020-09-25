const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return the right number of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(6)
})

test('blogs have id', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
})

describe('blog post test', () => {
  const blog_will_up = {
    title: 'test1',
    author: 'someone',
    url: 'https://reactpatterns.com/'
  }

  test('post test', async () => {
    let previous = await api.get('/api/blogs')
    await api.post('/api/blogs').send(blog_will_up)
      .expect(201)
    let current = await api.get('/api/blogs')
    await api.delete('/api/blogs', blog_will_up)
    expect(previous.body.length).toBe(current.body.length - 1)
    expect(current.body).toContainEqual(expect.objectContaining(blog_will_up))

  })

  test('post blog if not have like attribute, that will be 0', async () => {
    const blog_will_up = {
      title: 'test2',
      author: 'someone',
      url: 'https://reactpatterns.com/'
    }
    await api.post('/api/blogs').send(blog_will_up)
    const res = (await api.get('/api/blogs')).body.filter(e => e.title === blog_will_up.title)[0]
    expect(res).toHaveProperty('likes', 0)
  })

})



afterAll(() => {
  mongoose.connection.close()
})