import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useWsSocket from "../../hooks/useWsSocket";

import OrderItem from "../OrderItem/OrderItem";

import styles from './index.module.css';

export default function OrdersHistory() {

    const location = useLocation();

    const { 
        isOpened, 
        isError, 
        errorText, 
        orders } = useSelector(state=>state.wsOrdersHistory);

    useWsSocket(true);    
    
    if (!isOpened && orders.length===0) return <p>Поиск заказов пользователя...</p>;
    if (isError) return <p>Ошибка: {errorText}</p>

    orders.sort((a,b)=>b.number-a.number);

    return (

        <ul className={`${styles.orders} custom-scroll`}>
            {orders.map(item => {
                return (
                    <li className="mr-2" key={item._id}> 
                        <Link className={styles.link} to={`${location.pathname}/${item._id}`} state={ {background: location }} >
                            <OrderItem {...{...item, ingredients: item.ingredients.filter(el=>el!==null)}} />
                        </Link>
                    </li>);
            })}
        </ul>
    );
}