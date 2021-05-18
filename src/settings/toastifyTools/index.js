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
export const toastAcceptUserPinSuccess = (pinName) => {
    toast.success(`Вы успешно ответили пользователю, по пину ${pinName}`, defaultSetings)
}

export const toastModerateUserPinSuccess = (pinName) => {
    toast.success(`Вы успешно ответили бригаде, по пину ${pinName}`, defaultSetings)
}
