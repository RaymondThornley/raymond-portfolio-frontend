import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageHeader from './page/PageHeader';
import PageFooter from './page/PageFooter';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import Connect from './connect/Connect';
import Mastermind from './mastermind/Mastermind';
import Minesweeper from './minesweeper/Minesweeper';
import TankWars from './tankWars/TankWars';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/css/page.css'

function App() {
    return (
        <div className="pageContainer">
            <Router>
                <PageHeader />
                <div className="pageContentConainer">
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/connect">
                            <Connect />
                        </Route>
                        <Route path="/mastermind">
                            <Mastermind />
                        </Route>
                        <Route path="/minesweeper">
                            <Minesweeper />
                        </Route>
                        <Route path="/tankwars">
                            <TankWars />
                        </Route>
                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </div>
                <PageFooter />
            </Router>
        </div>
    );
}

export default App;
