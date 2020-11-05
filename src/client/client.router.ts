import express, { Request, Response } from "express";
import { ClientRequest,ClientResponse } from "./client.interface";

/**
 * Routers
 */

export const clientRouter = express.Router();


// POST V1/

clientRouter.post("/v1/parse", (req: Request, res: Response) => {
  try {
    const client: ClientRequest = req.body; 
    const clientData = client.data; 
    let firstName:string = '';
    let lastName:string = '';
    let clientId:string = '';
    let value:boolean = false;
    let lastIndex:number = 0;
    for(let i =0;i<clientData.length;i++){
      if(clientData[i] === '0'){
        value = true;
      }
      if(value && clientData[i] !== '0'){
        if(!firstName){
          firstName = clientData.slice(0,i);
          value =false;
          lastIndex = i;
        }
        else if(!lastName){
          lastName = clientData.slice(lastIndex,i);
          lastIndex = i;
          break;
        }
      }
    }
    clientId = clientData.slice(lastIndex,clientData.length);
    const clientResp: ClientResponse = {clientId,firstName,lastName}
    res.status(200).send({data:clientResp,statusCode:200});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// POST V2/

clientRouter.post("/v2/parse", (req: Request, res: Response) => {
  try {
    const client: ClientRequest = req.body;
    const clientData = client.data;

    let firstName:string = clientData.slice(0,clientData.indexOf('0000')+4);
    let lastName:string = clientData.slice(clientData.indexOf('0000')+4,clientData.lastIndexOf('000')+3);
    let clientId:string = clientData.slice(clientData.lastIndexOf('000')+3,clientData.length);;  
    res.status(200).send({data:{firstName,lastName,clientId},statusCode: 200});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

