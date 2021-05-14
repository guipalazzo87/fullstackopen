import React, { useState } from 'react'


const Blog = ({ blog, blogToUpdate, blogToDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (blog) => {
    const addLike = blog.likes + 1
    blogToUpdate({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: addLike,
      id: blog.id
    })
  }

  const deleteButton = () => {
    if (user) {
      return (
        blog.user.username === user.username
          ? <><button onClick={() => remove(blog)}>delete</button><br /></>
          : null
      )
    }
  }

  const remove = (blog) => {
    blogToDelete({
      id: blog.id,
      title: blog.title
    })
  }

  return (
    <div style={blogStyle}>
      <li>
        <div style={hideWhenVisible}>
          {blog.title}, by {blog.author}
          <button onClick={toggleVisibility}>show</button>
        </div>
        <div style={showWhenVisible}>
          Title: {blog.title}<br />
        Author: {blog.author}<br />
        Link: <a href={blog.url}>{blog.url}</a><br /> {/*FIX URL*/}
        Likes: {blog.likes}
          <button onClick={() => like(blog)} >&#x2661;</button><br />
          {deleteButton()}
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </li>
    </div>
  )
}

export default Blog