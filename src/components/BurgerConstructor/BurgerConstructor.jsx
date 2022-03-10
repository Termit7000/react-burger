import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { useIngredients } from '../../contexts/ingredient-context';
import { ORDER_MODAL_NAME } from '../../utils/constants';

export default function BurgerConstructor({ children }) {

    const { data, contentModal, openModal } = useIngredients();

    const openOrderDetails = ()=>openModal(ORDER_MODAL_NAME);

    const bun = data.find(el => el.type === 'bun');
    const outherComponents = data.filter(el => el.type !== 'bun');
    const sum = (bun?.price || 0) + outherComponents.reduce((acc, el) => acc + el.price, 0);

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
        <section className={`${styles.components_container} page__section mt-25`}>
            {bun && blokedItem({ ...bun, type: 'top' })}
            <ul className={`${styles.burger_items} mt-4 mb-4 mr-1 custom-scroll`}>
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

                <Button type="primary" size="large" onClick={openOrderDetails}>
                    Оформить заказ
                </Button>
            </div>

            {contentModal.isOpened && contentModal.modalName===ORDER_MODAL_NAME && <>
                {children}
            </>}

        </section>);
}