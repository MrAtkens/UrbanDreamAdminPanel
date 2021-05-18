import {makeAutoObservable} from "mobx";
import S3 from 'react-aws-s3';

import { pinsService } from 'API'
export interface ISystem {
    pins: Array<Object>;
    error: string;
    id: string;
}

const config = {
    bucketName: 'historyblogkazakhstan',
    dirName: 'Images',
    region: 'ap-northeast-2',
    accessKeyId: 'AKIATOY4UOHNP4BVECPP',
    secretAccessKey: '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',
}

const ReactS3Client = new S3(config);

class Pins implements ISystem{
    pins = [];
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getPins(){
        const response = await pinsService.getPinsApi()
        console.log(response)
        this.setPins(response.data)
    }

    async acceptUserPin(state, answer){
        const response = await pinsService.acceptUserPin(state, answer)
        console.log(response)

    }

    async deletePin(id){
        const response = await pinsService.deletePinApi(id)
        console.log(response)
        await this.getPins()
    }

    get getPinById(){
        let findPin = {name: "", description: "", urlImg: ""}
        this.pins.map(category => {
            if(category.id === this.id){
                findPin = category
                console.log(category)
            }
        })
        console.log(findPin)
        return findPin;
    }


    get getPinsTable(){
        return this.pins;
    }

    setPins(pins){
        this.pins = pins
    }
}

export default new Pins();
