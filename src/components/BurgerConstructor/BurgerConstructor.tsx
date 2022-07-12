import React  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from '../../services/hooks';

import BurgerItem from './BurgerItem';

import { PAGE_ORDER } from '../../utils/constants';

import { addToConstructor, increaseIngredient } from '../../services/actions';

import styles from './BurgerConstructor.module.css';
import { RootState, TConstructorItem, TIngredients } from '../../services/types';

export default function BurgerConstructor() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    //Перетаскивание ингредиентов
    const [{ isHover }, dropRef] = useDrop({
        accept: 'ingredient',
        drop(itemId:TConstructorItem) {
            
            dispatch(increaseIngredient(itemId)); //увеличть счетчик ингридиента
            dispatch(addToConstructor(itemId)); //добавить ингридиент в конструктор
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    }, []);

    const openOrder = () => navigate(PAGE_ORDER,{state:  {background: location}});

    //Состав конструктора
    const items_all = useSelector((state:RootState)=>state.ingredients.items);
    
    const { ingredients, bun } = useSelector((state:RootState) => state.ingredients.constructor);
    const itemsBurger = ingredients.map((el:TConstructorItem)=>({...items_all.find(i=>i._id===el.id)!, itemKey: el.itemKey}));
    const bunBurger = bun && items_all.find(el=>el._id===bun);

    const isConstructorEmpty = itemsBurger.length === 0 && !bunBurger;

    const bunPrice = (bunBurger) ? bunBurger.price: 0;

    const sum = itemsBurger.reduce((acc, el) => acc + el.price!, bunPrice * 2);

    const blokedItem = ({ type, _id, name, price, image }: TIngredients & {type: 'top'| 'bottom'}) =>

        <div className={`ml-6 pr-4 ${type==='bottom' && 'mb-4'}`}>
            <ConstructorElement
                key={_id}
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
           {bun && blokedItem({ ...bunBurger as TIngredients, type: 'top' })}
            <ul className={`${styles.components__items} mt-4 mb-4 mr-1 custom-scroll`}>
                {
                    [...itemsBurger]
                        .map((el ) =>
                            <li className= {`pr-2 mb-4`} key={el.itemKey}>                                
                                <BurgerItem {... {...el, itemKey:el.itemKey, id:el._id} }  />
                            </li>)}
            </ul>

            {bun && blokedItem({ ...bunBurger as TIngredients, type: 'bottom' })}

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