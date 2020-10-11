import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
// let config = {
//   headers: {
//     Authorization: token
//   },
// }

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const res = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return res.data
}

const addComment = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const res = await axios.post(`${ baseUrl }/${id}/comments`, newObject, config)
  return res.data
}

const delBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const res = await axios.delete(`${ baseUrl }/${id}`, config)
  return res.data
}

export default {
  getAll,
  create,
  update,
  delBlog,
  setToken,
  addComment
}