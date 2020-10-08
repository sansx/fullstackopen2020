import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = () => {
  const [title, resetTitle] = useField()
  const [author, resetAuthor] = useField()
  const [url, resetUrl] = useField()
  const dispatch = useDispatch()

  const submitBlog = (e) => {
    e.preventDefault()
    dispatch(create({ title: title.value, author: author.value, url: url.value }))
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return <form onSubmit={submitBlog}>
    <div>
      title:<input id="title" {...title} />
    </div>
    <div>
      author:<input id='author' {...author} />
    </div>
    <div>
      url:<input id='url' {...url} />
    </div>
    <button id="createBtn" type="submit">create</button>
  </form>
}


export default BlogForm



