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
    await api.post('/api/blogs').send(blog_will_up).expect(201)
    const res = (await api.get('/api/blogs')).body.filter(e => e.title === blog_will_up.title)[0]
    expect(res).toHaveProperty('likes', 0)
  })

  test('if no titlel or url then return 400 error', async (done) => {
    const post_blog_without_sth = {
      author: 'someone'
    }
    await api.post('/api/blogs').send(post_blog_without_sth).expect(400)
    done()
  })

})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
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
  test('succeeds with status code 204 if id is valid', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]

    let res = await api
      .put(`/api/blogs/${blogToUpdate.id}`).send({
        ...blogToUpdate,
        likes: 1000
      })

    expect(res.body.likes).toBe(1000)
  })

  test('fail with status code 400 if id is valid', async (done) => {
    await api.put('/api/blogs/1').send({
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