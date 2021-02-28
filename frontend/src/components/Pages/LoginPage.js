import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";

export default class LoginPage extends Component {
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
		console.log(this.state)
		fetch("http://localhost:3000/api/login", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					res.json().then(function(data) {
					localStorage.setItem('token', data.token);
					localStorage.setItem('email', data.email);
					localStorage.setItem('category', data.category);
					console.log('logged in');
					if(data.category == 'instructor'){
					//route to instructor page	
					}	
					else if(data.category == 'chair'){
					//route to chair dashboard
					}
					else{
					//route to ece admin dashboard
					}
					})
				
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Please input the your correct password and email");
			});
	};


		

	render() {
		return (
			<div>
				<div class="login-left">
					<h1 class="main-title">TA Matching Application</h1>
                    <div class="login-bottom-text">
                        <Link to="/" 
                            style={{
                            color: "#FFA62B",
                        }}>
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
							<Link to="/login">Forget Password?</Link>
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
