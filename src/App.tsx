import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './page/Homepage';
import NotFoundPage from './page/NotFoundPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
