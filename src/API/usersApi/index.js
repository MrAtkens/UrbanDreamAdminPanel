import axios from 'axios'
import { URLAdmin } from '../settings'

axios.defaults.withCredentials = true

const getUsers = async () => {
  console.log(localStorage.getItem('token'));
  return await axios.get(`${URLAdmin}/api/user`, {headers:
        { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const getUserById = async (id) => {
  return await axios.get(`${URLAdmin}/api/user/${id}`, {headers:
        { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const editUser = async (id, firstName, lastName, password, email) => {
  return await axios.put(`${URLAdmin}/api/user/${id}`, {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
  }, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
        ).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}

const deleteUser = async (id) => {
  return await axios.delete(`${URLAdmin}/api/user/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
  ).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}

export const usersService = {
  getUsers,
  getUserById,
  editUser,
  deleteUser
};
