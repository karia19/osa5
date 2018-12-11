import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getUsers = async () => {
  const request = await axios.get('/api/users')
  return request.data
}
const getUserBlogs = async (id) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data
}
const makeComment = async (id, comments) => {
  const respone = await axios.post(`/api/blogs/${id}/comments`, comments)
  return respone.data

}



const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const create = async (newObject) => {
  const config = {
    headers: {  'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}
const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data

}
const dell = async (blogId) => {
  const config = {
    headers: {  'Authorization': token }
  }
  const re = await axios.delete(`${baseUrl}/${blogId}`, config)
  return re.data

}


export default { getAll , setToken, create, update, dell, getUsers, getUserBlogs, makeComment }