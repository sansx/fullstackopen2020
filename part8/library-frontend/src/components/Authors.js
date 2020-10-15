import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../mutations'
import { useField } from '../hooks'
import Select from "react-select";


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [born, resetBorn] = useField('number')
  const [selectedOption, setSelectedOption] = useState(null);
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors
  const options = authors.map(author => ({ value: author.name, label: author.name }))

  const handleUpdate = () => {
    updateAuthor({ variables: { name: selectedOption.value, setBornTo: born.value*1 } })
    resetBorn()
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <div> born<input {...born} id='born' /> </div>
      <button onClick={handleUpdate} >update author</button>
    </div>
  )
}

export default Authors
