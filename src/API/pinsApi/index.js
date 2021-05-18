import axios from 'axios'
import { URLAdmin } from '../settings'

axios.defaults.withCredentials = true

const getPinsApi = async () => {
    console.log(localStorage.getItem('jwt_token'));
    return await axios.get(`${URLAdmin}/api/pin/problem`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
                console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const getPinByIdApi = async (id) => {
    return await axios.get(`${URLAdmin}/api/pin/problem/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        return response
    }).catch(error => {
        return error.response
    })
}

const editPinApi = async (id, name, description, image) => {
    return await axios.put(`${URLAdmin}/api/pin/problem/${id}`, {
            name: name,
            description: description,
            urlImg: image
        }, {headers:
                { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const deletePinApi = async (id) => {
    return await axios.delete(`${URLAdmin}/api/pin/problem/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const acceptUserPin = async (id, answer) => {
    return await axios.patch(`${URLAdmin}/accept/${id}`, {
            answer: answer,
            state: 1
        }, {headers:
                { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const moderateBrigadePin = async (id, answer) => {
    return await axios.patch(`${URLAdmin}/moderate/${id}`, {
            answer: answer,
            state: 1
        }, {headers:
                { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

export const pinsService = {
    getPinsApi,
    getPinByIdApi,
    editPinApi,
    deletePinApi,
    acceptUserPin,
    moderateBrigadePin
};
