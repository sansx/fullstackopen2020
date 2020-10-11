import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.userlist)
  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr><td><strong>user name</strong></td><td><strong>blogs created</strong></td></tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id} ><td><Link to={`/users/${user.id}`} >{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </Table>
    </div>
  )
}


export default Users;



