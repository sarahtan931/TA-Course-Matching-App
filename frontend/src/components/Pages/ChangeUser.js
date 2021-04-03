import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class ManageTA extends Component {
	constructor(props) {
		super(props);
		this.state = {
            email: "",
			code: "",
            hours: "",
			message: "No Data",
			data: []
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
			return (
				<>
					<div>
						<h1 class="manage-TA-title">Create and Update TA</h1>
						<div class="loader" id="load"></div>
					</div>
					<br></br>
					<div class="change-TA-form" onSubmit={this.onSubmit}>
						<form noValidate autoComplete="off">
							<div class="container">
								<div class="login-fields">
									<TextField
										fullWidth
										class="login-textfield"
										type="email"
										name="email"
										placeholder="TA Email"
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
										name="code"
										placeholder="Course Code"
										variant="outlined"
										value={this.state.code}
										onChange={this.handleInputChange}
										required
									/>
								</div>
								<div class="login-fields">
									<TextField
										fullWidth
										class="login-textfield"
										type="text"
										name="hours"
										placeholder="Hours (Week)"
										variant="outlined"
										value={this.state.hours}
										onChange={this.handleInputChange}
										required
									/>
								</div>
								<Button
									type="submit"
									color="primary"
									value="Submit"
									variant="contained"
									size="large"
									style={{
										backgroundColor: "#FFA62B",
									}}
								>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</>
			);
		}
	}
}
