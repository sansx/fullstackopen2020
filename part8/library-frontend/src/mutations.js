import {
  gql
} from '@apollo/client'

export const ADD_BOOK = gql `
  mutation addBook($title: String!,
    $author: String,
    $published: Int!,
    $genres: [String!]!){
    addBook(title: $title,author:$author, published:$published, genres:$genres ){
      title
    }
  }
`

export const EDIT_AUTHOR = gql `
  mutation editAuthor($name: String,
    $setBornTo: Int!){
      editAuthor(name: $name,setBornTo:$setBornTo ){
        name
        id
        born
        bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`