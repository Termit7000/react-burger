import React from "react";
import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './OrderItem.module.css';
import { useSelector } from "react-redux";


export const getOrderDate = orderDateStr => {

    const orderDate = new Date(Date.parse(orderDateStr));

    const DAY_MSEC = 24 * 3600 * 1000;

    const daysAgo = orderDate => {
        const dateNum = Date.parse((new Date).toISOString().slice(0, 10));
        const orderDateNum = Date.parse(orderDate.toISOString().slice(0, 10));

        const daysPassed = (dateNum - orderDateNum) / DAY_MSEC;

        if (daysPassed === 0) {
            return 'Сегодня';
        } else if (daysPassed === 1) {
            return 'Вчера';
        } else if (daysPassed <= 4) {
            return `${daysPassed} дня назад`;
        } else {
            return `${daysPassed} дней назад`;
        }
    };

    const hours =
        orderDate.getHours() > 9
            ? `${orderDate.getHours()}`
            : `0${orderDate.getHours()}`;

    const minutes =
        orderDate.getMinutes() > 9
            ? `${orderDate.getMinutes()}`
            : `0${orderDate.getMinutes()}`;

    return `${daysAgo(orderDate)}, ${hours}:${minutes} i-GMT+${(orderDate.getTimezoneOffset() * -1) / 60}`;
};

export default function OrderItem({ ingredients, status, name, createdAt, number }) {

    const { items: ingredientsAll } = useSelector(state => state.ingredients);

    return (
        <article className={styles.card}>

            <div className={`mb-6 ${styles.card__title}`}>
                <p className="text text_type_main-medium"> {`#${number}`} </p>
                <p className="text text_type_main-default text_color_inactive">{getOrderDate(createdAt)}</p>
            </div>

            <p className="mb-6 text text_type_main-medium">{name}</p>

            <div className={`${styles.card__componentsContainer}`}>

                    <div className={`${styles.card__components}`}> 

                        {ingredients.slice(0,6).map((item, index)=>{
                            const srcImg = ingredientsAll.find(i=>i._id===item).image_mobile;
                            return (

                                <div className={styles.card__imgWrapper} style={{left:index*48, zIndex: 6-index}}>
                                    <img className={styles.card__img} src={srcImg} alt="?"/>
                                </div>                                

                            );
                        })}

                        {ingredients.length>6 && 

                            (<p className={`text text_type_main-default ${styles.card__ingredientsRest}`} style={{left:5*48}}>
                                {`+${ingredients.length-6}`}
                            </p>)
                        
                        }
                    

                    </div>

                    <div className={styles.card__price}>
                        <p className='text text_type_digits-default mr-2'>
                            {ingredients.reduce((acc, el)=> acc + ingredientsAll.find(i=>i._id===el).price,0)}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
            </div>
        </article>
    );
}

OrderItem.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

/*

{
    "_id":"6298e0abfa747e001bd4d44a",
    "ingredients":
        ["60d3b41abdacab0026a733c7","60d3b41abdacab0026a733d3","60d3b41abdacab0026a733d2","60d3b41abdacab0026a733d4","60d3b41abdacab0026a733d1","60d3b41abdacab0026a733d0","60d3b41abdacab0026a733cb","60d3b41abdacab0026a733ca","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c8","60d3b41abdacab0026a733ce","60d3b41abdacab0026a733cd","60d3b41abdacab0026a733cc","60d3b41abdacab0026a733cd","60d3b41abdacab0026a733cc","60d3b41abdacab0026a733cf","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c7"],
    "status":"done",
    "name":"Традиционный-галактический астероидный био-марсианский бессмертный метеоритный антарианский space минеральный фалленианский альфа-сахаридный spicy люминесцентный экзо-плантаго флюоресцентный бургер",
    "createdAt":"2022-06-02T16:09:15.523Z",
    "updatedAt":"2022-06-02T16:09:15.838Z",
    "number":16544}

*/