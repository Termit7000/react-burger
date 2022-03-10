import React from 'react';
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

  return (

    <IngredientsProvider>
      <AppHeader />

      <FetchIngredients>

        <div className={styles.section_wrapper}>
          <div className='mr-10'>
            <BurgerIngredients>

              <Modal>
                <IngredientDetails />
              </Modal>

            </BurgerIngredients>
          </div>
          
          <div className='ml-7'>
            <BurgerConstructor>

              <Modal>
                <OrderDetails />
              </Modal>

            </BurgerConstructor>
          </div>
        </div>

      </FetchIngredients>


    </IngredientsProvider>
  );
}

export default App;



