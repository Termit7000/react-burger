import React, { forwardRef } from "react";
import PropTypes from 'prop-types';
import Card from "../Card/Card";
import styles from './ListIngredients.module.css';
import { useIngredients } from "../../contexts/ingredient-context";

const ListIngredients = forwardRef(({handlerOpenIngredient,  name, type }, ref) => {

    const { data } = useIngredients();

    return (
        <article>
            <p ref={ref} className="mb-6 text text_type_main-medium">{name}</p>

            {data &&
                <ul className={`${styles.ingrediens_wrapper} pl-4 pr-4 mb-10`}>
                    {data
                        .filter(el => el.type === type)
                        .map(el =>
                            <li key={el._id} className={`${styles.card_item} mr-6`}>
                                <Card imgSrc={el.image} {...el} handlerOpenIngredient={handlerOpenIngredient} />
                            </li>
                        )}
                </ul>}
        </article>);
});

ListIngredients.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default ListIngredients;