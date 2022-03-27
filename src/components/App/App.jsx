import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientsProvider from '../../services/ingredient-context';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ModalProvider from '../../services/modal-context';

import styles from './App.module.css';

function App() {

  return (
    <>
      <AppHeader />

      <IngredientsProvider>
        <div className={styles.content}>
          <div className='mr-10'>

            <ModalProvider>

              <BurgerIngredients>
                <IngredientDetails />
              </BurgerIngredients>

            </ModalProvider>
          </div>

          <div className='ml-7'>
            <ModalProvider>

              <BurgerConstructor>
                <OrderDetails />
              </BurgerConstructor>

            </ModalProvider>
          </div>
        </div>
      </IngredientsProvider>
    </>
  );
}

export default App;