import React, { useEffect } from 'react'
import Blog from './components/Blog'
import BlogDetail from './components/BlogDetail'
import blogService from './services/blogs'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreatBlogForm from './components/CreatBlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { setUser, logout } from './reducers/loginReducer'
import { initblogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'

import './App.css'

/**
 * name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
 */

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initblogs())
    dispatch(initUsers())
    const loggedUserJSON = localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <Notification></Notification>
      <Notification error={true} ></Notification>
      {user === null ? <LoginForm ></LoginForm> : <div>
        <p>{user.name} logged in <button onClick={() => dispatch(logout())} >logout</button> </p>
        <Link to='/users' > users </Link> <Link to='/blogs' > blogs </Link>
      </div>}

      <Switch>
        <Redirect exact path="/" to='/blogs' ></Redirect>
        <Route exact path="/blogs" >
          <Togglable buttonLabel={'create new blog'} >
            <h2>create new</h2>
            <CreatBlogForm ></CreatBlogForm>
          </Togglable>
          <div className="blogList">
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} showDelete={!!user && blog.user.username === user.username} />
            )}
          </div>
        </Route>
        <Route exact path="/blogs/:id" >
          <BlogDetail />
        </Route>

        <Route exact path='/users' > <Users />  </Route>
        <Route exact path='/users/:id' > <User />  </Route>
      </Switch>
    </div>
  )
}

export default App