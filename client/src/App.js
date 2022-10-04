import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserContextProvider } from '../src/context/user-context';

import { Navbar } from '../src/components/nav-bar';
import { Home } from '../src/views/home';
import { Login } from '../src/views/login';
import { Deposit } from '../src/views/deposit';
import { Withdraw } from '../src/views/withdraw';
import { Balance } from '../src/views/balance';
import { CreateAccount } from '../src/views/create-account';
import { AllData } from '../src/views/all-data';
import { Feedback } from '../src/components/feedback';


function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <Feedback />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='deposit' element={<Deposit />} />
            <Route path='withdraw' element={<Withdraw />} />
            <Route path='balance' element={<Balance />} />
            <Route path='create-account' element={<CreateAccount />} />
            <Route path='all-data' element={<AllData />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
