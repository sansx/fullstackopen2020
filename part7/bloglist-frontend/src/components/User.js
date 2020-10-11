import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Jumbotron, Accordion, Card, ListGroup } from 'react-bootstrap'

const User = () => {
  const users = useSelector(state => state.userlist)
  const match = useRouteMatch('/users/:id')
  const user = users ? users.find(e => e.id === match.params.id)
    : null;

  console.log(match, users, user);
  if (!user) {
    return null
  }

  return (
    <Jumbotron style={{ padding: '2rem 1rem' }} >
      <div>
        <h2> {user.name} </h2>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              added blogs
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <ListGroup  variant="flush" >
                {user.blogs.map((blog, idx) => <ListGroup.Item key={blog.id} > <strong>{idx + 1}.</strong> {blog.title} </ListGroup.Item>)}
              </ListGroup>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </Jumbotron>
  )
}


export default User;



