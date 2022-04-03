import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientCard from "../IngredientCard/IngredientCard";
import Modal from '../Modal/Modal';

import styles from './App.module.css';
import { getIngredientsItems, getOrderNumber } from '../../services/actions';

function App() {

  const {
    requestInProgress,
    requestFailed,
    errorText} = useSelector(store => store.ingredients);

  const {
    orderRequestInProgress,
    orderRequestFailed,
    orderErrorText,
    orderId } = useSelector(store => store.order);

  const dispatch = useDispatch();

  //Получение списка ингредиентов 
  useEffect(() => dispatch(getIngredientsItems()), [dispatch]);

  const [modalIngredient, setModalIngredient] = useState({ isOpened: false });
  const closeModalIngredient = () => setModalIngredient({ isOpened: false });
  const openModalIngredient = (content) => setModalIngredient({ ...content, isOpened: true });

  const [orderIsOpened, setModalOrder] = useState(false);

  const openOrder = ({ ingredients }) => {

    setModalOrder(true);
    dispatch(getOrderNumber({ingredients}));    

  };
  const closeModalOrder = () => setModalOrder(false);

  if (requestInProgress) return <p>Loading...</p>;
  if (requestFailed) return <pre> {JSON.stringify(errorText)} </pre>;

  return (
    <>
      <AppHeader />

        <div className={styles.content}>
          <div className='mr-10'>

            <BurgerIngredients card={(props) => <IngredientCard clickHandler={openModalIngredient} {...props} />} />
            {modalIngredient?.isOpened &&

              <Modal handleClose={closeModalIngredient}>
                <IngredientDetails {...modalIngredient} />
              </Modal>
            }
          </div>

          <div className='ml-7'>

            <BurgerConstructor createOrderHandler={openOrder} />

            {orderIsOpened &&

              <Modal handleClose={closeModalOrder}>
                <OrderDetails orderId={orderId}  isLoading = {orderRequestInProgress} isFaild = {orderRequestFailed} errorText = {orderErrorText} />
              </Modal>
            }
          </div>
        </div>      
    </>
  );
}

export default App;