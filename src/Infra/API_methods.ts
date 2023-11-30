import { APIRequestContext } from "@playwright/test";
export class HttpRequest{

private headers:{[key: string]: string;} | undefined;
private body:string;
private request:APIRequestContext;


public async httpRequest(request:APIRequestContext,httpMethod:string,URL:string,headers:{
    [key: string]: string;} | undefined,bodyStorage:any):Promise<any>{

let response:any;
switch(httpMethod){
case "POST":
    response=await request.post(URL,{headers:headers,data:bodyStorage})
    if(response.ok()){
        this.body=response.json()
        return response
    }
    else{console.log("Error! POST false response.\n")}
    
     
case "GET": 
    response=await request.get(URL,{headers:headers,data:bodyStorage})
    if(response.ok()){
        this.body=response.json()
        return response
    }
    else{console.log("Error! GET false response.\n")}

}

}
public GetBody():string{
    return this.body;
}


}