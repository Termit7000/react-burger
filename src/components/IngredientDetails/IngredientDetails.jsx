import React, { useMemo } from "react";

import styles from './IngredientDetails.module.css';
import { useSelector } from "react-redux";

function IngredientDetails() {

    const { items, ingredientId } = useSelector(store=>store.ingredients);

    const currentIngredient = useMemo(() => items.find(el => el._id === ingredientId), [ingredientId, items]);

    if (!currentIngredient) {
        return (
            <p className="mt-30 mb-30 text text_type_main-small">Не удалось получить информацию по ингредиенту с id: {ingredientId}</p>
        );
    }

    const nutrients = 
        [
            { name: 'Калории, ккал', value: currentIngredient.calories },
            { name: 'Белки, г', value: currentIngredient.proteins },
            { name: 'Жиры, г', value: currentIngredient.fat },
            { name: 'Углеводы, ', value: currentIngredient.carbohydrates },
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