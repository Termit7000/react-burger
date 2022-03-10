import React, { useMemo } from "react";
import styles from './IngredientDetails.module.css';
import { useIngredients } from "../../contexts/ingredient-context";
import { useModals } from "../../contexts/modal-context";

function IngredientDetails() {

    const { data } = useIngredients();
    const { contentModal } = useModals();
    const { ingredientID } = contentModal;

    const currentIngredient = useMemo(()=> data.find(el => el._id === ingredientID) , [ingredientID, data]);

    return (

        <div className={styles.container}>

            {currentIngredient

                ?
                <>
                    <p className={`${styles.title} mt-10 ml-10 text text_type_main-large`}>Детали ингредиента</p>
                    <img className={`${styles.img} `} src={currentIngredient.image_large} alt={currentIngredient.name} />
                    <p className="mt-10 mb-10 text text_type_main-medium">{currentIngredient.name}</p>
                </>
                :
                <p className="mt-30 mb-30 text text_type_main-small">Не удалось получить информацию по ингредиенту с id: {ingredientID}</p>

            }

        </div>
    );
}

export default IngredientDetails;