import {makeAutoObservable, runInAction} from "mobx";
import { vendorsService } from 'API'
export interface ISystem {
    vendors: Array<Object>;
    vendorEdit: Object;
    error: string;
    id: string;
}

const defaultVendorEdit = {firstName:"", lastName: "", email: "", phoneNumber: ""};

class Vendors implements ISystem{
    vendors = [];
    vendorEdit = defaultVendorEdit
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getVendors(){
        const response = await vendorsService.getVendorsAPI();
        console.log(response)
        this.setVendors(response.data)
    }

    get getVendorsTable() {
        return this.vendors;
    }

    get getVendorById(){
        let findVendor = {firstName: "", lastName: "", email: "", phoneNumber: "", password: ""}
        this.vendors.map(vendor => {
            if(vendor.id === this.id){
                findVendor = vendor
            }
        })
        return findVendor;
    }


    async editVendor(firstName, lastName, phoneNumber, password, email){
        const response = await vendorsService.editVendorAPI(this.id, firstName, lastName, phoneNumber, password, email)
        console.log(response)
    }

    async deleteVendor(id){
        const response = await vendorsService.deleteVendorAPI(id)
        console.log(response)
    }

    setVendors(vendors){
        this.vendors = vendors
    }
}

export default new Vendors();