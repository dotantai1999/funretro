import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListBoard from './page/ListBoard';

const Board = () => {
    return (


        <Switch>
            <Route path='/' component={ListBoard}></Route>
            {/*<Route path='/:boardId' exact component={BoardDetail}></Route>*/}
        </Switch>
    )
}

export default Board;

