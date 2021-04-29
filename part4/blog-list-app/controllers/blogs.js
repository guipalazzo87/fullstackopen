const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
  
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

//TODO: blogsRouter.delete is return 204 even when there wasn't any blog to delete


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
  
 
  response.json({updatedBlog}).status(200).end()
})

module.exports = blogsRouter