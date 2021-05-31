import { makeAutoObservable } from "mobx"

import { moderatorsService } from 'API'
import { moderatorStatusValidation } from 'settings/responseStatus'
import { toastAddModerator, toastEditModerator, toastDeleteModerator } from 'settings/toastifyTools'
import {log} from "util";

export interface ISystem {
    moderators: Array<Object>;
    id: string;
}


class Moderators implements ISystem{
    moderators = [];
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
        moderatorStatusValidation(response.status)
        if(response.status === 200) {
            await this.getModerators().then(() => {
                toastAddModerator(login)
            })
        }
    }


    async editModerator(login, password){
        const response = await moderatorsService.editModerator(this.id, login, password)
        if(response.status === 200) {
            await this.getModerators().then(() => {
                toastEditModerator(login)
            })
        }
    }

    async deleteModerator(id, login){
        const response = await moderatorsService.deleteModerator(id)
        console.log(response)
        if(response.status === 200) {
            await this.getModerators().then(() => {
                toastDeleteModerator(login)
            })
        }
    }

    setModerators(moderators){
        this.moderators = moderators
    }
}



export default new Moderators();
