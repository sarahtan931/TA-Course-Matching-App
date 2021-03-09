import React, { Component } from "react";
import ContactButton from "../ContactButton";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

export default class ContactPage extends Component {
	// ---------------------------------
	// This page is currently not set up
	// to handle any requests
	// ---------------------------------

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

	// Should not be calling / api. TO-DO
	onSubmit = (event) => {
		event.preventDefault();
		fetch("/", {
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
		// Render the contact page component
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
							Login
						</Link>
					</div>
				</div>
				<div class="login-right">
					<h1 class="login-title">Contact Us</h1>
					<form onSubmit={this.onSubmit}>
						<div class="container">
							<div class="login-fields">
								<TextField
									fullWidth
									class="login-textfield"
									type="email"
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
									placeholder="Subject"
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
									type="text"
									placeholder="Message"
									variant="outlined"
									style={{
										top: "10vh",
									}}
									value={this.state.password}
									onChange={this.handleInputChange}
									required
								/>
							</div>
							<div class="login-fields">
								<ContactButton></ContactButton>
							</div>
						</div>
					</form>
					<p class="trademark-mini-text">Copyright @ its_works_locally 2021.</p>
				</div>
			</div>
		);
	}
}
