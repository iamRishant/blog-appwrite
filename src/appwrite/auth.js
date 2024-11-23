// we will be needing our environmental vairables:
import config from "../config/config";
// now we need to setup authentication environment
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client=new Client();
    account;
    // we are not defining above account kyuki hm chahte hai jab object create ho aur constructor call ho then we will define it

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.projectId)

        this.account =new Account(this.client);
    }

    // ab dekho ye jo class hai isme methods bna denge signup, login, logout and user login hai ya nhi wo 
    // best part is ki fxn ke ander hm kissy bhi backend service use kr skte hai like firebase etc 
    // aur poore program me hm sirf ye fxn use krnenge to under the hood kya change krr rhe hai usse program ko frk nhi pdega..
    // just make changes here in this file and all set 
    // currently we will be using appwrite as backend as a service

    // signup method
    async createAccount({email,password,name}){
        try {
            const user=await this.account.create(ID.unique(),email,password);
            if(user){
                // agar user ban gya then just ek kaam krte hai login krwa dete hai...we can just send notification ki signup hogya 
                // or we can log in krwa skte hai

                return this.login({email,password});// passing as object as we are also accepting as a object (destructured object)
            }
            else return user;
        } catch (error) {
            console.log("appwrite service :signup error ",error);
            throw error;
        }
    }

    // login method
    async login({email,password}){// we will simply pass object and here we will destructure it
        try {
            const session = await this.account.createEmailPasswordSession(email,password);
            // we can also use ifelse here but agar koi problem hoga frontend par handle krr lenge
            return session;
            
        } catch (error) {
            console.log("appwrite service :login error ",error);
            throw error
        }

    }

    // logout method
    async logout(){
        try {
            const result = await this.account.deleteSessions();//note here we are deleteing all the sessions not session with id
            return result;
        } catch (error) {
            console.log("appwrite service :logout error ",error);
            
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("appwrite error: getCurrentUser", error);
            // throw error;
            return null;
        }

        return null;
    }
}




// here we are creating a object of class and exporting it kyuki agar hm directly class ko export krenge to phir
// jha export krenge wha obj bnao and then method access kro uss better object hi bna kar export krdo
const authService=new AuthService();
export default authService;
