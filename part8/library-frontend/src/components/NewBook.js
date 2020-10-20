import React, { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { ADD_BOOK } from '../mutations'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()
  // const cache =  InMemoryCache()
  // console.log(client, client.cache.data.data);
  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, { data }) => {
      client.cache.evict({ fieldName: 'allBooks' })
    },
    refetchQueries: [{ query: ALL_AUTHORS }, 'allBooks'],
    onError: (error) => {
      // setError(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    addBook({ variables: { title, author, published: published * 1, genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook