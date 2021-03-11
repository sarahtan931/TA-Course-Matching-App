import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, withRouter } from "react-router-dom";

class LoginPage extends Component {
	constructor(props) {
		super(props);
		// Create the state that is sent to DB
		this.state = {
			email: "",
			password: "",
		};
	}

	// On input events the states are set to what has been entered
	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};

	onSubmit = (event) => {
		// Prevent page refresh
		event.preventDefault();
		fetch("http://localhost:3000/api/login", {
			// Creates a post call with the state info
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					// If the response is successful
					res.json().then(
						function (data) {
							// Set all local storage to returned values from DB. Allows them to be accessed from anywhere
							localStorage.setItem("isAuth", true);
							localStorage.setItem("token", data.token);
							localStorage.setItem("email", data.email);
							localStorage.setItem("category", data.category);
							// Routes the logged in user to the proper dashboard based on their catagort in the DB
							if (data.category == "instructor") {
								// Route to the instructor dashboard
								this.props.history.push("/instructor-dashboard");
							} else if (data.category == "admin") {
								//route to chair dashboard
								this.props.history.push("/eceadmin-dashboard");
							} else {
								//route to ece admin dashboard
								this.props.history.push("/contact");
							}
						}.bind(this)
					); // Needed to bind this to the non arrow func
				} else {
					// If not sucessful
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				// Improper email / password handler
				console.error(err);
				alert("Please input the your correct password and email");
			});
	};

	render() {
		// Returns the login page and serves it
		return (
			<div>
				<div class="login-left">
					<h1 class="main-title">TA Matching Application</h1>
					<div class="login-bottom-text">
						<Link
							to="/contact"
							style={{
								color: "#FFA62B",
							}}
						>
							Contact Us
						</Link>
					</div>
				</div>
				<div class="login-right">
					<h1 class="login-title">Login</h1>
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
									type="password"
									name="password"
									placeholder="Enter password"
									variant="outlined"
									value={this.state.password}
									onChange={this.handleInputChange}
									required
								/>
							</div>
							<div class="login-fields">
								<LoginButton></LoginButton>
							</div>
						</div>
					</form>
					<div class="login-mini-text">
						<p>
							<Link to="/">Forget Password?</Link>
						</p>
						<p>
							<Link to="/register">Sign Up</Link>
						</p>
					</div>
					<p class="trademark-mini-text">Copyright @ its_works_locally 2021.</p>
				</div>
			</div>
		);
	}
}

export default withRouter(LoginPage);
