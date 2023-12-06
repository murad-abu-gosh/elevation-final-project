import {APIRequestContext} from "@playwright/test";
import { HttpRequest } from "./API_methods"
import { Method } from "./API_methods"
import { request } from "https";
import { AddToCartRoot } from "../Logic/HttpRequestBody/AddToCart";
export class ApiClient {


    loginApi = async (request: APIRequestContext ,email: string, password: string) => {
        let Http =  new HttpRequest();
        let body = {"username":email,"password":password}
        let headers={"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*"} 
         return await Http.httpRequest( request, Method.POST ,"https://www.terminalx.com/pg/MutationUserLogin?v=I9dIkXxqUgEmvaClIy6g3%2FMlpMA%3D" , headers ,body)
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

}


// export enum Method {
//     POST = "POST", GET = "GET"
// }