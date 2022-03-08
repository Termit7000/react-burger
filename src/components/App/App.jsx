import React from 'react';
import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientsProvider, { useIngredients } from '../../contexts/ingredient-context';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import FetchIngredients from '../FetchIngredients/FetchIngredients';
import Modal from '../Modal/Modal';
import OrderCard from '../OrderCard/OrderCard';

function App() {

  const renderIngredients = ()=> {
    return (

      <div className={styles.section_wrapper}>
        <div className='mr-10'>
          <BurgerIngredients />
        </div>
        <div className='ml-7'>
          <BurgerConstructor />
        </div>
      </div>
    );
  }  

  return (
    
    <IngredientsProvider>
      
      <Modal>

        <OrderCard />

      </Modal>

      <AppHeader />
      <FetchIngredients renderSuccess={renderIngredients} />
    </IngredientsProvider>
  );
}

export default App;
