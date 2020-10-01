const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.password || body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({
      error: 'both username and password must be at least 3 characters long.'
    })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (err) {
    response.status(400).json({
      error: err.message
    })
  }
})

module.exports = usersRouter