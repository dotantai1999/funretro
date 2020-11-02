import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import board from './feature/board';
import SignIn from './feature/auth/page/SignIn';



function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path='/board' component={board} />
        {/*<Route path='/user' component={User} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />*/}
        <Route path='/login' component={SignIn} />

      </Switch>
    </BrowserRouter>

  );
}

export default App;
