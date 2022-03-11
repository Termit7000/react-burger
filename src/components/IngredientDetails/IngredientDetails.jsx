import React, { useMemo } from "react";
import styles from './IngredientDetails.module.css';
import { useIngredients } from "../../contexts/ingredient-context";
import { useModals } from "../../contexts/modal-context";

function IngredientDetails() {

    const { data } = useIngredients();
    const { contentModal } = useModals();
    const { ingredientID } = contentModal;

    const currentIngredient = useMemo(() => data.find(el => el._id === ingredientID), [ingredientID, data]);

    const nutrient_item = (name, value) => {
        return <li className={`${styles.nutrient} mr-5`}>
            <p className="text text_type_main-default mb-8">{name}</p>
            <p className="text text_type_digits-default">{value}</p>
        </li>
    };

    return (

        <div className={styles.container}>

            {currentIngredient

                ?
                <>
                    <p className={`${styles.title} mt-10 ml-10 text text_type_main-large`}>Детали ингредиента</p>
                    <img className={`${styles.img} `} src={currentIngredient.image_large} alt={currentIngredient.name} />
                    <p className="mt-4 mb-8 text text_type_main-medium">{currentIngredient.name}</p>

                    <ul className={`${styles.nutrients} mb-15`}>

                        {nutrient_item('Калории, ккал', currentIngredient.calories)}
                        {nutrient_item('Белки, г', currentIngredient.proteins)}
                        {nutrient_item('Жиры, г', currentIngredient.fat)}
                        {nutrient_item('Углеводы, г', currentIngredient.carbohydrates)}
                       
                    </ul>
                </>
                :
                <p className="mt-30 mb-30 text text_type_main-small">Не удалось получить информацию по ингредиенту с id: {ingredientID}</p>
            }
        </div>
    );
}

export default IngredientDetails;