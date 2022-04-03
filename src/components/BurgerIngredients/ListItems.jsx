import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

import styles from './ListItems.module.css';


const ListItems= forwardRef( ( { name, type, card }, ref ) => {

    const { items } = useSelector(store=>store.ingredients);

    const ingredientsByType = items.filter(el => el.type === type);

    return (
        <article className={styles.ingredients}>
            <p ref={ref} className="mb-6 text text_type_main-medium">{name}</p>

            {items &&
                <ul className={`${styles.ingrediens__wrapper} pl-4 pr-4 mb-10`}>
                    {ingredientsByType.map(el =>
                        <li key={el._id} className={`${styles.card_item} mr-6`}>

                             {card( { imgSrc: el.image, ...el})}
                            
                        </li>
                    )}
                </ul>}
        </article>)
});

ListItems.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    card: PropTypes.func.isRequired    
}

export default ListItems;