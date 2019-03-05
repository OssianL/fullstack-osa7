const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    res.json(blogs)
  }
  catch(error) {
    next(error)
  }
})

blogRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    if(body.title === undefined || body.url === undefined) {
      return res.status(400).end()
    }
    const decodedToken = jwt.verify(req.token, config.secret)
    const user = await User.findById(decodedToken.id)
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id,
      comments: []
    }
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  }
  catch(error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, config.secret)
    const blog = await Blog.findById(req.params.id)
    if(blog.user !== undefined && blog.user.toString() !== decodedToken.id)
      return res.status(401).end()
    blog.remove()
    res.status(200).end()
  }
  catch(error) {
    next(error)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body
    if(body.title === undefined || body.url === undefined) {
      return res.status(400).end()
    }
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {new: true})
    res.json(updatedBlog.toJSON())
  }
  catch(error) {
    next(error)
  }
})

blogRouter.post('/:id/comments', async (req, res, next) => {
  try {
    const body = req.body
    if(body.content === undefined) {
      return res.status(400)
    }
    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(body.content)
    await blog.save()
    res.status(201).json({content: body.content})
  }
  catch(error) {
    next(error)
  }
})

module.exports = blogRouter
