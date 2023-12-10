import {APIRequestContext, APIResponse} from "@playwright/test";
import { Serializable } from "worker_threads";

export class HttpRequest {

    private headers: { [key: string]: string; } | undefined;
    private body: string;
    private request: APIRequestContext;


    public async httpRequest<T>(request: APIRequestContext, httpMethod: Method, URL: string, headers: {
        [key: string]: string;
    } | undefined, bodyStorage: any):Promise<T|undefined>{

          let response:APIResponse
        switch (httpMethod) {
            case Method.POST:
                  response = await request.post(URL, {headers: headers, data: bodyStorage})
                if (response.ok()) {
                    // this.body = await response.json()
                    // console.log(this.body)
                    // console.log("=========================================================")
                    return  await response.json()
                } else {
                    console.log("Error! POST false response.\n")
                }


            case Method.GET:
                 response = await request.get(URL, {headers: headers, data: bodyStorage})
                if (response.ok()) {
                    // this.body = await response.json()
                    return await response.json()
                } else {
                    console.log("Error! GET false response.\n")
                }

        }

    }

    public GetBody(): string {
        return this.body;
    }


}

export enum Method {
    POST = "POST", GET = "GET"
}