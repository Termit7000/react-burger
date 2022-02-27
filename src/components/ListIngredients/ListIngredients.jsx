import React, { forwardRef } from "react";
import PropTypes from 'prop-types';
import Card from "../Card/Card";
import { useIngredients } from "../hooks/ingredient-hooks";
import styles from './ListIngredients.module.css';

const ListIngredients=forwardRef( ({name, type}, ref)=> {

    const {ingredients} = useIngredients();

    return (
        <article className={`${styles.ingredients_container}`}>
            <p ref={ref} className="mb-6 text text_type_main-medium">{name}</p>
            <div className={`${styles.ingrediens_wrapper} pl-4 pr-4`}>
                {ingredients
                    .filter(el => el.type === type)
                    .map(el =>
                        <Card key={el._id} imgSrc={el.image} {...el} />
                    )
                }
            </div>

        </article>);
});


ListIngredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default ListIngredients;