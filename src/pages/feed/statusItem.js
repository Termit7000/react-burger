import React from "react";
import PropTypes from 'prop-types';

import styles from './statusItem.module.css';

function Statsus_item({ title, ordersData, itemsExtraClass }) {

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

Statsus_item.defaultProps = {
    itemsExtraClass: ''
}

Statsus_item.propTypes = {
    title: PropTypes.string,
    ordersData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    itemsExtraClass: PropTypes.string
};

export default Statsus_item;