import {makeAutoObservable, runInAction} from "mobx";
import { usersService } from 'API'
export interface ISystem {
    users: Array<Object>;
    userEdit: Object;
    error: string;
    id: string;
}

const defaultUserEdit = {firstName:"", lastName: "", email: "", phoneNumber: ""};

class Users implements ISystem{
    users = [];
    userEdit = defaultUserEdit
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getUsers(){
        const response = await usersService.getUsers();
        console.log(response)
        this.setUsers(response.data)
    }

    get getUsersTable() {
        return this.users;
    }

    get getUserById(){
        let findUser = {firstName: "", lastName: "", email: "", phoneNumber: "", password: ""}
        this.users.map(user => {
            if(user.id === this.id){
                findUser = user
            }
        })
        return findUser;
    }


    async editUser(firstName, lastName, password, phoneNumber, email){
        const response = await usersService.editUser(this.id, firstName, lastName, password, phoneNumber, email)
        console.log(response)
        await this.getUsers()
    }

    async deleteUser(id){
        const response = await usersService.deleteUser(id)
        console.log(response)
        await this.getUsers()
    }

    defaultData(){
        runInAction(() => {
            this.userEdit = defaultUserEdit
            this.id = ""
        })
    }

    setUsers(users){
        this.users = users
    }
}

export default new Users();
