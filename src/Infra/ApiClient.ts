import { HttpRequest } from "./API_methods"

export class ApiClient {


    loginApi = async (email: string, password: string) => {
        let request =  new HttpRequest();
        let body = {"username":email,"password":password}
        let headers={"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*"} 
         return await request.httpRequest( , Method.POST ,"https://www.terminalx.com/pg/MutationUserLogin?v=I9dIkXxqUgEmvaClIy6g3%2FMlpMA%3D" , headers ,body)
    }

}


export enum Method {
    POST = "POST", GET = "GET"
}