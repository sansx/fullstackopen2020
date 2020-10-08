import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.userslist)
  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>  <td>user name</td> <td> <strong>blogs created</strong> </td> </tr>
          {users.map(user => <tr> <td> {user.name} </td> <td>{user.blogs.length}</td> </tr>)}
        </tbody>
      </table>
    </div>
  )
}


export default Users;



