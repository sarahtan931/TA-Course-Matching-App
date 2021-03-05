import React from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import MatchPage from './Pages/MatchPage';
import UploadPage from './Pages/UploadPage';
 
const Navigation = () => {
    return (
      <div id="Redirect-Bar">
      <BrowserRouter>
      <ul>
        <li><Link to="/">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/match">Match</Link></li>
        <li><Link to="/upload">Upload</Link></li>
      </ul>

      <Switch>
           <Route path="/" component={ContactPage} exact/>
           <Route path="/login" component={LoginPage} exact/>
           <Route path="/register" component={RegisterPage} exact/>
           <Route path="/match" component={MatchPage} exact/>
           <Route path="/upload" component={UploadPage} exact/>
      </Switch>
      </BrowserRouter>
      </div> 
    );
}
 
export default Navigation;