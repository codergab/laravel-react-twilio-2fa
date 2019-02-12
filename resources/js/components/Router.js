import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import NotFound from './NotFound';
import Homepage from './Homepage';
import Header from './Header';
import TwoFactor from './TwoFactor';
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Homepage} exact={true} />
                <Route path="/sign-in" component={Login} />
                <Route path="/create-account" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/authentication/validate/two-factor" component={TwoFactor} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;