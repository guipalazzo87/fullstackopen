import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {

  try {
    var config = {
      headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` },
    }
  } catch (error) {
    console.log(error)
  }

  const request = await axios.get(baseUrl, config)
  return request.data
}

const create = async newObject => {
  try {
    var config = {
      headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` },
    }
  } catch (error) {
    console.log(error)
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  try {
    var config = {
      headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` },
    }
  } catch (error) {
    console.log(error)
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  try {
    var config = {
      headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` },
    }
  } catch (error) {
    console.log(error)
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll , create, update, remove }