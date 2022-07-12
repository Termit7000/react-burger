import React, {FC} from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { PAGE_INGREDIENT_DETAILS } from "../../utils/constants";

import styles from './IngredientCard.module.css';
import { TIngredients } from "../../services/types";

const Card:FC<{card:TIngredients}> = ( {card}) => {

    const { _id, image, price, name, count=0 } = card;

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
                <img className={`${styles.img} mb-1`} src={image} alt={name} />
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

export default Card;