import React from "react";
import PropTypes from 'prop-types';

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModals } from "../../services/modal-context";

import styles from './IngredientCard.module.css';

function Card({_id, imgSrc, price, name, count}) {

    const { openModal } = useModals();
    const openCard = () => openModal({ingredientID: _id});

    return (
        <div className={styles.card} onClick={openCard}>
            <img className={`${styles.img} mb-1`} src={imgSrc} alt={name} />
            <div className={styles.price} >
                <p className="text text_type_digits-default mr-2"> {price}</p>
                <CurrencyIcon type="primary" />                
            </div>
            <p className={`${styles.description} text text_type_main-default mt-1`}> {name}</p>
            
            {count>0 && <Counter count={count} size="default" />}
           
        </div>
    );
}

Card.propTypes = {
    _id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default Card;