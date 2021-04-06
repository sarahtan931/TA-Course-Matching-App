import React from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import MatchPage from './Pages/MatchPage';
import UploadPage from './Pages/UploadPage';
import InstructorDashboard from './Pages/InstructorDashboard';
import EceAdminDashboard from './Pages/EceAdminDashboard';
import ChairDashboard from './Pages/ChairDashboard';
import RankPage from './Pages/RankPage';
import RequirementsPage from './Pages/RequirementsPage';
import AddCoursePage from './Pages/AddCoursePage';
import GenerateReqPage from './Pages/GenerateReqPage';
 
const Navigation = () => {
    return (
      <div id="Redirect-Bar">
      <BrowserRouter>
      <ul class="nav-ul">
        <li class="nav-li"><Link to="/">Login</Link></li>
        <li class="nav-li"><Link to="/contact">Contact</Link></li>
        <li class="nav-li"><Link to="/register">Register</Link></li>
        <li class="nav-li"><Link to="/instructor-dashboard">Instructor Dashboard</Link></li>
        <li class="nav-li"><Link to="/eceadmin-dashboard">ECE Admin Dashboard</Link></li>
        <li class="nav-li"><Link to="/chair-dashboard">Chair Dashboard</Link></li>
      </ul>

      <Switch>
           <Route path="/" component={LoginPage} exact/>
           <Route path="/contact" component={ContactPage} exact/>
           <Route path="/register" component={RegisterPage} exact/>
           <Route path="/match" component={MatchPage} exact/>
           <Route path="/instructor-dashboard" component={InstructorDashboard} exact/>
           <Route path='/eceadmin-dashboard' component={EceAdminDashboard}/>
           <Route path="/upload" component={UploadPage} exact/>
           <Route path="/rank" component={RankPage} exact/>
           <Route path="/requirements" component={RequirementsPage} exact/>
           <Route path="/addcourse" component={AddCoursePage} exact/>
           <Route path="/generatereq" component={GenerateReqPage} exact/>
           <Route path="/chair-dashboard" component={ChairDashboard} exact/>
      </Switch>
      </BrowserRouter>
      </div> 
    );
}
 
export default Navigation;