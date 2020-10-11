import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'

const LoginForm = () => {
  const [username, resetUsername] = useField()
  const [password, resetPassword] = useField('password')
  const dispatch = useDispatch()

  const userLogin = (e) => {
    e.preventDefault()
    dispatch(login({ username: username.value, password: password.value }))
    resetUsername()
    resetPassword()
  }

  return (
    <Form inline onSubmit={userLogin}>
      <Form.Group>
        {/* <Form.Label htmlFor="username">username</Form.Label> */}
        <Form.Control
          className="mx-sm-3"
          id="username"
          placeholder='username'
          {...username}
        />
      </Form.Group>
      <Form.Group>
        {/* <Form.Label htmlFor="password">password</Form.Label> */}
        <Form.Control
          className="mx-sm-3"
          id="password"
          placeholder='password'
          {...password}
        />
      </Form.Group>
      <Button id='loginBth' type="submit">login</Button>
    </Form>
    // <form onSubmit={userLogin}>
    //   <div>
    //     username
    //     <input
    //       id='username'
    //       type="text"
    //       value={username}
    //       name="Username"
    //       onChange={({ target }) => setUsername(target.value)}
    //     />
    //   </div>
    //   <div>
    //     password
    //     <input
    //       id='password'
    //       type="password"
    //       value={password}
    //       name="Password"
    //       onChange={({ target }) => setPassword(target.value)}
    //     />
    //   </div>
    //   <button id='loginBth' type="submit">login</button>
    // </form>

  )
}

export default LoginForm


