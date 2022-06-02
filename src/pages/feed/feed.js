import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem/OrderItem";
import { wsInit } from "../../redux/actions";

import styles from './feed.module.css';

export function Feed() {

    const { isOpened, isError, errorText, orders } = useSelector(state => state.wsSocket);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsInit());
    }, [dispatch]);

    if (isError) return <p className="text text_type_main-medium">{`Ошибка соединения: ${errorText}`}</p>
    if (!isOpened) return <p className="text text_type_main-medium">Установка соединения...</p>

    return (

        <>
            <ul className={styles.orders}>

            {orders && orders.map(item => {
                return (
                <li className={styles.item} key={item._id}>
                    <OrderItem {...item}/>
                </li>);
            }) }

            </ul>
            
        </>
    );

    return (<p>Соединение установлено</p>)
}