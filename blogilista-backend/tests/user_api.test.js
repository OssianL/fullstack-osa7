const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there are some users saved', async () => {
  beforeEach(async () => {
    await User.remove({})
    const users = helper.initialUsers.map(user => new User(user))
    const promiseArray = users.map(user => user.save())
    await Promise.all(promiseArray)
  })

  test('valid user can be added', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: 'testUser1',
      name: 'asdf',
      password: 'asdf'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(usersAfter.map(user => user.username)).toContain(newUser.username)
  })

  test('user without username wont be added', async () => {
    const newUser = {
      name: 'asdf',
      password: 'asdf'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user without password wont be added', async () => {
    const newUser = {
      username: 'testUser1',
      name: 'asdf',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user with too short username wont be added', async () => {
    const newUser = {
      username: 'aa',
      name: 'asdf',
      password: 'asdf'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user with too short password wont be added', async () => {
    const newUser = {
      username: 'testUser1',
      name: 'asdf',
      password: 'aa'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})