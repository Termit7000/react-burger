import React from "react";
import PropTypes from "prop-types";

import OrderComponents from "./OrderComponents";
import PassedPeriod from "../../ui/passed-period";

import styles from './OrderItem.module.css';

function OrderItem({ ingredients, name, createdAt, number }) {

    return (
        <article className={styles.card}>

            <div className={`mb-6 ${styles.card__title}`}>
                <p className="text text_type_main-medium"> {`#${number}`} </p>
                <PassedPeriod date={createdAt} />
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