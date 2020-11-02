import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import board from './feature/board';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/board' component={board} />
        {/*<Route path='/user' component={User} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />*/}

      </Switch>
    </BrowserRouter>

  );
}

export default App;
