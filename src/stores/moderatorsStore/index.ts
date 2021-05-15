import { makeAutoObservable } from "mobx"
import { moderatorsService } from 'API'
export interface ISystem {
    moderators: Array<Object>;
    error: string;
    id: string;
}


class Moderators implements ISystem{
    moderators = [];
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getModerators(){
        const response = await moderatorsService.getModerators()
        console.log(response.data)
        this.setModerators(response.data)
    }

    get getModeratorById(){
        let findModerator = {login: "", password: ""}
        this.moderators.map(moderator => {
            if(moderator.id === this.id){
                findModerator = moderator
            }
        })
        return findModerator;
    }


    get getModeratorsTable(){
        return this.moderators;
    }

    async addModerator(login, password){
        const response = await moderatorsService.addModerator(login, password)
        console.log(response)
        await this.getModerators()
    }

    async editModerator(login, password){
        const response = await moderatorsService.editModerator(this.id, login, password)
        console.log(response)
        await this.getModerators()
    }

    async deleteModerator(id){
        const response = await moderatorsService.deleteModerator(id)
        console.log(response)
        await this.getModerators()
    }

    setModerators(moderators){
        this.moderators = moderators
    }
}



export default new Moderators();