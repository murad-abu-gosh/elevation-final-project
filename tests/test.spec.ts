import test from "@playwright/test";
import { ListingSearchRoot } from "../src/Logic/HttpRequestBody/SearchingList";
import { Method , HttpRequest } from "../src/Infra/API_methods";
import { ApiClient } from "../src/Infra/ApiClient";
const data="nike"
test(`test search navigation for: ${data}`, async ({request}) => {
    // let httpMethod:HttpRequest=new HttpRequest()
    // let headers = {"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*"}
    // let body:ListingSearchRoot=JSON.parse(`{"listingSearchQuery": {"categoryId": "2","filter": {"category_id": {"eq": "2"}},"pageSize": 24,"currentPage": 1,"search": "${data}","sort": {"default": true},"includeAggregations": true,"includeCategory": true}}`)
    
    
    // const response=await httpMethod.httpRequest(request,Method.POST,"https://www.terminalx.com/a/listingSearch",headers,body)
   
   const api:ApiClient=new ApiClient()
   const x=await api.removeFromWishList(request)
    console.log( x)

})