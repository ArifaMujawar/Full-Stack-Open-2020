const blogRouter = require('express').Router()
const Blog = require('../models/blogs')



blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})


blogRouter.get('/:id', async (request, response, next) => {
  console.log('within :id')
  await Blog.findById(request.params.id, (err, data) => {
    console.log('data is ', data)
    if (!data) {
      response.status(404).end()

    } else {
      response.json(data.toJSON())
    }
  }).catch(e => next(e))


})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.hasOwnProperty('likes')) {
    blog['likes'] = 0;
  }
  if (!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')) {
    console.log('missing props');
    return response.status(400).json({ error: 'content missing' })
  }
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', (req, res, next) => {

  const body = req.body
  console.log('body ', body)
  const blog = {
    likes: body.likes
  }

  console.log('blog ', blog)
  Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).then(updatedBlog => {
    res.json(updatedBlog.toJSON())
  }).catch(e => next(e))
})
module.exports = blogRouter