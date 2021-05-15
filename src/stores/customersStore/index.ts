import {makeAutoObservable, runInAction} from "mobx";
import { usersService } from 'API'
export interface ISystem {
    customers: Array<Object>;
    customerEdit: Object;
    error: string;
    id: string;
}

const defaultCustomerEdit = {firstName:"", lastName: "", email: "", phoneNumber: ""};

class Customers implements ISystem{
    customers = [];
    customerEdit = defaultCustomerEdit
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getCustomers(){
        const response = await usersService.getUsers();
        console.log(response)
        this.setCustomers(response.data)
    }

    get getCustomersTable() {
        return this.customers;
    }

    get getCustomerById(){
        let findCustomer = {firstName: "", lastName: "", email: "", phoneNumber: "", password: ""}
        this.customers.map(customer => {
            if(customer.id === this.id){
                findCustomer = customer
            }
        })
        return findCustomer;
    }


    async editCustomer(firstName, lastName, password, phoneNumber, email){
        const response = await usersService.editUser(this.id, firstName, lastName, password, phoneNumber, email)
        console.log(response)
        await this.getCustomers()
    }

    async deleteCustomer(id){
        const response = await usersService.deleteUser(id)
        console.log(response)
        await this.getCustomers()
    }

    defaultData(){
        runInAction(() => {
            this.customerEdit = defaultCustomerEdit
            this.id = ""
        })
    }

    setCustomers(customers){
        this.customers = customers
    }
}

export default new Customers();