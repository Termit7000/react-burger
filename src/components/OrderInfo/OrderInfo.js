import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Содержит состав заказа с ингредиентами
export default function OrderInfo() {

    const { orders, isOpened } = useSelector(state=>state.wsSocket);
    const { id } = useParams();
    
    if (!isOpened || orders.length===0) return (<p>Поиск заказа...</p>);

    const currentOrder = orders.find(el=>el._id===id);

    if (!currentOrder) return (<p>Заказ не найден</p>);



    return (<p>Описание заказа: `${JSON.stringify(currentOrder)}`</p>);

}