import React from "react";
import { useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientPreview from "../../ui/ingredient-preview";
import PassedPeriod from "../../ui/passed-period";

import styles from './OrderInfo.module.css';
import { PAGE_ORDERS, PAGE_PROFILE } from "../../utils/constants";
import useWsSocket from "../../hooks/useWsSocket";
import strStatus from "../../utils/utils";

//Содержит состав заказа с ингредиентами
export default function OrderInfo() {
    
    const { id } = useParams();
    const { items: ingredientsAll } = useSelector(state => state.ingredients);
    const isAuthSocket = !!useMatch(`${PAGE_PROFILE}/${PAGE_ORDERS}/:id`);

    const { orders } = useSelector(state => (isAuthSocket) ? state.wsOrdersHistory : state.wsSocket);

    useWsSocket(isAuthSocket);    
    
    if (orders.length === 0) return (<p>Поиск заказа...</p>);

    const currentOrder = orders.find(el => el._id === id);

    if (!currentOrder) return (<p>Заказ не найден</p>);

    const doneStyle = (currentOrder.status === 'done') ? styles.orderInfo__status_done : '';

    const ingredientsByGroup = currentOrder.ingredients.filter(i=>i!==null).reduce((acc, el) => {

        if (!acc[el]) {
            const ingredient = ingredientsAll.find(i => i._id === el);
            acc[el] = { ...ingredient, count: 1 };
        } else {
            acc[el].count++;
        }

        return acc;

    }, {});

    const listIngredients = Object.values(ingredientsByGroup);

    const totalPrice = listIngredients.reduce((acc,el)=>acc+el.price*el.count,0)

    return (
        <section className={styles.orderInfo} aria-label="Состав заказа">
            <p className={`text text_type_main-medium ${styles.orderInfo__number}`}>#{currentOrder.number}</p>
            <p className={`mt-10 mb-3 text text_type_main-medium`}>{currentOrder.name}</p>
            
            <p className={`text text_type_main-default ${doneStyle}`}>
                {strStatus(currentOrder.status)}
            </p>

            <p className={`mt-15 mb-6 text text_type_main-medium`}>Состав:</p>

            <div className={`custom-scroll pr-6 mb-10 ${styles.orderInfo__components}`}>

                {listIngredients.map(comp => (

                    <React.Fragment key={comp._id}>
                        <IngredientPreview src={comp.image_mobile} />
                        <p className="text text_type_main-default">{comp.name}</p>
                        <div className={styles.orderInfo_currency}>
                            <p className="mr-2 text text_type_digits-default"> {comp.count} x {comp.price}</p>
                            <CurrencyIcon />
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className={styles.orderInfo__total}>
                <PassedPeriod date={currentOrder.createdAt} />

                <div className={styles.orderInfo_currency}>
                    <p className="mr-2 text text_type_digits-default"> {totalPrice}</p>
                    <CurrencyIcon />
                </div>
            </div>
        </section>
    );
}