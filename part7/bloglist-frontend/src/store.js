import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import {
  composeWithDevTools
} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  user: loginReducer,
  blogs: blogReducer,
  notice: notificationReducer,
  userlist: usersReducer
  // filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store