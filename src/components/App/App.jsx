import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page';
import SignIn from '../../pages/sign-in/sign-in';

import AppHeader from '../AppHeader/AppHeader';

function App() {

  
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<SignIn/>} />
 

      </Routes>
    </>
  );
}

export default App;