import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class LoginExample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
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
				<form onSubmit={this.onSubmit} >
					<h1>Login</h1>
					<TextField
						type="email"
						name="email"
						placeholder="Enter email"
						variant="outlined"
						value={this.state.email}
						onChange={this.handleInputChange}
						required
					/>
					<TextField
						type="password"
						name="password"
						placeholder="Enter password"
						variant="outlined"
						value={this.state.password}
						onChange={this.handleInputChange}
						required
					/>
					<Button type="submit" value="Submit" variant="contained" color="primary" href="/">Sign In</Button> 
				</form>
		);
	}
}
