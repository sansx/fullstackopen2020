import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Button, InputGroup, FormControl, ListGroup, Jumbotron } from 'react-bootstrap'
import { like, remove, comment as updateComments } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [comment, resetComment] = useField()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = blogs ? blogs.find(e => e.id === match.params.id)
    : null;

  if (!blog) {
    return null
  }

  const addComment = () => {
    if (!comment.value || comment.value === '') return
    dispatch(updateComments(match.params.id, comment.value))
    resetComment()
  }

  return <div>
    <Jumbotron style={{padding: '2rem 1rem'}} >
      <h2> {blog.title} {blog.author} </h2>
      <div>
        <h4 >
          <div id='url' >  <a href={blog.url}>{blog.url}</a>  </div>
        </h4>
        <h4>
          <div id="likes">
            likes <strong>{blog.likes}</strong> <Button className="likes" variant="success" style={{ marginLeft: "16px" }} onClick={() => dispatch(like(blog.id))} >like</Button>
          </div>
        </h4>
        <h5 style={{ marginBottom: "36px" }}>
          <div>added by <strong>{blog.user.name}</strong></div>
        </h5>
        {!!user && blog.user.username === user.username && <Button variant='danger' block onClick={() => { dispatch(remove(blog, () => history.replace('/blogs'))) }} >remove</Button>}
      </div>
    </Jumbotron>

    <h3> comments </h3>
    <div>
      <InputGroup >
        <FormControl id='comment' {...comment} /><InputGroup.Append><Button onClick={addComment} >add comment</Button> </InputGroup.Append>
      </InputGroup>
    </div>
    <ListGroup style={{ marginTop: "16px" }} >
      {blog.comments.map((comment, idx) => <ListGroup.Item key={idx} > <strong>{idx + 1}.</strong> {comment} </ListGroup.Item>)}
    </ListGroup>
  </div>
}



export default BlogDetail

