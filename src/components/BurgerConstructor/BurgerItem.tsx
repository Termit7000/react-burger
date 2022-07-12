import React, { FC, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerItem.module.css';

import { decreaseIngredient, deleteFromConstructor, moveConstructorElement } from '../../services/actions';
import { TConstructorItem, TIngredients } from "../../services/types";
import { useDispatch } from "../../services/hooks";

export type TConstructorParams = Pick<TIngredients, 'name'| 'price' |'image'> & TConstructorItem
const BurgerItem: FC<TConstructorParams> = ({ itemKey, id, name, price, image }) => {

    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const removeIngredient = () => {
        dispatch(decreaseIngredient({ id }));
        dispatch(deleteFromConstructor({ id, itemKey }));
    };

    //Сортировка элементов бургера
    const [{ opacity }, dragRef] = useDrag({
        type: 'constructor',
        item: { itemKey, id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    }, []);

    const [, drop] = useDrop({
        accept: 'constructor',
        hover(dragItem: TConstructorItem) {

            if (!ref.current) {
                return;
            }

            if (dragItem.itemKey === itemKey) {
                return;
            }
            dispatch(moveConstructorElement({ fromId: dragItem.itemKey, toId: itemKey }));
        }
    }, []);

    drop(dragRef(ref));

    return (
        <div draggable ref={ref} className={`${styles.burger_item}`} style={{ opacity }}>
            <div className={styles.drag_icon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={removeIngredient}
            />
        </div>
    );
}

export default BurgerItem;