import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  return (
    <tr key={blog.id}>
      <td>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </td>
      <td>
        {blog.author}
      </td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showDelete: PropTypes.bool.isRequired,
}

export default Blog
