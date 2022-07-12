import React, { FC } from "react";

import styles from './statusItem.module.css';
import { TStatusItemProps } from "./types";

const Statsus_item:FC<TStatusItemProps>=({ title, ordersData, itemsExtraClass = '' }) =>{

    return (
        <div className={styles.statuses__item}>
            <h3 className="mb-6 text text_type_main-medium">{title}</h3>
            <ul className={`${styles.ordersNumbers} ${itemsExtraClass && itemsExtraClass}`}>

                {ordersData && ordersData.map(orderNumber =>

                    <li key={orderNumber} className={`mb-2 ${styles.ordersNumbers__item}`}>
                        <p className="text text_type_digits-default">{orderNumber}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Statsus_item;