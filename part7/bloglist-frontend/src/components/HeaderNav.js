import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'
import LoginForm from './LoginForm'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#" as="span">
          <Link to='/users' > users </Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to='/blogs' > blogs </Link>
        </Nav.Link>
      </Nav>
      {user
        ? <em style={{color:"#fff"}} >{user.name} logged in <Button as="span" style={{ marginLeft: "16px" }} variant="secondary" size='sm' onClick={() => dispatch(logout())} >logout</Button></em>
        : <LoginForm ></LoginForm>
      }
    </Navbar.Collapse>
  </Navbar>
}

export default Header


