import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

//pages
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import MainPage from '../../pages/main-page/main-page';
import Registration from '../../pages/registration/registration';
import ResetPassword from '../../pages/reset-password/reset-password';
import SignIn from '../../pages/sign-in/sign-in';

import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import { getIngredientsItems } from '../../services/actions';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = useCallback(() => navigate(-1), [navigate]);

  //Получение списка ингредиентов 
  useEffect(() => {

    dispatch(getIngredientsItems());

  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.background;
  
  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>

      {background &&
        <Routes>
          <Route path='/ingredients/:id' element={
            <Modal handlerClose={closeModal}>
              <IngredientDetails />
            </Modal>
          } />

          <Route path='/order' element={
            <Modal handlerClose={closeModal}>
              <OrderDetails />
            </Modal>
          }
          />
        </Routes>
      }
    </>
  );
}

export default App;