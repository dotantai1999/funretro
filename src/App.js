import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import board from './feature/board';
import SignIn from './feature/auth/page/SignIn';
import EditUser from './feature/user/page/EditUser';
import SignUp from './feature/auth/page/SignUp';
import PrivatedRoute from './components/privatedroute';
import AuthContextProvider from './context/AuthContext';


function App() {
  return (

    
    <BrowserRouter>
    <AuthContextProvider>
      
      <Switch>
        <Route path='/' exact component={SignIn} />
        <PrivatedRoute path='/board' component={board} />
        <Route path='/login' component={SignIn} />
        <PrivatedRoute path='/edituser' component={EditUser} />
        <Route path='/signup' component={SignUp} />
      </Switch>
      
      </AuthContextProvider>
    </BrowserRouter>




  );
}

export default App;
