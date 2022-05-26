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
import { NotFound } from '../../pages/not-found/not-fond';

import {
  PAGE_FORGOT_PASSWORD,
  PAGE_HOME,
  PAGE_INGREDIENT_DETAILS,
  PAGE_LOGIN,
  PAGE_ORDER,
  PAGE_PROFILE,
  PAGE_REGISTER,
  PAGE_RESET_PASSWORD
} from '../../utils/constants';
import ProtectRout from '../ProtectRout/Protect-rout';
import Profile from '../../pages/profile/profile';

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
        <Route path={PAGE_HOME} element={<MainPage />} />
        <Route path={PAGE_LOGIN} element={<SignIn />} />
        <Route path={PAGE_REGISTER} element={<Registration />} />
        <Route path={PAGE_FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PAGE_RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={`${PAGE_INGREDIENT_DETAILS}/:id`} element={<IngredientDetails />} />
        <Route path={PAGE_PROFILE} element={<Profile/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {background &&
        <Routes>
          <Route path={`${PAGE_INGREDIENT_DETAILS}/:id`} element={
            <Modal handlerClose={closeModal}>
              <IngredientDetails />
            </Modal>
          } />


          <Route path={PAGE_ORDER} element={

            <ProtectRout>

              <Modal handlerClose={closeModal}>
                <OrderDetails />
              </Modal>


            </ProtectRout>

          } />
        </Routes>
      }
    </>
  );
}

export default App;
