const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users');
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('User', {
      username: 1,
      name: 1
    })

  res.json(blogs) //.map(n=> n.toJSON())
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

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  if (!request.body.hasOwnProperty('likes')) {
    request.body['likes'] = 0;
  }
  if (!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')) {
    console.log('missing props');
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id

  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)

})

blogRouter.delete('/:id', async (req, res) => {

  const blog = await Blog.findById(req.params.id)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if(blog.user.toString() !== decodedToken.id.toString()){
    return res.status(401).json({error:'permission denied!'})
  }

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
  Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true
  }).then(updatedBlog => {
    res.json(updatedBlog.toJSON())
  }).catch(e => next(e))
})
module.exports = blogRouter