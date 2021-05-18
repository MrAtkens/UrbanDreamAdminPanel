import {makeAutoObservable, runInAction} from "mobx";
import { brigadeService } from 'API'
export interface ISystem {
    brigades: Array<Object>;
    brigadeEdit: Object;
    error: string;
    id: string;
}

const defaultBrigadeEdit = {firstName:"", lastName: "", email: "", phoneNumber: ""};

class Brigades implements ISystem{
    brigades = [];
    brigadeEdit = defaultBrigadeEdit
    error = "";
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

    async addBrigade(firstName, lastName, brigadeName, brigadeAddress, brigadeCount, login, password){
        const response = await brigadeService.addBrigade(firstName, lastName, brigadeName, brigadeAddress, brigadeCount, login, password)
        console.log(response)
    }

    async editBrigade(firstName, lastName, brigadeName, brigadeAddress, brigadeCount, login, password){
        const response = await brigadeService.editBrigadeAPI(this.id, firstName, lastName, brigadeName, brigadeAddress, brigadeCount, login, password)
        console.log(response)
    }

    async deleteBrigade(id){
        const response = await brigadeService.deleteBrigadeAPI(id)
        console.log(response)
    }

    setBrigades(brigades){
        this.brigades = brigades
    }
}

export default new Brigades();
