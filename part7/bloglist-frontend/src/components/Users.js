import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.userlist)
  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><td>user name</td><td><strong>blogs created</strong></td></tr>
          {users.map(user => <tr key={ user.id } ><td><Link to={`/users/${user.id}`} >{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}


export default Users;



