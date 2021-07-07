import React from 'react';
import {Route , Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//Sayfalar
import IndexPage from './Views/Index';
import LoginPage from './Views/Login';
import RegisterPage from './Views/Register';

//Ürünler
import ProductPage from './Views/Product/index';
import ProductCreate from './Views/Product/create';
const Main =() => (
    <Switch>
        <PrivateRoute exact path="/" component={IndexPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <PrivateRoute exact path="/urunler" component={ProductPage}/>
        <PrivateRoute exact path="/urunler/ekle" component={ProductCreate}/>
    </Switch>
);

export default Main;