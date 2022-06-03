import React from "react";
import PropTypes from "prop-types";

import OrderComponents from "./OrderComponents";

import styles from './OrderItem.module.css';

export const getOrderDate = orderDateStr => {

    const orderDate = new Date(Date.parse(orderDateStr));

    const DAY_MSEC = 24 * 3600 * 1000;

    const daysAgo = orderDate => {
        const dateNum = Date.parse((new Date()).toISOString().slice(0, 10));
        const orderDateNum = Date.parse(orderDate.toISOString().slice(0, 10));

        const daysPassed = (dateNum - orderDateNum) / DAY_MSEC;

        if (daysPassed === 0) {
            return 'Сегодня';
        } else if (daysPassed === 1) {
            return 'Вчера';
        } else if (daysPassed <= 4) {
            return `${daysPassed} дня назад`;
        } else {
            return `${daysPassed} дней назад`;
        }
    };

    const hours =
        orderDate.getHours() > 9
            ? `${orderDate.getHours()}`
            : `0${orderDate.getHours()}`;

    const minutes =
        orderDate.getMinutes() > 9
            ? `${orderDate.getMinutes()}`
            : `0${orderDate.getMinutes()}`;

    return `${daysAgo(orderDate)}, ${hours}:${minutes} i-GMT+${(orderDate.getTimezoneOffset() * -1) / 60}`;
};

function OrderItem({ ingredients, name, createdAt, number }) {

    const created = getOrderDate(createdAt);

    return (
        <article className={styles.card}>

            <div className={`mb-6 ${styles.card__title}`}>
                <p className="text text_type_main-medium"> {`#${number}`} </p>
                <p className="text text_type_main-default text_color_inactive">
                    {created}
                </p>
            </div>

            <p className="mb-6 text text_type_main-medium">{name}</p>

            <OrderComponents ingredients={ingredients}/>
        </article>
    );
}

OrderItem.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

export default OrderItem;