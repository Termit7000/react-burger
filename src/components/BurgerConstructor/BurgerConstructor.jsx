import React from 'react';
import PropTypes from 'prop-types';

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import { useSelector } from 'react-redux';

const BUN_NAME = 'bun';

function BurgerConstructor({ createOrderHandler }) {

    const { ingredients } = useSelector(state=>state.order);

    const bun = ingredients.find(el => el.type === BUN_NAME);
    const outherComponents = ingredients.filter(el => el.type !== BUN_NAME);
    const sum = outherComponents.reduce((acc, el) => acc + el.price, (bun?.price || 0)*2);

    const blokedItem = ({ type, id, name, price, image }) =>

        <div className={`ml-6 pr-4`}>
            <ConstructorElement
                key={id}
                type={type}
                isLocked={true}
                text={type === 'top' ? `${name} (верх)` : `${name} (низ)`}
                price={price}
                thumbnail={image}
            />
        </div>;

    return (
        <section className={`${styles.components} page__section mt-25`}>
            {bun && blokedItem({ ...bun, type: 'top' })}
            <ul className={`${styles.components__items} mt-4 mb-4 mr-1 custom-scroll`}>
                {
                    outherComponents
                        .map(el =>
                            <li className={`${styles.burger_item} pr-2 mb-4`} key={el._id}>
                                <div className={styles.drag_icon}>
                                    <DragIcon type="primary" />
                                </div>
                                <ConstructorElement
                                    text={el.name}
                                    price={el.price}
                                    thumbnail={el.image}
                                />
                            </li>)}
            </ul>

            {bun && blokedItem({ ...bun, type: 'bottom' })}

            <div className={`${styles.order} mt-10 mr-4`}>
                <p className="text text_type_digits-medium">{sum}</p>
                <div className={`ml-2 mr-10 ${styles.currency_icon}`}>
                    <CurrencyIcon type="primary" />
                </div>

                <Button type="primary" size="large" onClick={createOrderHandler}>
                    Оформить заказ
                </Button>
            </div>
        

        </section>);
}

BurgerConstructor.propTypes = {
    createOrderHandler: PropTypes.func.isRequired
}

export default BurgerConstructor;