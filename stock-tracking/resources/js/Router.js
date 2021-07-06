import React from 'react';
import {Route , Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
//Sayfalar

import IndexPage from './Views/Index';
import LoginPage from './Views/Login';
import RegisterPage from './Views/Register';

const Main =() => (
    <Switch>
        <PrivateRoute exact path="/" component={IndexPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
    </Switch>
);

export default Main;