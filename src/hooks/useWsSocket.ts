import { useEffect } from "react";
import { useDispatch } from "../services/hooks";

import { 
  closeConnection, 
  closeConnection_Auth, 
  wsInit, 
  wsInit_Auth } from "../services/actions";

export default function useWsSocket(isAuthSocket:boolean=false):void {

    const dispatch = useDispatch() ;

    useEffect(()=>{
      
      dispatch((isAuthSocket) ? wsInit_Auth() : wsInit());
      
      return () =>{
        dispatch( (isAuthSocket) ? closeConnection_Auth() : closeConnection())
      };
    
    },[dispatch, isAuthSocket]);   
}