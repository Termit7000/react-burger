import { TOrder } from "./data";

export type TWsActions =  { 
    wsInit: string, 
    wsSendMessage: string, 
    wsClose: string, 
    onOpen: string, 
    onClose: string, 
    onError: string, 
    onMessage: string 
}

export type TWSData = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
}