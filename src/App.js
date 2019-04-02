import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Home, Auth } from 'pages';

class App {
    render() {
        return (
            <div>
                <Router exact path="/" component={Home}/>
                <Router path="/auth" component={Auth}/>
            </div>
        );
    }
}

export default App;
