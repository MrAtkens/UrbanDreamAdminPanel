import axios from 'axios'
import { URLAdmin } from '../settings'

axios.defaults.withCredentials = true

const userSingInApi = async (login, password) => {
  return await axios.post(`${URLAdmin}/api/auth/SignIn`, {
    login: login,
    password: password
  }).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}

const userGetData = async () => {
  console.log(localStorage.getItem('jwt_token'));
  return await axios.get(`${URLAdmin}/api/auth/GetUserData`, {headers:
        { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
    return response
  }).catch(error => {
    return error.response
  })
}


export const authenticationService = {
  userSingInApi,
  userGetData
};
