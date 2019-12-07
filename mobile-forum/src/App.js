import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Register from './containers/register/Register';
import Login from './containers/login/Login';
import Main from './containers/main/Main';

import './assets/css/index.less'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route component={Main}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;