import React, { forwardRef} from "react";
import PropTypes from 'prop-types';

import Card from "../Card/Card";
import { useIngredients } from "../../services/ingredient-context";

import styles from './ListIngredients.module.css';

const ListIngredients = forwardRef(({ name, type }, ref) => {

    const { data } = useIngredients();
    const ingredientsByType = data.filter(el => el.type === type);

    return (
        <article className={styles.ingredients}>
            <p ref={ref} className="mb-6 text text_type_main-medium">{name}</p>

            {data &&
                <ul className={`${styles.ingrediens__wrapper} pl-4 pr-4 mb-10`}>
                    {ingredientsByType.map(el =>
                            <li key={el._id} className={`${styles.card_item} mr-6`}>                                
                                <Card imgSrc={el.image} {...el} />
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