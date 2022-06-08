import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { closeConnection_Auth, wsInit_Auth } from "../../redux/actions";
import OrderItem from "../OrderItem/OrderItem";

import styles from './index.module.css';

export default function OrdersHistory() {

    const location = useLocation();

    const { 
        isOpened, 
        isError, 
        errorText, 
        orders } = useSelector(state=>state.wsOrdersHistory);

    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(wsInit_Auth());               
        return ()=>dispatch(closeConnection_Auth());

    },[dispatch]);

    if (orders.length===0) return <p>Поиск заказов пользователя...</p>;
    if (isError) return <p>Ошибка: {errorText}</p>

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