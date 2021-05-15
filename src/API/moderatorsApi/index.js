import axios from 'axios'
import { URLAdmin } from '../settings'

axios.defaults.withCredentials = true

const getModerators = async () => {
  console.log(localStorage.getItem('jwt_token'));
  return await axios.get(`${URLAdmin}/api/moderator`, {headers:
        { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const getModeratorById = async (id) => {
  return await axios.get(`${URLAdmin}/api/moderator/${id}`, {headers:
        { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}

const addModerator = async (login, password) => {
  return await axios.post(`${URLAdmin}/api/moderator`, {
    login: login,
    password: password
  }, {headers:
        { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
        ).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}

const editModerator = async (id, login, password) => {
  return await axios.put(`${URLAdmin}/api/moderator/${id}`, {
    login: login,
    password: password
  }, {headers:
        { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
        ).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}

const deleteModerator = async (id) => {
  return await axios.delete(`${URLAdmin}/api/moderator/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
  ).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}

export const moderatorsService = {
  getModerators,
  getModeratorById,
  addModerator,
  editModerator,
  deleteModerator
};
