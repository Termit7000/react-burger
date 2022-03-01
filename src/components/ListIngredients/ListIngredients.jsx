import React, { forwardRef } from "react";
import PropTypes from 'prop-types';
import Card from "../Card/Card";
import { useIngredients } from "../hooks/ingredient-hooks";
import styles from './ListIngredients.module.css';

const ListIngredients = forwardRef(({ name, type }, ref) => {

    const { ingredients } = useIngredients();

    return (
        <article>
            <p ref={ref} className="mb-6 text text_type_main-medium">{name}</p>
            <ul className={`${styles.ingrediens_wrapper} pl-4 pr-4 mb-10`}>
                {ingredients
                    .filter(el => el.type === type)
                    .map(el =>
                        <li key={el._id} className={`${styles.card_item} mr-6`}>
                            <Card imgSrc={el.image} {...el} />
                        </li>

                    )
                }
            </ul>

        </article>);
});


ListIngredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default ListIngredients;