import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from "react-redux";

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerItem.module.css';

import {moveConstructorElement} from '../../services/actions/index.js';


function BurgerItem({ itemKey, id, name, price, image, deleteHandler = f => f }) {

    const dispatch = useDispatch();

    const ref = useRef();

    //Сортировка элементов бургера
    const [{ opacity }, dragRef] = useDrag({
        type: 'constructor',
        item: {itemKey, id},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    },[]);

    const [, drop] = useDrop({
        accept: 'constructor',
        hover(dragItem) {
            
            if (!ref.current) {
                return;
            }
            
            if (dragItem.itemKey===itemKey) {
                return;
            }
            dispatch(moveConstructorElement({fromId: dragItem.itemKey, toId: itemKey}));   
        }
    },[]);

    drop(dragRef(ref));

    return (
        <div draggable ref={ref} className={`${styles.burger_item}`}  style={{opacity}}>
            <div className={styles.drag_icon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => deleteHandler({ id, itemKey })}
            />
        </div>
    );
}


BurgerItem.propTypes = {
    itemKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func
}

export default BurgerItem;
