import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Home, Auth } from 'pages';
import HeaderContainer from './components/Base/HeaderContainer';

class App {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <Router exact path="/" component={Home}/>
                <Router path="/auth" component={Auth}/>
            </div>
        );
    }
}

export default App;
