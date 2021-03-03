import React, { Component } from "react";
import LogoutButton from "../LogoutButton";

export default class InstructorDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			subject: "",
			message: "",
		};
	}

	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};

	onSubmit = (event) => {
		event.preventDefault();
		fetch("/api/auth", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					this.props.history.push("/");
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Error logging in please try again");
			});
	};

	render() {
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
