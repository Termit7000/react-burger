import React, { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from './IngredientDetails.module.css';

function IngredientDetails() {

    const {id : ingredientId } = useParams();
    const { items } = useSelector(store=>store.ingredients);
    const currentIngredient = useMemo(() => items.find(el => el._id === ingredientId), [ingredientId, items]);

    useEffect(()=>window.history.replaceState({}, document.title),[]);

    if (Array.isArray(items) && items.length===0) {       

        return (
            <p className={`${styles.ingredient__loading} mt-30 mb-30 text text_type_main-small`}>Загрузка...</p>
        );
    }    

    if (!currentIngredient) {
        return (
            <p className={`${styles.ingredient__loading} mt-30 mb-30 text text_type_main-small`}>Не удалось получить информацию по ингредиенту с id: {ingredientId}</p>
        );
    }

    const { calories,proteins,fat,carbohydrates } = currentIngredient;

    const nutrients = 
        [
            { name: 'Калории, ккал', value: calories },
            { name: 'Белки, г', value: proteins },
            { name: 'Жиры, г', value: fat },
            { name: 'Углеводы, ', value: carbohydrates },
        ];

    return (

        <div className={styles.ingredient}>
                    <p className={`${styles.ingredient__title} mt-10 ml-10 text text_type_main-large`}>Детали ингредиента</p>
                    <img className={`${styles.ingredient__img} `} src={currentIngredient.image_large} alt={currentIngredient.name} />
                    <p className="mt-4 mb-8 text text_type_main-medium">{currentIngredient.name}</p>

                    <ul className={`${styles.ingredient__nutrients} mb-15`}>

                        {nutrients.map(({ name, value }) => {
                                return <li key={`ingredientID_${name}`} className={`${styles.ingredient__nutrient} mr-5`}>
                                    <p className="text text_type_main-default mb-8">{name}</p>
                                    <p className="text text_type_digits-default">{value}</p>
                                </li>
                            })
                        }
                    </ul>
        </div>
    );
}

export default IngredientDetails;