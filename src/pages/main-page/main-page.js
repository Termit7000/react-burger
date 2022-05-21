import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';

import styles from './main-page.module.css';

import {  
  closeModalOrder
} from '../../services/actions';

function MainPage() {

  const {
    requestInProgress,
    requestFailed,
    errorText} = useSelector(store => store.ingredients);

  const {
    orderRequestInProgress,
    orderRequestFailed,
    orderErrorText,
    orderId,
    isOrderOpened } = useSelector(store => store.order);

  const dispatch = useDispatch();

  if (requestInProgress) return <p>Loading...</p>;
  if (requestFailed) return <pre> {JSON.stringify(errorText)} </pre>;

  //МОДАЛЬНОЕ ОКНО ЗАКАЗА
  const closeOrder = () => dispatch(closeModalOrder());

  return (

    <DndProvider backend={HTML5Backend}>

      <div className={styles.content}>
        <div className='mr-10'>
           <BurgerIngredients/>
        </div>

        <div className='ml-7'>

          <BurgerConstructor />

          {isOrderOpened &&

            <Modal handleClose={closeOrder}>
              <OrderDetails orderId={orderId} isLoading={orderRequestInProgress} isFaild={orderRequestFailed} errorText={orderErrorText} />
            </Modal>
          }
        </div>
      </div>
    </DndProvider>
  );
}

export default memo(MainPage);