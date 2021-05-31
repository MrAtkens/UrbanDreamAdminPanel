import { makeAutoObservable } from "mobx";

import { brigadeService } from 'API'
import { brigadeStatusValidation } from 'settings/responseStatus'
import { toastAddBrigade, toastEditBrigade, toastDeleteBrigade } from 'settings/toastifyTools'

export interface ISystem {
    brigades: Array<Object>;
    brigadeEdit: Object;
    id: string;
}

const defaultBrigadeEdit = {firstName:"", lastName: "", email: "", phoneNumber: ""};

class Brigades implements ISystem{
    brigades = [];
    brigadeEdit = defaultBrigadeEdit
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getBrigades(){
        const response = await brigadeService.getBrigadesAPI();
        console.log(response)
        this.setBrigades(response.data)
    }

    get getBrigadesTable() {
        return this.brigades;
    }

    get getBrigadeById(){
        let findBrigade = {firstName: "", lastName: "", brigadeName: "", brigadeWorkAddress: "", brigadeCount: 0, login: "", password: ""}
        this.brigades.map(brigade => {
            if(brigade.id === this.id){
                findBrigade = brigade
            }
        })
        return findBrigade;
    }

    async addBrigade(firstName, lastName, brigadeName, brigadeWorkAddress, brigadeCount, login, password){
        const response = await brigadeService.addBrigade(firstName, lastName, brigadeName, brigadeWorkAddress, brigadeCount, login, password)
        brigadeStatusValidation(response.status)
        if(response.status === 200) {
            await this.getBrigades().then(() => {
                toastAddBrigade(brigadeName)
            })
        }
    }

    async editBrigade(firstName, lastName, brigadeName, brigadeWorkAddress, brigadeCount, login, password){
        const response = await brigadeService.editBrigadeAPI(this.id, firstName, lastName, brigadeName, brigadeWorkAddress, brigadeCount, login, password)
        brigadeStatusValidation(response.status)
        if(response.status === 200) {
            await this.getBrigades().then(() => {
                toastEditBrigade(brigadeName)
            })
        }
    }

    async deleteBrigade(id, brigadeName){
        const response = await brigadeService.deleteBrigadeAPI(id)
        brigadeStatusValidation(response.status)
        if(response.status === 200) {
            await this.getBrigades().then(() => {
                toastDeleteBrigade(brigadeName)
            })
        }
    }

    setBrigades(brigades){
        this.brigades = brigades
    }
}

export default new Brigades();
