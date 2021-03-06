import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class RegisterUser extends Component {
	constructor(props) {
		super(props);
		// Create the state model that will be send to DB
		this.state = {
			name: "",
			email: "",
			authenticationkey: "",
			password: "",
			category: "",
		};
	}

	setCategory(event) {
		this.setState({ category: event.target.value });
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
		console.log(this.state);
		event.preventDefault();
		fetch("http://localhost:3000/api/register", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					// If the auth is correct, redirect to login page
					//this.props.history.push("/");
					alert("New User Added");
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
			<div class="accept-reject-card">
				<h1 class="manage-TA-title">Add a New User</h1>
				<form onSubmit={this.onSubmit}>
					<TextField
						fullWidth
						class="login-textfield"
						type="name"
						name="name"
						placeholder="Enter New User's Name"
						variant="outlined"
						fullWidth
						value={this.state.name}
						onChange={this.handleInputChange}
						required
					/>
					<TextField
						fullWidth
						class="login-textfield"
						type="email"
						name="email"
						placeholder="Enter email"
						variant="outlined"
						fullWidth
						value={this.state.email}
						onChange={this.handleInputChange}
						required
					/>
					<div onChange={this.setCategory.bind(this)}>
						<input type="radio" value="admin" name="category" /> ECE Admin
						<input type="radio" value="instructor" name="category" /> Instructor
						<input type="radio" value="chair" name="category" /> Undergraduate
						Chair
					</div>
					<TextField
						fullWidth
						class="login-textfield"
						type="authenticationkey"
						name="authenticationkey"
						placeholder="Enter Authentication Key"
						variant="outlined"
						fullWidth
						value={this.state.authenticationkey}
						onChange={this.handleInputChange}
						required
					/>
					<Button
						type="submit"
						color="primary"
						value="Submit"
						variant="contained"
						size="large"
						fullWidth
						style={{
							backgroundColor: "#FFA62B",
						}}
					>
						Register User
					</Button>
				</form>
			</div>
		);
	}
}
