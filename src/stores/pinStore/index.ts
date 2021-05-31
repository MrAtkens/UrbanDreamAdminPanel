import {makeAutoObservable} from "mobx";

import { pinsService } from 'API'
export interface ISystem {
    moderatingPins: Array<Object>;
    acceptedPins: Array<Object>;
    solvingPins: Array<Object>;
    solvedPins: Array<Object>;
    pinId: Object;
}

class Pins implements ISystem{
    moderatingPins = [];
    acceptedPins = [];
    solvingPins = [];
    solvedPins = [];
    pinId = {
        id: "",
        title: "",
        description: "",
        userId: "",
        acceptedModeratorId: "",
        acceptedModeratorAnswer: "",
        creationDate: "",
        latitude: 0,
        longitude: 0,
        images: [],
        tags: []
    };

    constructor() {
        makeAutoObservable(this)
    }

    async getAllPins(){
        await this.getModeratingPins();
        await this.getAcceptedPins();
        await this.getSolvingPins();
        await this.getSolvedPins();
    }

    async getModeratingPins(){
        const response = await pinsService.getModeratingPinsApi();
        console.log(response)
        this.setModeratingPins(response.data);
    }

    async getAcceptedPins(){
        const response = await pinsService.getAcceptedPinsApi();
        console.log(response)
        this.setAcceptedPins(response.data)
    }

    async getSolvingPins(){
        const response = await pinsService.getSolvingPinsApi();
        console.log(response)
        this.setSolvingPins(response.data);
    }

    async getSolvedPins(){
        const response = await pinsService.getSolvedPinsApi();
        console.log(response)
        this.setSolvedPins(response.data)
    }

    async getById(id){
        const response = await pinsService.getPinByIdApi(id);
        this.setPin(response.data)
        console.log(this.pinId)
    }

    async acceptUserPin(state, answer){
        const response = await pinsService.acceptUserPin(this.pinId.id, answer, state)
        console.log(response)
        if(response.status === 200){
            await this.getAllPins();
        }
    }

    async deletePin(id){
        const response = await pinsService.deletePinApi(id)
        console.log(response)
        await this.getAllPins()
    }

    get getModeratingPinsTable(){
        return this.moderatingPins;
    }

    setModeratingPins(pins){
        this.moderatingPins = pins
    }

    setAcceptedPins(pins){
        this.acceptedPins = pins
    }

    setSolvingPins(pins){
        this.solvingPins = pins
    }

    setSolvedPins(pins){
        this.solvedPins = pins
    }

    setPin(pin){
        this.pinId = pin
    }
}

export default new Pins();
