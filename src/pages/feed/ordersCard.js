import React from "react";
import { useSelector } from "react-redux";

import OrderItem from "../../components/OrderItem/OrderItem";

import styles from './ordersCard.module.css';

function OrdersCard() {

    const {orders} = useSelector(state => state.wsSocket);

    return (

        <ul className={`${styles.orders} custom-scroll`}>
            {orders.map(item => {
                return (
                    <li className="mr-2" key={item._id}>
                        <OrderItem {...item} />
                    </li>);
            })}
        </ul>
    );
}

export default OrdersCard;