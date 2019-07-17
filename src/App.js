import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';

//pages imports
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

//Components import
import NavBar from './components/NavBar';
import AuthRoute from './components/AuthRoute';
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#000fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#000fff'
        }
    },
    typography: {
        useNextVariants: true
    }
});

let authenticated = false;
const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser()); 
        window.location.href = '/login';
    }
    else {
        store.dispatch({type: SET_AUTHENTICATED});
        store.dispatch(getUserData());
    }
}

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <div className="container">
                        <NavBar />
                        <Switch>
                            <Route
                                exact
                                path='/'
                                component={home}></Route>
                            <AuthRoute exact
                                path='/login'
                                component={login}
                                authenticated={authenticated}></AuthRoute>
                            <AuthRoute exact
                                path='/signup'
                                component={signup}
                                authenticated={authenticated}></AuthRoute>
                            <Route exact 
                                   path="/users/:handle" 
                                   component={user}>
                            </Route>
                            <Route exact 
                                   path="/users/:handle/scream/:screamId" 
                                   component={user}>
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
