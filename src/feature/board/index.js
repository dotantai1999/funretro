import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListBoard from './page/ListBoard';
import BoardDetail from './page/BoardDetail'

const Board = () => {
    return (
        <Switch>
            <Route path='/board/' exact component={ListBoard}></Route>
            <Route path='/board/:boardId' exact component={BoardDetail}></Route>
        </Switch>
    )
}

export default Board;

