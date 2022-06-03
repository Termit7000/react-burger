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
                            <OrderItem {...item} />
                        </li>);
                })}

            </ul>
        </>
    );
}

/*

{
    "_id":"6298e0abfa747e001bd4d44a",
    "ingredients":
        ["60d3b41abdacab0026a733c7","60d3b41abdacab0026a733d3","60d3b41abdacab0026a733d2","60d3b41abdacab0026a733d4","60d3b41abdacab0026a733d1","60d3b41abdacab0026a733d0","60d3b41abdacab0026a733cb","60d3b41abdacab0026a733ca","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c8","60d3b41abdacab0026a733ce","60d3b41abdacab0026a733cd","60d3b41abdacab0026a733cc","60d3b41abdacab0026a733cd","60d3b41abdacab0026a733cc","60d3b41abdacab0026a733cf","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c7"],
    "status":"done",
    "name":"Традиционный-галактический астероидный био-марсианский бессмертный метеоритный антарианский space минеральный фалленианский альфа-сахаридный spicy люминесцентный экзо-плантаго флюоресцентный бургер",
    "createdAt":"2022-06-02T16:09:15.523Z",
    "updatedAt":"2022-06-02T16:09:15.838Z",
    "number":16544}

*/