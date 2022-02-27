import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientsProvider from '../hooks/ingredient-hooks';


function App() {
  return (
    <IngredientsProvider>
      <AppHeader />
      <BurgerIngredients/>
    </IngredientsProvider>
  );
}

export default App;
