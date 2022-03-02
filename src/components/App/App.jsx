import React from 'react';
import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientsProvider from '../../contexts/ingredient-context';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <IngredientsProvider>
      <AppHeader />

      <div className={styles.section_wrapper}>

        <div className='mr-10'>
          <BurgerIngredients />
        </div>
        <div className='ml-7'>
        <BurgerConstructor />
        </div>
      </div>

    </IngredientsProvider>
  );
}

export default App;
