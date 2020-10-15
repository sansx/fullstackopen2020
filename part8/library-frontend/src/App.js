import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add') {
      setPage('books')
    }
  }

  useEffect(() => {
    let token = localStorage.getItem('token')
    token && setToken(token)
  }, [])

  useEffect(() => {
    if (token && page === 'login') { setPage('books') }
  }, [token, page])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? <button onClick={() => setPage('login')}>login</button> : <><button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout} > logout </button> </>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      {!token && page === 'login' && <LoginForm setToken={setToken} />}
    </div>
  )
}

export default App