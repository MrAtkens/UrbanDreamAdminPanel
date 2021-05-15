import axios from 'axios'
import { URLAdmin } from '../settings'

axios.defaults.withCredentials = true

const getBrigadesAPI = async () => {
    console.log(localStorage.getItem('token'));
    return await axios.get(`${URLAdmin}/api/brigade`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        return response
    }).catch(error => {
        return error.response
    })
}

const getBrigadeByIdAPI = async (id) => {
    return await axios.get(`${URLAdmin}/api/brigade/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        return response
    }).catch(error => {
        return error.response
    })
}

const addBrigade = async (firstName, lastName, login, password, brigadeName, brigadeWorkAddress, brigadeWorkersCount) => {
    return await axios.post(`${URLAdmin}/api/brigade`, {
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password,
        brigadeName: brigadeName,
        brigadeWorkAddress: brigadeWorkAddress,
        brigadeWorkersCount: brigadeWorkersCount
        }, {headers:
                { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}


const editBrigadeAPI = async (id, firstName, lastName, login, password, brigadeName, brigadeWorkAddress, brigadeWorkersCount) => {
    return await axios.put(`${URLAdmin}/api/brigade/${id}`, {
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password,
        brigadeName: brigadeName,
        brigadeWorkAddress: brigadeWorkAddress,
        brigadeWorkersCount: brigadeWorkersCount
        }, {headers:
                { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const deleteBrigadeAPI = async (id) => {
    return await axios.delete(`${URLAdmin}/api/brigade/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

export const brigadeService = {
    getBrigadesAPI,
    getBrigadeByIdAPI,
    editBrigadeAPI,
    deleteBrigadeAPI
};
