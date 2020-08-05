const blogRouter = require('express').Router()
const Blog = require('../models/blogs')



blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.hasOwnProperty('likes')) {
    blog['likes'] = 0;
  }
  if(!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')){
    console.log('missing props');
    response.status(400).json({ error: 'content missing' })
  }
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
module.exports = blogRouter