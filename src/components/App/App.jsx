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
import { CLOSE_INGREDIENT_DETAILS, getIngredientsItems, getOrderNumber, OPEN_INGREDIENT_DETAILS, CLOSE_MODAL_ORDER, ADD_INGREDIENT, DELETE_INGREDIENT} from '../../services/actions';

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

  //МОДАЛЬНОЕ ОКНО ЗАКАЗА
  const openOrder = () => dispatch(getOrderNumber());
  const closeModalOrder = () => dispatch({ type: CLOSE_MODAL_ORDER });

  if (requestInProgress) return <p>Loading...</p>;
  if (requestFailed) return <pre> {JSON.stringify(errorText)} </pre>;


  const dropHandler = ({id}) => dispatch({type: ADD_INGREDIENT, id});
  const deleteHandler = id => dispatch({type: DELETE_INGREDIENT, id});  

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

            <BurgerConstructor createOrderHandler={openOrder} dropHandler = {dropHandler}  deleteHandler = {deleteHandler}/>

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