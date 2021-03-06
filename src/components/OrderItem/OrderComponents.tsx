import React, { useMemo } from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientPreview from "../../ui/ingredient-preview";
import styles from './OrderComponents.module.css';
import { RootState } from "../../services/types";
import { TOrderComponentsProps } from "./types";
import { useSelector } from "../../services/hooks";

const MAX_COMPONENTS = 6;
const OFFSET_COMPONENT = 48;
const styleRestComponents = { left: (MAX_COMPONENTS - 1) * OFFSET_COMPONENT };

function OrderComponents({ ingredients }: TOrderComponentsProps) {

    const { items: ingredientsAll } = useSelector((state:RootState) => state.ingredients);

    const imgArray = useMemo(() =>
        ingredients.slice(0, MAX_COMPONENTS).map(item => ingredientsAll.find(i => i._id === item)!.image_mobile),
        [ingredients, ingredientsAll]);

    const price = useMemo(() =>
        ingredients.reduce((acc, el) => acc + ingredientsAll.find(i => i._id === el)!.price, 0)
        , [ingredients, ingredientsAll]);

    return (

        <div className={`${styles.container}`}>

            <div className={`${styles.components}`}>

                <ul className="list">
                    {imgArray.map((item, index) => {
                        return (
                            <li key={index} style={{ left: index * OFFSET_COMPONENT, zIndex: MAX_COMPONENTS - index, position: 'absolute' }}>
                                <IngredientPreview src={item} />
                            </li>);
                    })}
                </ul>

                {ingredients.length > MAX_COMPONENTS &&
                    (
                        <p className={`text text_type_main-default ${styles.components__ingredientsRest}`} style={styleRestComponents}>
                            {`+${ingredients.length - MAX_COMPONENTS}`}
                        </p>
                    )
                }
            </div>

            <div className={styles.components__price}>
                <p className='text text_type_digits-default mr-2'>
                    {price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
}

export default OrderComponents;