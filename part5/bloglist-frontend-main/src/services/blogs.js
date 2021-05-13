/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async newObject => {

  try {
    var config = {
      headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` },  
      }
  } catch (error) {
  }

  const request = await axios.get(baseUrl, config)
  return request.data
}

const create = async newObject => {
  console.log(newObject);
  try {
    var config = {
      headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` },  
      }
  } catch (error) {
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll , create}