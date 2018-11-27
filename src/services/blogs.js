import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
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


export default { getAll , setToken, create, update, dell }