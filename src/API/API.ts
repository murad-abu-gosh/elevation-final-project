enum httpMethod{
POST,GET
}
export class HttpRequest{
//     const temp :Root2 = JSON.parse('[{"src":"client","location":"https://www.terminalx.com/","path":"/","originalReqId":"0c882f61-ded7-4d6a-97f1-4c7761f0ac0d","component":"PanelStore","level":40,"msg":"addPanel - panel id footer-news-modal already exists","time":"2023-11-29T17:33:20.181Z","useragent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"}]')
 
//     const issue= await request.post("https://www.terminalx.com/logs",{
//       headers:{"Content-Type":"application/json; charset=utf-8",
//       "Accept":"application/json, text/plain, */*"
//     },data:temp
  
//   })
//   if( issue.ok()){
//     console.log(await issue.json())
//   }
private httpMethod:;
private headers;
private body;


constructor(httpMethod,headers,body){
this.httpMethod=httpMethod;
this.headers=headers;
this.body=body;

}



}