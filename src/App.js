import React from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import  './App.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//pages imports
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import NavBar from './components/NavBar';

const theme = createMuiTheme({
   palette:{
       primary:{
           light: '#33c9dc',
           main: '#00bcd4',
           dark: '#008394',
           contrastText: '#fff'
       },
       secondary: {
           light: '#ff6333',
           main: '#ff3d00',
           dark: '#b22a00',
           contrastText: '#fff'
       }
   }
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
              <BrowserRouter>
                  <div className="container">
                      <NavBar/>
                      <Switch>
                          <Route exact path='/' component={home}></Route>
                          <Route exact path='/login' component={login}></Route>
                          <Route exact path='/signup' component={signup}></Route>
                      </Switch>
                  </div>

              </BrowserRouter>
          </div>
      </MuiThemeProvider>
  );
}

export default App;
