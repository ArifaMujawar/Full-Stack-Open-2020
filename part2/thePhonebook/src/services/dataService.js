import axios from 'axios';
//to run locally
const baseUrl = 'http://localhost:3001/persons' 
//const baseUrl = '/api/persons'
const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson =(id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deletePerson}
