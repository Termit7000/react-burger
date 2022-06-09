import React from "react";
import PropTypes from "prop-types";

import OrderComponents from "./OrderComponents";
import PassedPeriod from "../../ui/passed-period";

import styles from './OrderItem.module.css';
import strStatus from "../../utils/utils";


function OrderItem({ ingredients, name, createdAt, number, status }) {

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

OrderItem.defaultProps = {
    status: ''
}

OrderItem.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    status: PropTypes.string
};

export default OrderItem;