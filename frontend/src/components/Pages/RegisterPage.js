import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

export default class RegisterPage extends Component {
	constructor(props) {
		super(props);
		// Create the state model that will be send to DB
		this.state = {
			email: "",
			activationKey: "",
			password: "",
			passwordConfirm: "",
		};
	}

	// When inputs change update the state variables
	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};

	// When the button is clicked this function is called on the form
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
					// If the auth is correct, redirect to login page
					this.props.history.push("/login");
				} else {
					// Throw errors
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				// More error handling, not specific just alerts
				console.error(err);
				alert("Error registering in please try again");
			});
	};

	render() {
		// Rendering the register page component
		return (
			<div>
				<div class="login-left">
					<h1 class="main-title">TA Matching Application</h1>
					<div class="login-bottom-text">
						<Link
							to="/"
							style={{
								color: "#FFA62B",
							}}
						>
							Contact Us
						</Link>
					</div>
				</div>
				<div class="login-right">
					<h1 class="login-title">Register</h1>
					<form onSubmit={this.onSubmit}>
						<div class="container">
							<div class="login-fields">
								<TextField
									fullWidth
									class="login-textfield"
									type="email"
									name="email"
									placeholder="Enter email"
									variant="outlined"
									value={this.state.email}
									onChange={this.handleInputChange}
									required
								/>
							</div>
							<div class="login-fields">
								<TextField
									fullWidth
									class="login-textfield"
									type="text"
									placeholder="Activation Key"
									variant="outlined"
									value={this.state.activationKey}
									onChange={this.handleInputChange}
									required
								/>
							</div>
							<div class="login-fields">
								<TextField
									fullWidth
									class="login-textfield"
									type="password"
									name="password"
									placeholder="New password"
									variant="outlined"
									value={this.state.password}
									onChange={this.handleInputChange}
									required
								/>
							</div>
							<div class="login-fields">
								<TextField
									fullWidth
									class="login-textfield"
									type="password"
									name="password"
									placeholder="Re-enter password"
									variant="outlined"
									value={this.state.passwordConfirm}
									onChange={this.handleInputChange}
									required
								/>
							</div>
							<div class="login-fields">
								<LoginButton></LoginButton>
							</div>
						</div>
					</form>
					<p class="trademark-mini-text">Copyright @ its_works_locally 2021.</p>
				</div>
			</div>
		);
	}
}
