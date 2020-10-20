import {
  gql
} from '@apollo/client'

export const ALL_AUTHORS = gql `
  query {
    allAuthors{
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql `
  query allBooks($author: String, $genre: String){
    allBooks(author:$author, genre:$genre){
      title
      published
      author{
        name
        born
        id
      }
      id
      genres
    }
  }
`

export const ALL_TYPES = gql `
  query {
  allTypes
}
`

export const ME = gql `
  query{
    me{
      username
      favoriteGenre
    }
  }
`