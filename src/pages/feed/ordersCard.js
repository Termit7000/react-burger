import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import OrderItem from "../../components/OrderItem/OrderItem";

import { PAGE_FEED } from "../../utils/constants";

import styles from './ordersCard.module.css';

function OrdersCard() {

    const {orders} = useSelector(state => state.wsSocket);
    const location = useLocation();

    return (

        <ul className={`${styles.orders} custom-scroll`}>
            {orders.map(item => {
                return (
                    <li className="mr-2" key={item._id}> 
                        <Link className={styles.link} to={`${PAGE_FEED}/${item._id}`} state={ {background: location }} >
                            <OrderItem {...{...item, status: '', ingredients: item.ingredients.filter(el=>el!==null)}} />
                        </Link>
                    </li>);
            })}
        </ul>
    );
}

export default OrdersCard;