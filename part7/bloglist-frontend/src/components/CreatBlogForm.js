import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
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

  return <Form onSubmit={submitBlog}>
    <Form.Group>
      <Form.Label>title:</Form.Label>
      <Form.Control id="title" {...title} />
      <Form.Label>author:</Form.Label>
      <Form.Control id='author' {...author} />
      <Form.Label>url:</Form.Label>
      <Form.Control id='url' {...url} />
      <Button block variant="success" style={{marginTop:"10px"}} type="submit">
        create
    </Button>
    </Form.Group>
  </Form>

  // <form onSubmit={submitBlog}>
  //   <div>
  //       title:<input id="title" {...title} />
  //   </div>
  //   <div>
  //       author:<input id='author' {...author} />
  //   </div>
  //   <div>
  //       url:<input id='url' {...url} />
  //   </div>
  //   <button id="createBtn" type="submit">create</button>
  // </form>
}


export default BlogForm



