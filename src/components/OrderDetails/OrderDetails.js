import React from "react";

import styles from './OrderDetails.module.css';
import { useSelector } from "react-redux";

function OrderDetails() {

    const {
        orderRequestInProgress,
        orderRequestFailed,
        orderErrorText,
        orderId
    } = useSelector(store => store.order);

    if (orderRequestInProgress) return <p className={`${styles.order__id} text text_type_main-default mt-30 mb-30 ml-4`}>Обработка заказа...</p>;
    if (orderRequestFailed) return (

        <div className={styles.order}>
            <p className={`mt-30 mb-15 text text_type_main-large`} >Ошибка создания заказа:</p>
            <pre className={`${styles.order__error} mt-4 mb-30 text text_type_main-default`}> {orderErrorText}</pre>
        </div>
    );

    return (
        <div className={styles.order}>
            <p className={`${styles.order__id} text text_type_digits-large mt-30`} >{orderId}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <div className={`mt-15 ${styles.order__graphics}`} />
            <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={`mt-2 mb-30 text text_type_main-default ${styles.order__caption}`}>Дождитесь готовности на орбитальной станции</p>
        </div>);
}

export default OrderDetails;