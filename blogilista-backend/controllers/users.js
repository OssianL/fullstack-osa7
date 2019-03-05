const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  }
  catch(error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    if(!body.password || body.password.length < 3)
      throw {name: 'ValidationError', message: 'password too short'}
    const passwordHash = await bcrypt.hash(body.password, 10)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      blogs: []
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  }
  catch(error) {
    next(error)
  }
})

module.exports = usersRouter