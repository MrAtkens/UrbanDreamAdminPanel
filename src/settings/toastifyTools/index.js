import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultSetings = {
    position:"bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}

//Errors Toast
//Status 500 Iternal Server Error
export const toastServerError = () => {
    toast.error("На данный момент на стороне сервера ошибка, пожалуйста повторите попытку позже", defaultSetings);
}

//Status 409 Conflict(Login occuped)
export const toastLoginOccuped = () => {
    toast.error("Данный логин уже зарегистрирован", defaultSetings)
}
//Status 404
export const toastUserNotFound = () => {
    toast.error("Данный пользователь не найден", defaultSetings)
}

export const toastModeratorNotFound = () => {
    toast.error("Данный модератор не найден", defaultSetings)
}

export const toastBrigadeNotFound = () => {
    toast.error("Данная бригада не найден", defaultSetings)
}

//Status 403
export const toastRoleError = () => {
    toast.error("У вас нет прав на данные действия", defaultSetings)
}
//Status 401
export const toastAuthError = () => {
    toast.error("Введённые вами данные не прошли проверку", defaultSetings)
}

export const toastUnauthorizedError = () => {
    toast.error("Ваш токен валидаций истёк, вам надо перезайти", defaultSetings)
}

export const toastLogOutSuccess = () => {
    toast.info("Вы успешно вышли из системы", defaultSetings)
}

//Status 200
export const toastLoginSuccess = () => {
    toast.success("Вы успешно вошли в систему", defaultSetings)
}


//Status 200 MODERATORS
export const toastAddModerator = (login) => {
    toast.success(`Вы добавили модератора: ${login}`, defaultSetings)
}

export const toastEditModerator = (login) => {
    toast.info(`Вы изменили модератора: ${login}`, defaultSetings)
}

export const toastDeleteModerator = (login) => {
    toast.info(`Вы удалили модератора: ${login}`, defaultSetings)
}

//Status 200 BRIGADES
export const toastAddBrigade = (brigadeName) => {
    toast.success(`Вы добавили бригаду: ${brigadeName}`, defaultSetings)
}

export const toastEditBrigade = (brigadeName) => {
    toast.info(`Вы изменили данные бригады: ${brigadeName}`, defaultSetings)
}

export const toastDeleteBrigade = (brigadeName) => {
    toast.info(`Вы удалили бригаду: ${brigadeName}`, defaultSetings)
}

//Status 200 USERS
export const toastEditUser = (brigadeName) => {
    toast.info(`Вы изменили данные пользователя: ${brigadeName}`, defaultSetings)
}

export const toastDeleteUser= (brigadeName) => {
    toast.info(`Вы удалили пользователя: ${brigadeName}`, defaultSetings)
}

//Status 200 PINS
export const toastAcceptUserPinSuccess = (pinName) => {
    toast.success(`Вы успешно ответили пользователю, по пину ${pinName}`, defaultSetings)
}

export const toastModerateUserPinSuccess = (pinName) => {
    toast.success(`Вы успешно ответили бригаде, по пину ${pinName}`, defaultSetings)
}
