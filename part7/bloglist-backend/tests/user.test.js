const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
//...
// beforeEach(async () => {
//   await User.deleteMany({})

//   const blogObjects = helper.initialBlogs
//     .map(blog => new User(blog))
//   const promiseArray = blogObjects.map(blog => blog.save())
//   await Promise.all(promiseArray)
// })

mongoose.set('useCreateIndex', true)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user login with wrong password or username', async () => {
    const err1 = await api.post('/api/login')
      .send({
        username: 'root',
        password: '',
      }).expect(401)

    const err2 = await api.post('/api/login')
      .send({
        username: 'zzzz',
        password: '',
      }).expect(401)

    expect(err1.body.error).toContain('invalid username or password')
    expect(err2.body.error).toContain('invalid username or password')
  })


})

describe('create user with wrong info', () => {
  test('create user with username and password that shorter than 3 characters ', async () => {
    const err1 = await api.post('/api/users')
      .send({
        username: 'xx',
        name: 'test',
      }).expect(400)

    const err2 = await api.post('/api/users')
      .send({
        username: 'xxxxx',
        name: 'test',
        password: 'qw'
      }).expect(400)

    expect(err1.body.error).toContain('both username and password must be at least 3 characters long.')
    expect(err2.body.error).toContain('both username and password must be at least 3 characters long.')
  })
})

afterAll(() => {
  mongoose.connection.close()
})