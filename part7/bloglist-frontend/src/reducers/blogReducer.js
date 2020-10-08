import blogsService from '../services/blogs'
import {
  setNotification
} from './notificationReducer'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "LIKE_BLOG":
      const {
        blog
      } = action.data

      console.log(blog);
      return state.map(e => e.id === blog.id ? blog : e);
    case "NEW_BLOG":
      return [
        ...state,
        action.data
      ];
    case 'INIT_BLOGS':
      return action.data;
    case 'DELETE_BLOG':
      return state.filter(e => e.id !== action.data)
    default:
      return state;
  }
}

export const create = (content) => async (dispatch, getState) => {
  try {
    const blog = await blogsService.create(content)
    const user = getState().user
    dispatch({
      type: 'NEW_BLOG',
      data: {
        ...blog,
        user
      }
    })
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author}`))
  } catch (err) {
    dispatch(setNotification(err.response.data.error, true))
  }
}

export const like = id => async (dispatch, getState) => {
  const state = getState().blogs;
  const res = state.find(e => e.id === id)
  res.user = res.user.id

  try {
    let blog = await blogsService.update(id, {
      ...res,
      likes: ++res.likes
    })

    dispatch({
      type: 'LIKE_BLOG',
      data: {
        blog
      }
    })
    dispatch(setNotification(`You liked ${blog.title} by ${blog.author}`))
  } catch (err) {
    dispatch(setNotification(err.response.data.error, true))
  }
}

export const remove = blog => async dispatch => {
  try {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    await blogsService.delBlog(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog.id
    })
    dispatch(setNotification(`Blog ${blog.title} by ${blog.author} has removed`))
  } catch (err) {
    dispatch(setNotification(err.response.data.error, true))
  }
}

export const initblogs = () => async dispatch => {
  try {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
    dispatch(setNotification(`successed get all blogs`))
  } catch (error) {

  }

}


export default reducer