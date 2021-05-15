import { makeAutoObservable } from "mobx";
import { authenticationService } from "API";
import { authorizationStatusValidation, userGetDataStatus } from 'settings/responseStatus'

const isValidToken = () => {
    const token = localStorage.getItem('jwt_token');
    // JWT decode & check token validity & expiration.
    return !!token;

};

export interface ISystem {
    isAuthenticated: boolean;
    isSubmitting: boolean;
    id: string;
    login: string;
    role: number;
}

class System implements ISystem{
    isAuthenticated = isValidToken()
    isSubmitting = false
    id = ""
    login = "..."
    role = 100;

    constructor() {
        makeAutoObservable(this)
    }

    async authenticate(login, password){
        const response = await authenticationService.userSingInApi(login, password);
        if(response.status === 200){
            localStorage.setItem('jwt_token', response.data);
            this.isSubmitting = false;
            await this.getUserData().then(() => {
                window.location.href = '/'
            })
        }
        else{
            authorizationStatusValidation(response.status);
            this.isSubmitting = false
        }
    }

    async getUserData(){
        const response = await authenticationService.userGetData();
        console.log(response)
        if(response.status === 200) {
            this.setId(response.data.id)
            this.setLogin(response.data.login)
            this.setRole(response.data.role)
            this.setIsAuth(true);
        }
        else{
            userGetDataStatus(response.status)
        }
    }

    async singOut(){
        localStorage.removeItem('jwt_token');
        this.setIsAuth(false);
        this.setRole(100);
    }

    setId(id){
        this.id = id
    }

    setIsAuth(auth){
        this.isAuthenticated = auth
    }

    setLogin(login){
        this.login = login
    }

    setRole(role){
        this.role = role
    }

    get getAuthenticated(){
        return this.isAuthenticated
    }

    get showLogin(){
        return this.login
    }

    get isSub(){
        return this.isSubmitting
    }
}

export default new System();
