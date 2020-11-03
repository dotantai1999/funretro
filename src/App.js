import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import board from './feature/board';
import SignIn from './feature/auth/page/SignIn';
import Column from './feature/board/components/Column'
import BoardDetail from './feature/board/page/BoardDetail';
import EditUser from './feature/user/page/EditUser';
import SignUp from './feature/auth/page/SignUp';


function App() {
  return (


    <BrowserRouter>
      <Switch>
        <Route path='/board' component={board} />
        {/*<Route path='/user' component={User} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />*/}
        <Route path='/login' component={SignIn} />
        <Route path='/column' component={Column} />
        <Route path='/edituser' component={EditUser} />
        <Route path='/signup' component={SignUp} />



      </Switch>
    </BrowserRouter>




  );
}

export default App;
