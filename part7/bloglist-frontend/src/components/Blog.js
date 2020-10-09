import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showDelete: PropTypes.bool.isRequired,
}

export default Blog
