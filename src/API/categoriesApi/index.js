import axios from 'axios'
import { URLAdmin } from '../settings'

axios.defaults.withCredentials = true

const getCategoriesApi = async () => {
    console.log(localStorage.getItem('jwt_token'));
    return await axios.get(`${URLAdmin}/api/category`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
                console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

const getCategoryByIdApi = async (id) => {
    return await axios.get(`${URLAdmin}/api/category/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        return response
    }).catch(error => {
        return error.response
    })
}

const addCategoryApi = async (name, description, image) => {
    return await axios.post(`${URLAdmin}/api/category`, {
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

const editCategoryApi = async (id, name, description, image) => {
    return await axios.put(`${URLAdmin}/api/category/${id}`, {
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

const deleteCategoryApi = async (id) => {
    return await axios.delete(`${URLAdmin}/api/category/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}
    ).then(response => {
        console.log(response)
        return response
    }).catch(error => {
        return error.response
    })
}

export const categoriesService = {
    getCategoriesApi,
    getCategoryByIdApi,
    addCategoryApi,
    editCategoryApi,
    deleteCategoryApi
};
