import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../mutations'
import { useField } from '../hooks'

const LoginForm = ({ setError, setToken }) => {
  const [username, resetUsername] = useField()
  const [password, resetPassword] = useField('password')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username: username.value, password: password.value } })
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input {...username} />
        </div>
        <div>
          password <input {...password} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm