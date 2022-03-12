import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientsProvider from '../../services/ingredient-context';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import FetchIngredients from '../FetchIngredients/FetchIngredients';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ModalProvider from '../../services/modal-context';

import styles from './App.module.css';

function App() {

  return (

    <IngredientsProvider>
      <AppHeader />

      <FetchIngredients>

        <div className={styles.content}>
          <div className='mr-10'>

            <ModalProvider>
              <BurgerIngredients>

                <Modal>
                  <IngredientDetails />
                </Modal>

              </BurgerIngredients>

            </ModalProvider>
          </div>

          <div className='ml-7'>
            <ModalProvider>

              <BurgerConstructor>

                <Modal>
                  <OrderDetails />
                </Modal>

              </BurgerConstructor>
            </ModalProvider>
          </div>
        </div>

      </FetchIngredients>
    </IngredientsProvider >
  );
}

export default App;