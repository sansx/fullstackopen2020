import React, { useState } from 'react'


const LoginForm = ({ submitFn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = (e) => {
    e.preventDefault()
    submitFn({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={userLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginBth' type="submit">login</button>
    </form>
  )
}

export default LoginForm


