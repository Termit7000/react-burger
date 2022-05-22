import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

import styles from './main-page.module.css';

function MainPage() {

  const {
    requestInProgress,
    requestFailed,
    errorText} = useSelector(store => store.ingredients);

  if (requestInProgress) return <p>Loading...</p>;
  if (requestFailed) return <pre> {JSON.stringify(errorText)} </pre>;
  
  return (

    <DndProvider backend={HTML5Backend}>

      <div className={styles.content}>
        <div className='mr-10'>
           <BurgerIngredients/>
        </div>

        <div className='ml-7'>
          <BurgerConstructor />   
        </div>

      </div>
    </DndProvider>
  );
}

export default memo(MainPage);