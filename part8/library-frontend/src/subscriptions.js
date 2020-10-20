import {
  gql
} from '@apollo/client'

export const BOOK_ADDED = gql `
  subscription {
    bookAdded {
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