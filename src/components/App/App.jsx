import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

//pages
import ForgotPassword from '../../pages/forgot-password';
import MainPage from '../../pages/main-page';
import Registration from '../../pages/registration';
import ResetPassword from '../../pages/reset-password';
import SignIn from '../../pages/sign-in';
import NotFound from '../../pages/not-found';
import Feed from '../../pages/feed';

import {
  PAGE_FEED,
  PAGE_FORGOT_PASSWORD,
  PAGE_HOME,
  PAGE_INGREDIENT_DETAILS,
  PAGE_LOGIN,
  PAGE_ORDER,
  PAGE_ORDERS,
  PAGE_PROFILE,
  PAGE_REGISTER,
  PAGE_RESET_PASSWORD
} from '../../utils/constants';

import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import ProtectRout from '../ProtectRout/Protect-rout';
import Profile from '../../pages/profile';
import OrderInfo from '../OrderInfo/OrderInfo';
import OrdersHistory from '../OrdersHistory';

import ProfileForm from '../ProfileForm/ProfileForm';

import { getIngredientsItems } from '../../redux/thunks';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = useCallback(() => navigate(-1), [navigate]);

  //Получение списка ингредиентов 
  useEffect(() => dispatch(getIngredientsItems()), [dispatch]);

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

        <Route path={PAGE_FEED} element={<Feed />} />

        <Route path={`${PAGE_FEED}/:id`} element={
          <div className='mt-30 mb-4'>
            <OrderInfo />
          </div>
        } />

        <Route path={`${PAGE_PROFILE}/${PAGE_ORDERS}/:id`} element={
          <ProtectRout>
            <div className='mt-30 mb-4'>
              <OrderInfo />
            </div>
          </ProtectRout>
        } />

        <Route path={`${PAGE_PROFILE}/*`} element={
          <ProtectRout>
            <Routes>

              <Route path='*' element={<Profile />}>
                <Route index element={<ProfileForm />} />
                <Route path={`${PAGE_ORDERS}/*`} element={<OrdersHistory />} />
              </Route>

            </Routes>
          </ProtectRout>} />

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

          <Route path={`${PAGE_FEED}/:id`} element={
            <Modal handlerClose={closeModal}>
              <div className='mt-15 mb-4'>
                <OrderInfo />
              </div>
            </Modal>
          } />

          <Route path={`${PAGE_PROFILE}/${PAGE_ORDERS}/:id`} element={

            <ProtectRout>
              <Modal handlerClose={closeModal}>
                <div className='mb-4 mt-15'>
                  <OrderInfo />
                </div>
              </Modal>
            </ProtectRout>
          } />

        </Routes>
      }
    </>
  );
}

export default App;



/*


         


*/
