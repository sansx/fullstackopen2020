import React, { useState } from 'react'
import { like, remove } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const Blog = ({ blog, showDelete }) => {
  const [detail, setDetail] = useState(false)
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button id='trigger' onClick={() => setDetail(!detail)} >{detail ? 'hide' : 'view'}</button>
      {detail && <div>
        <div id='url' > {blog.url} </div>
        <div id="likes">
          likes {blog.likes} <button className="likes" onClick={() => dispatch(like(blog.id))} >like</button>
        </div>
        <div>{blog.user.username}</div>
        {showDelete && <button onClick={() => dispatch(remove(blog)) } >remove</button>}
      </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showDelete: PropTypes.bool.isRequired,
}

export default Blog
