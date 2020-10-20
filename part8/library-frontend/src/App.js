import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import { BOOK_ADDED } from './subscriptions'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        let book = subscriptionData.data.bookAdded
        alert(`${book.title} added`)
        updateCacheWith(book)
      }
      console.log(subscriptionData)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add' || page === 'recommend') {
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
          <button onClick={() => setPage('recommend')}> recommend </button>
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

      { page === 'recommend' && <Recommend />}
    </div>
  )
}

export default App