import React from "react";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { PAGE_INGREDIENT_DETAILS } from "../../utils/constants";

import styles from './IngredientCard.module.css';

function Card({ _id, imgSrc, price, name, count }) {

    const location = useLocation();

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id: _id },
        collect: monitor => (
            { opacity: monitor.isDragging() ? .5 : 1 }
        )
    });

    return (

        <div style={{ opacity }} draggable ref={dragRef} className={styles.card}>
            <Link className={styles.link} to={`${PAGE_INGREDIENT_DETAILS}/${_id}`} 
                state={ {background: location} }
           >
                <img className={`${styles.img} mb-1`} src={imgSrc} alt={name} />
                <div className={styles.price} >
                    <p className="text text_type_digits-default mr-2"> {price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styles.description} text text_type_main-default mt-1`}> {name}</p>

                {count > 0 && <Counter count={count} size="default" />}
            </Link>
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