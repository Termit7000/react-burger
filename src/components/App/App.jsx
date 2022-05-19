import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import MainPage from '../../pages/main-page/main-page';
import Registration from '../../pages/registration/registration';
import ResetPassword from '../../pages/reset-password/reset-password';
import SignIn from '../../pages/sign-in/sign-in';

import AppHeader from '../AppHeader/AppHeader';

function App() {

  
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/register' element={<Registration/>} /> 
        <Route path='/forgot-password' element={<ForgotPassword/>} /> 
        <Route path='/reset-password' element={<ResetPassword/>} /> 

      </Routes>
    </>
  );
}

export default App;