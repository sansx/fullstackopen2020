import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreatBlogForm from './components/CreatBlogForm'
import Togglable from './components/Togglable'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginInfo) => {
    try {
      const user = await loginService.login(loginInfo)
      localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      messageCountdown('Wrong credentials', true)
    }
  }

  const messageCountdown = (message, error = false, timeout = 3000) => {
    error ? setErrorMessage(message) : setMessage(message)
    setTimeout(() => {
      error ? setErrorMessage('') : setMessage('')
    }, timeout)
  }

  const handleCreate = async (blogInfo) => {
    try {
      const blog = await blogService.create(blogInfo)
      blog.user = {
        id: blog.user,
        username: user.username
      }
      setBlogs([...blogs, blog])
      messageCountdown(`a new blog ${blog.title} by ${blog.author}`)
    } catch (err) {
      messageCountdown(err.response.data.error, true)
    }
  }

  const handleLikeUpdate = async (blog) => {
    try {
      const newBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
      console.log(newBlog)
      setBlogs(blogs.map(e => e.id === blog.id ? newBlog : e).sort((a, b) => b.likes - a.likes))
      messageCountdown(`You liked ${blog.title} by ${blog.author}`)
    } catch (err) {
      messageCountdown(err.response.data.error, true)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
      const res = await blogService.delBlog(blog.id)
      console.log(res)
      messageCountdown(`Blog ${blog.title} by ${blog.author} has removed`)
      setBlogs(blogs.filter(e => e.id !== blog.id))
    } catch (err) {
      messageCountdown(err.response.data.error, true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && <Notification message={message} ></Notification>}
      {errorMessage && <Notification message={errorMessage} error={true} ></Notification>}
      {user === null ? <LoginForm submitFn={handleLogin} ></LoginForm> : <div>
        <p>{user.name} logged-in <button onClick={handleLogout} >logout</button> </p>
        <Togglable buttonLabel={'create new blog'} >
          <h2>create new</h2>
          <CreatBlogForm addBlogFn={handleCreate} ></CreatBlogForm>
        </Togglable>
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} incLike={handleLikeUpdate} showDelete={blog.user.username === user.username} onDelete={handleDeleteBlog} />
      )}
    </div>
  )
}

export default App