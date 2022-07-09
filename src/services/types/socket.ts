import { TOrder } from "./data";


export type TWSData = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
};