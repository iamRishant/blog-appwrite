import config from "../config/config";
import { Client, ID,Databases,Storage,Query } from "appwrite";


export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.projectId);

        this.databases=new Databases(this.client);
        this.bucket= new Storage(this.client);
    }


    async createPost({title,slug,content,featuredImage,status,userId}){
        try {

            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,// here we can also use id.unique() //this is document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            
        } catch (error) {
            console.log("appwrite error:: createpost error:: ",error);
            
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite error:: updatePost:: ",error);
            throw error
            
        }
    }

    async deletePost(slug){
        try {
            const res= await this.databases.deleteDocument(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                slug // documentId
            );

            if(res) return true;
            else return false;
        } catch (error) {
            console.log("appwrite error:: deletePost:: ",error);
            
        }
        return false;
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                slug, // documentId
            );
        } catch (error) {
            console.log("appwrite error:: getPost:: ",error);
            
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                [
                    // here we are writing queries mtlb filter 
                    //and also we know that query krne ke liye index hona important 
                    //and in our case hmne index bnaya hai status ko in app write
                    // we can also add more queries

                    Query.equal('status','active')

                ]
            )
        } catch (error) {
            console.log("appwrite error:: getPosts:: ",error);
            
        }
    }

    // file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.bucketId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("appwrite error:: uploadFile:: ",error);
            return false;
            
        }
        
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.bucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("appwrite error:: deleteFile:: ",error);
            return false;
            
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.bucketId,
            fileId,
        )
    }
}


const service=new Service();
export default service;