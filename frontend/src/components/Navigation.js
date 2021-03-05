import React from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import MatchPage from './Pages/MatchPage';
import UploadPage from './Pages/UploadPage';
import InstructorDashboard from './Pages/InstructorDashboard';
 
const Navigation = () => {
    return (
      <div id="Redirect-Bar">
      <BrowserRouter>
      <ul class="nav-ul">
        <li class="nav-li"><Link to="/">Contact</Link></li>
        <li class="nav-li"><Link to="/login">Login</Link></li>
        <li class="nav-li"><Link to="/register">Register</Link></li>
        <li class="nav-li"><Link to="/match">Match</Link></li>
        <li class="nav-li"><Link to="/upload">Upload</Link></li>
        <li class="nav-li"><Link to="/instructor-dashboard">Instructor Dashboard</Link></li>
      </ul>

      <Switch>
           <Route path="/" component={ContactPage} exact/>
           <Route path="/login" component={LoginPage} exact/>
           <Route path="/register" component={RegisterPage} exact/>
           <Route path="/match" component={MatchPage} exact/>
           <Route path="/upload" component={UploadPage} exact/>
           <Route path="/instructor-dashboard" component={InstructorDashboard} exact/>
      </Switch>
      </BrowserRouter>
      </div> 
    );
}
 
export default Navigation;