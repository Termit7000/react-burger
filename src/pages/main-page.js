import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';

import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import IngredientCard from "../components/IngredientCard/IngredientCard";
import Modal from '../components/Modal/Modal';

import styles from './main-page.module.css';

import { getIngredientsItems, getOrderNumber, 

  closeIngredientDetails,
  openIngredientDetails,
  closeModalOrder,
  increaseIngredient,
  addToConstructor,
  decreaseIngredient,
  deleteFromConstructor} from '../services/actions';

function MainPage() {

  const {
    requestInProgress,
    requestFailed,
    errorText,
    isDatailsOpen } = useSelector(store => store.ingredients);

  const {
    orderRequestInProgress,
    orderRequestFailed,
    orderErrorText,
    orderId,
    isOrderOpened } = useSelector(store => store.order);

  const dispatch = useDispatch();

  //Получение списка ингредиентов 
  useEffect(() => dispatch(getIngredientsItems()), [dispatch]);

  //Модальное окно деталей ингредиента
  const closeModalIngredient = () => dispatch(closeIngredientDetails());
  const openModalIngredient = useCallback(({ ingredientId }) => dispatch(openIngredientDetails(ingredientId)), [dispatch]);

  const cardIngredient = useCallback((props) => <IngredientCard clickHandler={openModalIngredient} {...props} />, [openModalIngredient]);

  if (requestInProgress) return <p>Loading...</p>;
  if (requestFailed) return <pre> {JSON.stringify(errorText)} </pre>;

  //МОДАЛЬНОЕ ОКНО ЗАКАЗА
  const openOrder = () => dispatch(getOrderNumber());
  const closeOrder = () => dispatch(closeModalOrder());

  /**
   * 
   * @param {Object} id - id ингредиента, itemKey - уникальный ключ элемента в конструкторе
   * @returns 
   */
  const dropHandler = ({ id, itemKey }) => {

    dispatch(increaseIngredient({id}));
    dispatch(addToConstructor({id,itemKey}));
  };

  const deleteHandler = ({ id, itemKey }) => {

    dispatch(decreaseIngredient({id}));
    dispatch(deleteFromConstructor({id,itemKey}));
  }

  return (
    
      <DndProvider backend={HTML5Backend}>

        <div className={styles.content}>
          <div className='mr-10'>
            <BurgerIngredients card={cardIngredient} />

            {isDatailsOpen &&
              <Modal handleClose={closeModalIngredient}>
                <IngredientDetails />
              </Modal>}
          </div>

          <div className='ml-7'>

            <BurgerConstructor createOrderHandler={openOrder} dropHandler={dropHandler} deleteHandler={deleteHandler} />

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

export default MainPage;