import React from 'react'
const Blog = ({blog}) => (
  <li>
    {blog.title}, by {blog.author}, link: {blog.url}. Likes: {blog.likes}
  </li>  
)

export default Blog