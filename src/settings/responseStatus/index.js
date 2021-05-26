import {
    toastServerError,
    toastUnauthorizedError,
    toastAuthError,
    toastUserNotFound,
    toastLoginSuccess, toastRoleError, toastModeratorNotFound, toastBrigadeNotFound
} from '../toastifyTools'

export const authorizationStatusValidation = (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 403)
        toastRoleError()
    else if (status === 401)
        toastAuthError()
    else if (status === 200)
        toastLoginSuccess()
}

export const userGetDataStatus = (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
    }
}

export const moderatorStatusValidation = (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 404)
        toastModeratorNotFound()
    else if (status === 403)
        toastRoleError()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
    }
}

export const brigadeStatusValidation = (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 404)
        toastBrigadeNotFound()
    else if (status === 403)
        toastRoleError()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
    }
}

export const userStatusValidation = (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 403)
        toastRoleError()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
    }
}

