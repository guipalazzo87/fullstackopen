const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test(`a returned blogs will have 'id' (instead of '_id') property`, async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined();
})

test('a created blog will increase blog list by 1', async () => {
  const newBlog = {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 10
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const content = response.body.map(blog => blog.toJSON())
  // const contents = response.body.map(r => {
  //   console.log(r);
  //   r.content
  // })


  expect(content).toContainEqual(helper.initialBlogs[0])
})

test(`blog without likes defaults to 0 likes`, async () => {
  const newBlog = {
    title: 'String',
    author: 'String',
    url: 'String',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
  
  const response = await api.get('/api/blogs')
  expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})
  

test(`blog without title or without URL return 400 and isn't added`, async () => {
  const noTitle =  {
    title: '',
    author: 'String',
    url: 'String',
    likes: 10
  }
  const noUrl = {
    title: 'String',
    author: 'String',
    url: '',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)
  
    await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.content)

  expect(contents).not.toContain(blogToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
})