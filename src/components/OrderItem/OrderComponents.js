import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './OrderComponents.module.css';

const MAX_COMPONENTS = 6;
const OFFSET_COMPONENT = 48;
const styleRestComponents = { left: (MAX_COMPONENTS-1) * OFFSET_COMPONENT };

function OrderComponents({ ingredients }) {    

    const { items: ingredientsAll } = useSelector(state => state.ingredients);

    const imgArray = useMemo( ()=>
        ingredients.slice(0, MAX_COMPONENTS).map(item => ingredientsAll.find(i => i._id === item).image_mobile),
        [ingredients, ingredientsAll]);

    const price = useMemo( ()=>
        ingredients.reduce((acc, el) => acc + ingredientsAll.find(i => i._id === el).price, 0)
        ,[ingredients, ingredientsAll]);    

    return (

        <div className={`${styles.container}`}>

            <div className={`${styles.components}`}>

                {imgArray.map((item, index) => {

                    return (
                        <div key={index} className={styles.components__imgWrapper} style={{ left: index * OFFSET_COMPONENT, zIndex: MAX_COMPONENTS - index }}>
                            <img className={styles.components__img} src={item} alt="?" />
                        </div>
                    );
                })}

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


OrderComponents.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default OrderComponents;