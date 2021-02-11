import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import LoginExample from './components/LoginExample';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/login" component={Login} exact/>
             <Route path="/loginExample" component={LoginExample} exact/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;

