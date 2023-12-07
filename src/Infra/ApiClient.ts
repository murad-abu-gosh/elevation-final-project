import {APIRequestContext} from "@playwright/test";
import { HttpRequest } from "./API_methods"
import { Method } from "./API_methods"
import { LoginRoot } from "../Logic/HttpRequestBody/Login";
import { AddToCartRoot } from "../Logic/HttpRequestBody/AddToCart";
import { RemoveFromWishListRoot } from "../Logic/HttpRequestBody/RemoveFromWList";

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
    AddToCartApi = async (request:APIRequestContext) => {
        const Http = new HttpRequest();
        const headers = {"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*","Cookie":"syte_uuid=871f6f20-8c84-11ee-970f-53da2b897d3f; glassix-visitor-id-v2-b6d2bc1d-dcdc-4766-b620-28559157075a=817bed7e-30d7-4867-af31-996349afcfc9; syte_ab_tests={}; current-universe-id-1=67; language=he; fe-version=649508911c40eb2d06d7eb9ee26a8d08c9efa724; RSESSIONID=99694196-4f65-4606-bd90-b18724b1b6bb; counter=0; PHPSESSID=sct1ei4rmq3jn24jb4j75u33hm; idus-cache-loggedin=1; stimgs={%22sessionId%22:86037824%2C%22didReportCameraImpression%22:true%2C%22newUser%22:false}; private_content_version=caf6177e906a1d6bd97cedd1a91b0b79"} 
        const URL = "https://www.terminalx.com/pg/MutationAddAnyProductsToAnyCart?v=t4MeNg4Nhm8cTtfc8ZbCpP00Dzo%3D"
        const body:AddToCartRoot = JSON.parse('{"cart_items": [{"data": {"quantity": 1,"any_sku": "W12533002515"}}],"skip_collect": 1}')
        return await Http.httpRequest(request,Method.POST,URL,headers,body)
    }
    RemoveFromWishList = async (request:APIRequestContext) => {
        const Http = new HttpRequest();
        const headers = {"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*","Cookie":"syte_uuid=871f6f20-8c84-11ee-970f-53da2b897d3f; glassix-visitor-id-v2-b6d2bc1d-dcdc-4766-b620-28559157075a=817bed7e-30d7-4867-af31-996349afcfc9; syte_ab_tests={}; language=he; counter=0; PHPSESSID=sct1ei4rmq3jn24jb4j75u33hm; idus-cache-loggedin=1; fe-version=3dcd799a0af489cc1d4c878c869352d5de847c89; RSESSIONID=a6f62fe5-8731-4ff8-9c5f-f05a89a8e51e; current-universe-id-1=67; private_content_version=993d0dbaf2306529a9ab814bf74837a6"} 
        const URL = "https://www.terminalx.com/pg/MutationRemoveProductsFromAnyWishlistById"
        const body:RemoveFromWishListRoot = JSON.parse('{"id": 1579322}')
        return await Http.httpRequest(request,Method.POST,URL,headers,body)  
    }






}


// export enum Method {
//     POST = "POST", GET = "GET"
// }