import React, { Component } from "react";
import LogoutButton from "../LogoutButton";
import MatchPage from './MatchPage';
import UploadPage from './UploadPage';
import RankPage from './RankPage';



export default class InstructorDashboard extends Component {

	state = {
		isMatchVisible: false,
		isUploadVisible: false,
		isRankVisible: false

	  }
	render() {

		// Check that the user is able to be on the page otherwise redirect
		if (
			localStorage.getItem("isAuth") != true &&
			localStorage.getItem("category") != "instructor"
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
						<h1 class="dashboard-header-title"> Course Instructor Dashboard</h1>
					</div>
					<div class="sidenav">
						<a onClick={() => this.setState({ isMatchVisible: true, isUploadVisible: false, isRankVisible: false }) }>Match</a>
						<a onClick={() => this.setState({ isMatchVisible: false, isUploadVisible: true, isRankVisible: false })} >Upload</a>
						<a onClick={() => this.setState({ isMatchVisible: false, isUploadVisible: false, isRankVisible: true })} >Rank</a>
						<a href="#hours">Change Hours</a>
						<a href="#register">Register User</a>
						
						<div class="logout-button">
							<LogoutButton></LogoutButton>
						</div>
						
					</div>
					<div class="dashboardcomp">
							{ this.state.isMatchVisible ? <MatchPage /> : null }
							{ this.state.isUploadVisible ? <UploadPage />: null }
							{ this.state.isRankVisible ? <RankPage />: null }
						</div>
					
				</div>
				
			);
		}
	}
}
