import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientCard from "../IngredientCard/IngredientCard";
import Modal from '../Modal/Modal';

import styles from './App.module.css';
import { getIngredientsItems, getOrderNumber, 
  CLOSE_INGREDIENT_DETAILS, 
  OPEN_INGREDIENT_DETAILS, 
  CLOSE_MODAL_ORDER, 
  
  INCREASE_INGREDIENT, 
  ADD_TO_CONSTRUCTOR,
  DECREASE_INGREDIENT,
  DELETE_FROM_CONSTRUCTOR   } from '../../services/actions';

function App() {

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
  const closeModalIngredient = () => dispatch({ type: CLOSE_INGREDIENT_DETAILS });
  const openModalIngredient = useCallback(({ ingredientId }) => dispatch({ type: OPEN_INGREDIENT_DETAILS, ingredientId }), [dispatch]);

  const cardIngredient = useCallback((props) => <IngredientCard clickHandler={openModalIngredient} {...props} />, [openModalIngredient]);

  if (requestInProgress) return <p>Loading...</p>;
  if (requestFailed) return <pre> {JSON.stringify(errorText)} </pre>;

  //МОДАЛЬНОЕ ОКНО ЗАКАЗА
  const openOrder = () => dispatch(getOrderNumber());
  const closeModalOrder = () => dispatch({ type: CLOSE_MODAL_ORDER });

  /**
   * 
   * @param {Object} id - id ингредиента, itemKey - уникальный ключ элемента в конструкторе
   * @returns 
   */
  const dropHandler = ({ id, itemKey }) => {

    dispatch({ type: INCREASE_INGREDIENT, id });
    dispatch({ type: ADD_TO_CONSTRUCTOR, ...{ id, itemKey } });
  };

  const deleteHandler = ({ id, itemKey }) => {

    dispatch({ type: DECREASE_INGREDIENT, id });
    dispatch({ type: DELETE_FROM_CONSTRUCTOR, ...{ id, itemKey } });
  }


  return (
    <>
      <AppHeader />

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

              <Modal handleClose={closeModalOrder}>
                <OrderDetails orderId={orderId} isLoading={orderRequestInProgress} isFaild={orderRequestFailed} errorText={orderErrorText} />
              </Modal>
            }
          </div>
        </div>
      </DndProvider>
    </>
  );
}

export default App;