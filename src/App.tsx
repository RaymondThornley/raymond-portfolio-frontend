import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PageHeader from './page/PageHeader';
import PageFooter from './page/PageFooter';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import Minesweeper from './minesweeper/Minesweeper';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/css/page.css'

function App() {
    return (
        <Router>
            <PageHeader />
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
            <PageFooter />
        </Router>
    );
}

export default App;
