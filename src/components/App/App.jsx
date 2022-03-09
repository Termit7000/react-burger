import React, { useState } from 'react';
import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientsProvider from '../../contexts/ingredient-context';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import FetchIngredients from '../FetchIngredients/FetchIngredients';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
  
  const [statePlaceOrder, setPlaceOrder] = useState(false);
  const openOrder = ()=> setPlaceOrder(true);
  const closeOrder = ()=> setPlaceOrder(false);


  const [stateIngredientDetails, setIngredientDetals] = useState({isOpen: false});
  const openIngredientDetails = (details)=>setIngredientDetals({...details, isOpen: true});
  const closeIngredientDetails = ()=> setIngredientDetals({isOpen:false});  

  const renderIngredients = () => {
    return (

      <div className={styles.section_wrapper}>
        <div className='mr-10'>
          <BurgerIngredients handlerOpenIngredient ={openIngredientDetails} />
        </div>
        <div className='ml-7'>
          <BurgerConstructor handleOrder={openOrder} />          
        </div>
      </div>
    );
  }

  return (

    <IngredientsProvider>
      <AppHeader />
      <FetchIngredients renderSuccess={renderIngredients} />

      {statePlaceOrder &&

        <Modal handleClose={closeOrder}>
          <OrderDetails />
        </Modal>}

      {stateIngredientDetails.isOpen &&
        <Modal handleClose={closeIngredientDetails}>
          <IngredientDetails {...stateIngredientDetails} />
        </Modal>}      

    </IngredientsProvider>
  );
}

export default App;
