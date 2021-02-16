import './App.css';
import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import Register from './components/Register';

class App extends Component {
  render() {
    return (   
      <body>
        <h1>TA Matching App</h1>
        <div id="loginPane">
        <BrowserRouter>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>

        <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/login" component={LoginPage} exact/>
             <Route path="/register" component={Register} exact/>
        </Switch>
        </BrowserRouter>
        </div> 
      </body>   
    );
  }
}
 
export default App;

