import React, { forwardRef } from "react";
import { useSelector } from "../../services/hooks";
import { RootState, TIngredients } from "../../services/types";

import IngredientCard from '../IngredientCard/IngredientCard';

import styles from './ListItems.module.css';

const ListItems = forwardRef<HTMLParagraphElement, {name:string, type:string}>(( {name, type}, ref) => {

    const { items } = useSelector((store: RootState)=>store.ingredients);

    const ingredientsByType = items.filter(el => el.type === type)!;

    return (
        <article className={styles.ingredients}>
            <p ref={ref} className="mb-6 text text_type_main-medium">{name}</p>

            {items &&
                <ul className={`${styles.ingrediens__wrapper} pl-4 pr-4 mb-10`}>
                    {ingredientsByType.map((el: TIngredients) =>
                        <li key={el._id} className={`${styles.card_item} mr-6`}>

                            <IngredientCard card={el} />                             
                            
                        </li>
                    )}
                </ul>}
        </article>)
});

export default ListItems;