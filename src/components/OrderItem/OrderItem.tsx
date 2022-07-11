import React, { FC } from "react";

import OrderComponents from "./OrderComponents";
import PassedPeriod from "../../ui/passed-period/index";

import styles from './OrderItem.module.css';
import strStatus from "../../utils/utils";
import { TOrderItemProps } from "./types";

const OrderItem:FC<TOrderItemProps>=({ ingredients, name, createdAt, number, status='' })=> {

    const isDone = status==='done';    

    return (
        <article className={styles.card}>

            <div className={`mb-6 ${styles.card__title}`}>
                <p className="text text_type_main-medium"> {`#${number}`} </p>
                <PassedPeriod date={createdAt} />
            </div>

            <p className="text text_type_main-medium">{name}</p>

            {status && <p className={`mt-2 ${(isDone) ? styles.text_done : ''}`}>{strStatus(status)}</p>}

            <div className="mt-6">
            <OrderComponents ingredients={ingredients}/>
            </div>
        </article>
    );
}

export default OrderItem;