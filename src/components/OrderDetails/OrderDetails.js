import React from "react";
import PropTypes from 'prop-types';

import styles from './OrderDetails.module.css';

function OrderCard({orderId='034536'}){

    return (
        <div className={styles.order}>
            <p className={`${styles.order__id} text text_type_digits-large mt-30`} >{orderId}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <div className={`mt-15 ${styles.order__graphics}`}/>
            <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={`mt-2 mb-30 text text_type_main-default ${styles.order__caption}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderCard.propTypes = {
    orderId: PropTypes.string
};

export default OrderCard;