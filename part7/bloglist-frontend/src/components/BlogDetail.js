import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { like, remove } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = blogs ? blogs.find(e => e.id === match.params.id)
    : null;

  if (!blog) {
    return null
  }

  return <div>
    <h2> {blog.title} {blog.author} </h2>
    <div>
      <div id='url' >  <a href={blog.url}>{blog.url}</a>  </div>
      <div id="likes">
        likes {blog.likes} <button className="likes" onClick={() => dispatch(like(blog.id))} >like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {!!user && blog.user.username === user.username && <button onClick={() => dispatch(remove(blog))} >remove</button>}
    </div>
  </div>
}



export default BlogDetail

