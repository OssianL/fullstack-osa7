const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there are some blogs saved', async () => {
  beforeEach(async () => {
    await User.remove({})
    const users = helper.initialUsers.map(user => new User(user))
    const promiseArray2 = users.map(user => user.save())
    await Promise.all(promiseArray2)
    await Blog.remove({})
    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(6)
  })

  test('all blogs contain certain blog', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body.map(blog => blog.title)
    expect(blogs).toContain('Canonical string reduction')
  })

  test('blogs have id field defined and not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(blogs[0].id).toBeDefined()
    expect(blogs[0]._id).toBeUndefined()
  })

  test('new blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Asdf Asdf',
      url: 'https://asdfasdfasdf.com/',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    let blogs = await helper.blogsInDb()
    blogs = blogs.map(blog => blog.title)
    expect(blogs).toContain(newBlog.title)
    expect(blogs.length).toBe(7)
  })

  test('new blog without a value for likes gets a default value of 0', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Asdf Asdf',
      url: 'https://asdfasdfasdf.com/'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
    const blogs = await helper.blogsInDb()
    const likes = blogs[blogs.length - 1].likes
    expect(likes).toBeDefined()
    expect(likes).toBe(0)
  })

  test('cannot add new blog without url', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Asdf Asdf',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('cannot add new blog without title', async () => {
    const newBlog = {
      author: 'Asdf Asdf',
      url: 'https://asdfasdfasdf.com/',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('deletion of a blog succeeds with status code 200', async () => {
    const blogsBefore = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogsBefore[0].id}`)
      .expect(200)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.map(blog => blog.title)).not.toContain(blogsBefore[0].title)
    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
  })
})

test('update of a blog succeeds with valid input', async () => {
  const blogsBefore = await helper.blogsInDb()
  const newBlog = {
    title: 'test blog',
    author: 'Asdf Asdf',
    url: 'https://asdfasdfasdf.com/',
    likes: 1,
  }
  const response = await api
    .put(`/api/blogs/${blogsBefore[0].id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.title).toBe(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})