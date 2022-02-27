import React from "react";
import styles from './Card.module.css';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Card({ imgSrc, price, name, count }) {

    return (
        <div className={styles.card}>
            <img className={`${styles.img} mb-1`} src={imgSrc} alt={name} />
            <div className={styles.price} >
                <p className="text text_type_digits-default mr-1"> {price}</p>
                <CurrencyIcon type="primary" />                
            </div>
            <p className="text text_type_main-small mt-1"> {name}</p>
            <Counter count={5} size="default" />
        </div>
    );



}


Card.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default Card;