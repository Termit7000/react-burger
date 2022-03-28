import React, { useState } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientsProvider from '../../contexts/ingredient-context';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientCard from "../IngredientCard/IngredientCard";
import Modal from '../Modal/Modal';

import { createOrder, getIngredients } from '../../utils/api';
import { useFetch } from "../../hooks/fetch-data";

import styles from './App.module.css';

function App() {

  const [modalIngredient, setModalIngredient] = useState({ isOpened: false });  

  const closeModalIngredient = () => setModalIngredient({ isOpened: false });
  const openModalIngredient = (content) => setModalIngredient({ ...content, isOpened: true });

  const [modalOrder, setModalOrder] = useState({ isOpened: false });  

  const openOrder = ({ ingredients }) => {

    setModalOrder({ isLoading: true, isOpened: true });

    createOrder({ ingredients })
      .then((dataFetch) => {

        if (!dataFetch.success) {
          return Promise.reject({ error: JSON.stringify(dataFetch) });          
        }
        
        setModalOrder({ orderId: dataFetch?.order.number, isOpened: true });
       
      })
      .catch(error=>setModalOrder({ error, isOpened:true, isLoading:false }));

  };
  const closeModalOrder = () => setModalOrder({ isOpened: false });

  const { data, error, isLoading } = useFetch(getIngredients);  
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <pre> {JSON.stringify(error)} </pre>;

  return (
    <>
      <AppHeader />

      <IngredientsProvider ingredients={data.map(el => ({ ...el, count: 0 }))}>
        <div className={styles.content}>
          <div className='mr-10'>

            <BurgerIngredients card={(props) => <IngredientCard handleOpenDetail={openModalIngredient} {...props} />} />
            {modalIngredient?.isOpened &&

              <Modal handleClose={closeModalIngredient}>
                <IngredientDetails {...modalIngredient} />
              </Modal>
            }
          </div>

          <div className='ml-7'>

            <BurgerConstructor createOrderHandler={openOrder} />
            {modalOrder.isOpened &&

              <Modal handleClose={closeModalOrder}>
                <OrderDetails {...modalOrder} />
              </Modal>

            }

          </div>
        </div>
      </IngredientsProvider>

    </>
  );
}

export default App;