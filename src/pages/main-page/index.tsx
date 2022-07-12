import React, { memo } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

import styles from './index.module.css';

import { useSelector } from '../../services/hooks';
import { RootState } from '../../services/types';

function MainPage() {

  const {
    requestInProgress,
    requestFailed,
    errorText} = useSelector((store:RootState) => store.ingredients);

  if (requestInProgress) return <p>Loading...</p>;
  if (requestFailed) return <pre> {JSON.stringify(errorText)} </pre>;
  
  return (

    <DndProvider backend={HTML5Backend}>

      <div className={styles.content}>
        <div className='mr-20'>
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