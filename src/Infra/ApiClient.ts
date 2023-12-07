import {APIRequestContext} from "@playwright/test";
import { HttpRequest } from "./API_methods"
import { Method } from "./API_methods"
import { LoginRoot } from "../Logic/HttpRequestBody/Login";
import { parse } from "path";
export class ApiClient {


    loginApi = async (request: APIRequestContext ,email: string, password: string) => {
        let Http =  new HttpRequest();
        const jsonString = `{"username": "${email}", "password": "${password}"}`;
        let loginObj : LoginRoot = JSON.parse(jsonString) ;
      
        //let body = {"username":email,"password":password}
        let headers={"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*"} 
         return await Http.httpRequest( request, Method.POST ,"https://www.terminalx.com/pg/MutationUserLogin?v=I9dIkXxqUgEmvaClIy6g3%2FMlpMA%3D" , headers ,loginObj)
    }
    logOutApi = async (request: APIRequestContext ) => {
        let Http =  new HttpRequest();
      
        let headers={"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*"} 
         return await Http.httpRequest( request, Method.POST ,"https://www.terminalx.com/pg/MutationUserLogout?v=4sGyilpYObb3cqN0XV3TyptzJ0U%3D" , headers ,{})
    }

}


// export enum Method {
//     POST = "POST", GET = "GET"
// }