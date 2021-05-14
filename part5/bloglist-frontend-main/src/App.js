import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  const NotErr = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div className="error">
        {message}
      </div>
    );
  };

  const NotSucc = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div className="success">
        {message}
      </div>
    );
  };

  useEffect(() => {
    renderBlogs()
  }, [])

  const renderBlogs = () => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
      )
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // blogService.setToken(user.token) // REMOVED THIS FUNCTION TODO: FIX
    }
  }, [])


  const addBlog = async (blogObject) => {
    // blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url
    }
    blogService
      .create(newBlog, user)
      .then(returnedBlog => {
        renderBlogs()
        setSuccessMessage(`new blog ${returnedBlog.title}, by ${returnedBlog.author}, added to the list`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Coudn't add to blog list. Error ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        console.log(error)
      })
  }

  const addLike = (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then(() =>
        renderBlogs())
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`Delete ${blogObject.title}?`)) {
      blogService
        .remove(blogObject.id)
        .then(() =>
          renderBlogs())
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Successfully logged in as ${user.username}`)
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      renderBlogs()
    } catch (exception) {
      setErrorMessage(`wrong credentials`)
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log(exception);
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setSuccessMessage(`Successfully logged out`)
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    setUser(null)
    renderBlogs()
  }


  return (
    <div>
      <NotErr message={errorMessage} />
      <NotSucc message={successMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button type="button" onClick={handleLogout}>Log out</button>
          {blogForm()}
        </div>
      }
      <div>
        <h2>blogs</h2>
        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} blogToUpdate={addLike} blogToDelete={removeBlog} user={user} />)
          }
        </ul>
      </div>
    </div>
  )
}


export default App