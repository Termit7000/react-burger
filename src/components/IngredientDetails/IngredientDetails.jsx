import React, { useMemo } from "react";

import { useIngredients } from "../../services/ingredient-context";
import { useModals } from "../../services/modal-context";

import styles from './IngredientDetails.module.css';

function IngredientDetails() {

    const { data } = useIngredients();
    const { contentModal } = useModals();
    const { ingredientID } = contentModal;

    const currentIngredient = useMemo(() => data.find(el => el._id === ingredientID), [ingredientID, data]);

    const nutrients = currentIngredient &&
        [
            { type: 'Калории, ккал', name: currentIngredient.calories },
            { type: 'Белки, г', name: currentIngredient.proteins },
            { type: 'Жиры, г', name: currentIngredient.fat },
            { type: 'Углеводы, ', name: currentIngredient.carbohydrates },
        ];

    return (

        <div className={styles.ingredient}>

            {currentIngredient

                ?
                <>
                    <p className={`${styles.ingredient__title} mt-10 ml-10 text text_type_main-large`}>Детали ингредиента</p>
                    <img className={`${styles.ingredient__img} `} src={currentIngredient.image_large} alt={currentIngredient.name} />
                    <p className="mt-4 mb-8 text text_type_main-medium">{currentIngredient.name}</p>

                    <ul className={`${styles.ingredient__nutrients} mb-15`}>

                        {nutrients.map(({ type, name }) => {
                                return <li key={`ingredientID_${type}`} className={`${styles.ingredient__nutrient} mr-5`}>
                                    <p className="text text_type_main-default mb-8">{type}</p>
                                    <p className="text text_type_digits-default">{name}</p>
                                </li>
                            })
                        }
                    </ul>
                </>
                :
                <p className="mt-30 mb-30 text text_type_main-small">Не удалось получить информацию по ингредиенту с id: {ingredientID}</p>
            }
        </div>
    );
}

export default IngredientDetails;