import React, { Component } from "react";
import LogoutButton from "../LogoutButton";

export default class InstructorDashboard extends Component {
	render() {
		// Check that the user is able to be on the page otherwise redirect
		if (
			localStorage.getItem("isAuth") != true &&
			localStorage.getItem("category") != "instructor"
		) {
			this.props.history.push("/login"); // Redirect to the login page
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
						<a href="#file">Upload A File</a>
						<a href="#course">Search Courses</a>
						<a href="#hours">Change Hours</a>
						<a href="#register">Register User</a>
						<div class="logout-button">
							<LogoutButton></LogoutButton>
						</div>
					</div>
				</div>
			);
		}
	}
}
