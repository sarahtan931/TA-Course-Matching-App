import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";

export default class RegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			activationKey: "",
			password: "",
			passwordConfirm: "",
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
