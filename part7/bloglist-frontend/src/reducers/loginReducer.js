import loginServer from '../services/login'
import blogService from '../services/blogs'
import {
  setNotification
} from './notificationReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.data
    case 'LOGOUT_USER':
      return initialState
    default:
      return state;
  }
}

export const login = info => async dispatch => {
  try {
    let user = await loginServer.login(info)
    localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)
    return dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  } catch (error) {
    setNotification('Wrong credentials', 5)
  }
}

export const logout = () => async dispatch => {
  localStorage.removeItem('user')
  return dispatch({
    type: 'LOGOUT_USER'
  })
}

export const setUser = user => async dispatch => dispatch({
  type: 'LOGIN_USER',
  data: user
})

export default reducer