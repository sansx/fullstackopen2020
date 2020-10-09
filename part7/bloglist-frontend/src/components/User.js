import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.userlist)
  const match = useRouteMatch('/users/:id')
  const user = users ? users.find(e => e.id === match.params.id)
    : null;

  console.log(match, users, user);
  if (!user) {
    return null
  }

  return (
    <div>
      <h2> {user.name} </h2>
      <h3> added blogs </h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id} > {blog.title} </li>)}
      </ul>

    </div>
  )
}


export default User;



