const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')


let authApi

let user

jest.useFakeTimers()

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  user = await new User({
    username: 'root',
    passwordHash
  }).save()
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  authApi = (method, path, obj = {}, setting = {}) => (api[method](path)).send(obj).set({
    ...setting,
    Authorization: 'bearer ' + token
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog({
      ...blog,
      user: user._id
    }))
  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})

describe('return blog info test', () => {
  test('blogs are returned as json', async () => {
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
})

describe('blog post test', () => {
  const blog_will_up = {
    title: 'test1',
    author: 'someone',
    url: 'https://reactpatterns.com/'
  }

  test('post new blog without auth', async () => {
    let res = await api.post('/api/blogs').send(blog_will_up).set({
      Authorization: null
    }).expect(401)

    expect(res.body.error).toContain('token missing or invalid')
  })

  test('post blog with wrong token', async () => {
    let res = await api.post('/api/blogs').send(blog_will_up).set({
      Authorization: 'bearer zzzzz'
    }).expect(401)

    expect(res.body.error).toContain('invalid token')
  })

  test('post test', async () => {
    let previous = await api.get('/api/blogs')
    await authApi('post', '/api/blogs', blog_will_up)
      .expect(201)
    let current = await api.get('/api/blogs')
    expect(previous.body.length).toBe(current.body.length - 1)
    expect(current.body).toContainEqual(expect.objectContaining(blog_will_up))
  })

  test('post blog if not have like attribute, that will be 0', async () => {
    await authApi('post', '/api/blogs', blog_will_up).expect(201)
    const res = (await api.get('/api/blogs')).body.filter(e => e.title === blog_will_up.title)[0]
    expect(res).toHaveProperty('likes', 0)
  })

  test('if no title or url then return 400 error', async (done) => {
    const post_blog_without_sth = {
      author: 'someone'
    }
    await authApi('post', '/api/blogs', post_blog_without_sth).expect(400)
    done()
  })

})


describe('deletion of a blog', () => {
  test('delete blog without auth', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]

    let res = await api.delete(`/api/blogs/${blogToUpdate.id}`).expect(401)

    expect(res.body.error).toContain('token missing or invalid')
  })

  test('delete blog with wrong token', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]

    let res = await api.delete(`/api/blogs/${blogToUpdate.id}`).set({
      Authorization: 'bearer zzzzz'
    }).expect(401)

    expect(res.body.error).toContain('invalid token')
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await authApi('delete', `/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('update a blog', () => {
  test('update blog without auth', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]

    let res = await api.put(`/api/blogs/${blogToUpdate.id}`).send({
      ...blogToUpdate,
      likes: 1000
    }).expect(401)

    expect(res.body.error).toContain('token missing or invalid')
  })

  test('update blog with wrong token', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]

    let res = await api.put(`/api/blogs/${blogToUpdate.id}`).send({
      ...blogToUpdate,
      likes: 1000
    }).set({
      Authorization: 'bearer zzzzz'
    }).expect(401)

    expect(res.body.error).toContain('invalid token')
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]

    let res = await authApi('put', `/api/blogs/${blogToUpdate.id}`, {
      ...blogToUpdate,
      likes: 1000
    })

    expect(res.body.likes).toBe(1000)
  })

  test('fail with status code 400 if id is\'t valid', async (done) => {
    await authApi('put', '/api/blogs/1', {
      title: 'test1',
      author: 'someone',
      url: 'https://reactpatterns.com/',
      likes: 1000
    }).expect(400)
    done()
  })
})

afterAll(() => {
  mongoose.connection.close()
})