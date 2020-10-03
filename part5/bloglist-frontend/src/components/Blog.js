import React, { useState } from 'react'

const Blog = ({ blog, incLike }) => {
  const expectInfo = ['url', 'likes', 'author']
  const [detail, setDetail] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  delete blog.user

  return (
    <div style={blogStyle}>
      {blog.title}  <button onClick={() => setDetail(!detail)} >{detail ? 'hide' : 'view'}</button>
      {detail && expectInfo.map(e => <div key={Math.random()} >  {e === 'likes' ? <> likes {blog[e]} <button onClick={() => incLike(blog)} >like</button></> : blog[e]} </div>)}
    </div>
  )
}

export default Blog
