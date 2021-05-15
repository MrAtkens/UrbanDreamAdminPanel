import {makeAutoObservable} from "mobx";
import S3 from 'react-aws-s3';

import { categoriesService } from 'API'
export interface ISystem {
    categories: Array<Object>;
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

class Categories implements ISystem{
    categories = [];
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getCategories(){
        const response = await categoriesService.getCategoriesApi()
        console.log(response)
        this.setCategories(response.data)
    }

    get getCategoryById(){
        let findCategory = {name: "", description: "", urlImg: ""}
        this.categories.map(category => {
            if(category.id === this.id){
                findCategory = category
                console.log(category)
            }
        })
        console.log(findCategory)
        return findCategory;
    }


    get getCategoriesTable(){
        return this.categories;
    }

    get getCategoriesForForm(){
        let option = []
        this.categories.forEach(element => {
            console.log(element)
            option.push({name: element.name, value: element.value, id: element.id})
        })
        console.log(option)
        return option;
    }

    async addCategory(name, description, image){
        ReactS3Client
            .uploadFile(image)
            .then(async data => {
                console.log(data)
                const response = await categoriesService.addCategoryApi(name, description, data.location)
                await this.getCategories()
            })
            .catch(err => console.error(err))
    }

    async editCategory(name, description, image){
        if(image === this.getCategoryById.urlImg){
            const response = await categoriesService.editCategoryApi(this.id, name, description, image)
            console.log(response)
            await this.getCategories();
        }
        else {
            ReactS3Client
                .uploadFile(image)
                .then(async data => {
                    console.log(data)
                    const response = await categoriesService.editCategoryApi(this.id, name, description, data.location)
                    console.log(response)
                    await this.getCategories()
                })
                .catch(err => console.error(err))
        }
    }

    async deleteCategory(id){
        const response = await categoriesService.deleteCategoryApi(id)
        console.log(response)
        await this.getCategories()
    }

    setCategories(categories){
        this.categories = categories
    }
}

export default new Categories();