import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthRoute = ({component: Component, authenticated, ...rest}) =>(
    <Route 
    {...rest}
    render={(props)=>authenticated === true ? <Redirect to="/" />: <Component {...props}></Component> }
    >
        
    </Route>
)
export default AuthRoute;