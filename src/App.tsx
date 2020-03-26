import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import Minesweeper from './minesweeper/Minesweeper';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/minesweeper">
                    <Minesweeper />
                </Route>
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
