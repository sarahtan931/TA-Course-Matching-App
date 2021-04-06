import React, { Component } from "react";
import LogoutButton from "../LogoutButton";
import MatchPage from './MatchPage';
import CalcCourseHours from './CalcCourseHours';
import RegisterUser from './RegisterUser';
import ChangeUser from './ChangeUser'
import SaveTA from './SaveTA'
import AddCoursePage from './AddCoursePage';
import GenerateReqPage from './GenerateReqPage';

export default class EceAdminDashboard extends Component {

	state = {
		isMatchVisible: false,
		isHoursVisible: false,
		isRegisterVisible: false,
		isChangeVisible: false,
		isSaveTAVisible: false,
		isAddCoursePageVisible: false,
		isGenerateReqPageVisible: false
	  }
	render() {
		// Check that the user is able to be on the page otherwise redirect
		if (
			localStorage.getItem("isAuth") != true &&
			localStorage.getItem("category") != "admin"
		) {
			this.props.history.push("/"); // Redirect to the login page
			return (
				<div>
					<h1>Redirecting...</h1>
				</div>
			);
		} else {
			// Send them to the right page if they are authed
			return (
				<div>
					<div class="dashboard-nav-bar">
						<h1 class="dashboard-header-title"> ECE Admin Dashboard</h1>
					</div>
					<div class="sidenav">
						<a onClick={() => this.setState({ isMatchVisible: true, isHoursVisible:false,  isRegisterVisible: false, isChangeVisible: false, isSaveTAVisible: false, isAddCoursePageVisible: false, isGenerateReqPageVisible: false }) }>Match</a>
						<a onClick={() => this.setState({ isHoursVisible: true, isMatchVisible: false,  isRegisterVisible: false, isChangeVisible: false, isSaveTAVisible: false, isAddCoursePageVisible: false, isGenerateReqPageVisible: false }) }>Calculate Course Hours</a>
						<a onClick={() => this.setState({ isHoursVisible: false, isMatchVisible: false, isRegisterVisible: true, isChangeVisible: false, isSaveTAVisible: false, isAddCoursePageVisible: false, isGenerateReqPageVisible: false }) } >Register New User</a>
						<a onClick={() => this.setState({ isHoursVisible: false, isMatchVisible: false, isRegisterVisible: false, isChangeVisible: true, isSaveTAVisible: false, isAddCoursePageVisible: false, isGenerateReqPageVisible: false }) } >Edit TA</a>
						<a onClick={() => this.setState({ isHoursVisible: false, isMatchVisible: false, isRegisterVisible: false, isChangeVisible: false, isSaveTAVisible: true, isAddCoursePageVisible: false, isGenerateReqPageVisible: false }) } >Create/Save TAs</a>
						<a onClick={() => this.setState({ isHoursVisible: false, isMatchVisible: false, isRegisterVisible: false, isChangeVisible: false, isSaveTAVisible: false, isAddCoursePageVisible: true, isGenerateReqPageVisible: false }) } >Add Course</a>
						<a onClick={() => this.setState({ isHoursVisible: false, isMatchVisible: false, isRegisterVisible: false, isChangeVisible: false, isSaveTAVisible: false, isAddCoursePageVisible: false, isGenerateReqPageVisible: true }) } >Generate Requirements</a>
						<div class="logout-button">
							<LogoutButton></LogoutButton>
						</div>
						
					</div>
					<div class="dashboardcomp">
							{ this.state.isMatchVisible ? <MatchPage /> : null }
							{ this.state.isHoursVisible ? <CalcCourseHours/>: null}
							{ this.state.isRegisterVisible ? <RegisterUser/>: null}
							{ this.state.isChangeVisible ? <ChangeUser/>: null}
							{ this.state.isSaveTAVisible ? <SaveTA/>: null}
							{ this.state.isAddCoursePageVisible ? <AddCoursePage/>: null}
							{ this.state.isGenerateReqPageVisible ? <GenerateReqPage/>: null}
						</div>
					
				</div>
				
			);
		}
	}
}
