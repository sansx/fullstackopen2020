import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incLike, showDelete, onDelete }) => {
  const expectInfo = ['url', 'likes', 'author']
  const [detail, setDetail] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}  <button onClick={() => setDetail(!detail)} >{detail ? 'hide' : 'view'}</button>
      {detail && <div>
        {expectInfo.map(e => <div key={Math.random()} >  {e === 'likes' ? <> likes {blog[e]} <button onClick={() => incLike({ ...blog, user: blog.user.id })} >like</button></> : blog[e]} </div>)}
        {showDelete && <button onClick={() => onDelete(blog)} >remove</button>}
      </div>}

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incLike: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Blog
