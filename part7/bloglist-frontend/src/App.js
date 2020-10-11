import React, { useEffect } from 'react'
import Blog from './components/Blog'
import BlogDetail from './components/BlogDetail'
import blogService from './services/blogs'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import CreatBlogForm from './components/CreatBlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Header from './components/HeaderNav'
import { Table, Jumbotron, Spinner } from 'react-bootstrap'
import { setUser } from './reducers/loginReducer'
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
    <div className="container">
      <Header></Header>

      <Jumbotron>
        <h2>blog app</h2>
        <Notification></Notification>
        <Notification error={true} ></Notification>
      </Jumbotron>

      <Switch>
        <Redirect exact path="/" to='/blogs' ></Redirect>
        <Route exact path="/blogs" >
          <div className="blogList">
            <h2>Blogs</h2>
            {!blogs && <Spinner animation="border" variant="primary" />}
            <Table striped>
              <thead>
                <tr><td><strong>Title</strong></td><td><strong>Author</strong></td></tr>
              </thead>
              <tbody>

                {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                  <Blog key={blog.id} blog={blog} showDelete={!!user && blog.user.username === user.username} />
                )}
              </tbody>
            </Table>
          </div>
          <Togglable buttonLabel={'create new blog'} >
            <h2>create new</h2>
            <CreatBlogForm ></CreatBlogForm>
          </Togglable>
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