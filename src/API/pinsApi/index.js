import axios from 'axios'
import { URLAdmin } from '../settings'

axios.defaults.withCredentials = true

const getModeratingPinsApi = async () => {
    console.log(localStorage.getItem('jwt_token'));
    return await axios.get(`${URLAdmin}/api/pin/moderating`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
                console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const getAcceptedPinsApi = async () => {
    console.log(localStorage.getItem('jwt_token'));
    return await axios.get(`${URLAdmin}/api/pin/accepted`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const getSolvingPinsApi = async () => {
    console.log(localStorage.getItem('jwt_token'));
    return await axios.get(`${URLAdmin}/api/pin/solving`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const getSolvedPinsApi = async () => {
    console.log(localStorage.getItem('jwt_token'));
    return await axios.get(`${URLAdmin}/api/pin/solved`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const getPinByIdApi = async (id) => {
    return await axios.get(`${URLAdmin}/api/pin/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        return response
    }).catch(error => {
        return error.response
    })
}

const editPinApi = async (id, name, description, image) => {
    return await axios.put(`${URLAdmin}/api/pin/${id}`, {
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
    return await axios.delete(`${URLAdmin}/api/pin/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const acceptUserPin = async (id, answer, state) => {
    console.log(id)
    console.log(answer)
    console.log(state)
    return await axios.patch(`${URLAdmin}/accept/${id}`, {
            answer: answer,
            state: state
        }, {headers:
                { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const moderateBrigadePin = async (id, answer, state) => {
    return await axios.patch(`${URLAdmin}/moderate/${id}`, {
            answer: answer,
            state: state
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
    getModeratingPinsApi,
    getAcceptedPinsApi,
    getSolvingPinsApi,
    getSolvedPinsApi,
    getPinByIdApi,
    editPinApi,
    deletePinApi,
    acceptUserPin,
    moderateBrigadePin
};
