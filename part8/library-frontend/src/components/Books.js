import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_TYPES } from '../queries'

const Books = (props) => {
  // const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const res = useQuery(ALL_TYPES)

  const filter = genre => { setGenre( genre || "all" );  getBooks({ variables: { genre } })}
 
  useEffect(() => {
    getBooks()
  }, [])// eslint-disable-line 

  // useEffect(() => {
  //   if (result.data) {
  //     getBooks({ variables: { genre } })
  //   }
  // }, [result.data])// eslint-disable-line 

  if (!props.show) {
    return null
  }

  if (result.loading || res.loading) {
    return <div><h2>books</h2>loading...</div>
  }

  const books = result.data.allBooks
  const types = res.data.allTypes

  return (
    <div>
      <h2>books</h2>

    <div> in genre <strong> { genre } </strong> </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      { types.map(type => <button key={type} onClick={() => {filter(type)}} > {type} </button>)} <button onClick={() => {filter()}} > all types </button>
    </div>
  )
}

export default Books