import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeConnection, wsInit } from "../../redux/actions";

import OrdersCard from './ordersCard';
import StatusItem from "./statusItem";

import styles from './index.module.css';

export default function Feed() {

    const { isOpened, isError, errorText, orders, total, totalToday} = useSelector(state => state.wsSocket);

    const ordersDone = useMemo(() =>
        orders.filter(el => el.status === 'done').slice(0, 9).map(el => el.number), [orders]);

    const ordersPending = useMemo(() =>
        orders.filter(el => el.status !== 'done').slice(0, 9).map(el => el.number), [orders]);    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsInit());
        return () => dispatch(closeConnection());
    }, [dispatch]);

    if (isError) return <p className="text text_type_main-medium">{`Ошибка соединения: ${errorText}`}</p>
    if (!isOpened) return <p className="text text_type_main-medium">Установка соединения...</p>

    return (

        <section className={styles.feed} aria-label="Feed orders" >
            <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>

            <div className={styles.orders__wrapper}>

                <OrdersCard/>                

                <div className={styles.stats}>
                    <div className={styles.statuses}>
                        <StatusItem title='Готовы:' ordersData={ordersDone} itemsExtraClass={styles.ordersNumbers_success} />
                        <StatusItem title='В работе:' ordersData={ordersPending} />
                    </div>

                    <h4 className="mt-15 text text_type_main-medium">Выполнено за все время:</h4>
                    <p className="text text_type_digits-large">{total}</p>

                    <h4 className="mt-15 text text_type_main-medium">Выполнено за сегодня:</h4>
                    <p className="text text_type_digits-large">{totalToday}</p>

                </div>
            </div>            
        </section>
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