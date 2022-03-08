import React from "react";
import PropTypes from 'prop-types';
import styles from './OrderCard.module.css';

function OrderCard(){

    return (
        <div className={styles.order}>
            <p className={`${styles.title} mt-10 mb-4 ml-10 text text_type_main-large`}>&nbsp;</p>
            <p className="order_number text text_type_digits-large" >034536</p>
            <p className="text text_type_main-small mt-8">идентификатор заказа</p>

        </div>

    );
}

export default OrderCard;