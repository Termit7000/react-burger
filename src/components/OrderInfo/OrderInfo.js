import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientPreview from "../../ui/ingredient-preview";
import PassedPeriod from "../../ui/passed-period";

import styles from './OrderInfo.module.css';

//Содержит состав заказа с ингредиентами
export default function OrderInfo() {

    const { orders, isOpened } = useSelector(state => state.wsSocket);
    const { items: ingredientsAll } = useSelector(state => state.ingredients);
    const { id } = useParams();

    if (!isOpened || orders.length === 0) return (<p>Поиск заказа...</p>);

    const currentOrder = orders.find(el => el._id === id);

    if (!currentOrder) return (<p>Заказ не найден</p>);

    let strStatus = '';
    switch (currentOrder.status) {
        case 'done':
            {
                strStatus = 'Выполнен';
                break;
            }
        case 'pending':
            {
                strStatus = 'В работе';
                break;
            }

        case 'cancel':
            {
                strStatus = 'Отменен';
                break;
            }
        default:
            {
                strStatus = '';
            }
    }

    const doneStyle = (currentOrder.status === 'done') ? styles.orderInfo__status_done : '';

    const ingredientsByGroup = currentOrder.ingredients.reduce((acc, el) => {

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
            <p className={`text text_type_main-default ${doneStyle}`}>{strStatus}</p>

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


