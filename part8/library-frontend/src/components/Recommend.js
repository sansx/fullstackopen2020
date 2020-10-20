import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries'

export const Recommend = () => {
  const [getBooks, bookRes] = useLazyQuery(ALL_BOOKS)
  const result = useQuery(ME, {
    onCompleted: ({ me }) => {
      getBooks({ variables: { genre: me.favoriteGenre } })
    }
  })

  if (result.loading || !bookRes.data) {
    return <div><h2>recommendations</h2>  loading...</div>
  }

  const me = result.data.me
  const books = bookRes.data.allBooks

  return <div>
    <h2>recommendations</h2>
    <div>books in your favorite genre <strong> {me.favoriteGenre} </strong> </div>
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
  </div>
  // getBooks({ variables: { genre } })

}

export default Recommend;


