import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>

        <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/login" component={Login} exact/>
             <Route path="/register" component={Register} exact/>
        </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;

