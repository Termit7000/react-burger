import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import OrdersCard from './ordersCard';
import StatusItem from "./statusItem";

import styles from './index.module.css';

const MAX_ORDERS = 30;

export default function Feed() {

    const { isOpened, isError, errorText, orders, total, totalToday } = useSelector(state => state.wsSocket);

    const ordersDone = useMemo(() =>
        orders.filter(el => el.status === 'done').slice(0, MAX_ORDERS).map(el => el.number), [orders]);

    const ordersPending = useMemo(() =>
        orders.filter(el => el.status !== 'done').slice(0, (MAX_ORDERS - 1)).map(el => el.number), [orders]);

    if (isError) return <p className="text text_type_main-medium">{`Ошибка соединения: ${errorText}`}</p>
    if (!isOpened) return <p className="text text_type_main-medium">Установка соединения...</p>

    return (

        <section className={styles.feed} aria-label="Feed orders" >
            <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>

            <div className={styles.orders__wrapper}>

                <OrdersCard />                

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