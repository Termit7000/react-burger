import React  from 'react';

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import BurgerItem from './BurgerItem';
import { addToConstructor, increaseIngredient } from '../../services/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_ORDER } from '../../utils/constants';

function BurgerConstructor() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    //Перетаскивание ингредиентов
    const [{ isHover }, dropRef] = useDrop({
        accept: 'ingredient',
        drop(itemId) {
            
            dispatch(increaseIngredient(itemId)); //увеличть счетчик ингридиента
            dispatch(addToConstructor(itemId)); //добавить ингридиент в конструктор
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    }, []);

    const openOrder = () => navigate(PAGE_ORDER,{state:  {background: location}});

    //Состав конструктора
    const items_all = useSelector(state=>state.ingredients.items);
    
    const { ingredients, bun } = useSelector(state => state.ingredients.constructor);
    const itemsBurger = ingredients.map(el=>({...items_all.find(i=>i._id===el.id), itemKey: el.itemKey}));
    const bunBurger = bun && items_all.find(el=>el._id===bun);

    const isConstructorEmpty = itemsBurger.length === 0 && !bunBurger;

    const sum = itemsBurger.reduce((acc, el) => acc + el.price, (bunBurger?.price || 0) * 2);

    const blokedItem = ({ type, id, name, price, image }) =>

        <div className={`ml-6 pr-4 ${type==='bottom' && 'mb-4'}`}>
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
        <section ref={dropRef} className={`${styles.components} page__section mt-25 ${isHover && styles.isHover} ${isConstructorEmpty && styles.emptyConstructor} `}  > 

        {isConstructorEmpty 
         ? <p className={styles.emptyConstructor__title}>Перетащите сюда ингредиенты</p>
         : <>
           {bun && blokedItem({ ...bunBurger, type: 'top' })}
            <ul className={`${styles.components__items} mt-4 mb-4 mr-1 custom-scroll`}>
                {
                    [...itemsBurger]
                        .map(el =>

                            <li className= {`pr-2 mb-4`} key={el.itemKey}>
                                <BurgerItem {...{...el, itemKey:el.itemKey, id:el._id}}  />
                            </li>)}
            </ul>

            {bun && blokedItem({ ...bunBurger, type: 'bottom' })}

            <div className={`${styles.order} mt-12 mr-4`}>
                <p className="text text_type_digits-medium">{sum}</p>
                <div className={`ml-2 mr-10 ${styles.currency_icon}`}>
                    <CurrencyIcon type="primary" />
                </div>

                <Button disabled={!sum} type="primary" size="large" onClick={openOrder}>
                    Оформить заказ
                </Button>
            </div>
            </>
        }

        </section>);
}

export default BurgerConstructor;