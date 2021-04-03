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

	showMatches = () => {
		document.getElementById("load").style.display = "block";

		fetch("http://localhost:3000/api/getcourses", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3001",
			},
		})
			.then(async (response) => {
				const data = await response.json();

				if (!response.ok) {
					console.log("Error! Fix your Code!");
				}

				this.setState({ message: "Have Data", data: data });
				document.getElementById("load").style.display = "none";
			})
			.catch((error) => {
				this.setState({ errorMessage: error.toString() });
				console.log("Error: ", error);
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
