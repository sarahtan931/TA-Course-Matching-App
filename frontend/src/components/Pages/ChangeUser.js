import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class ManageTA extends Component {
	constructor(props) {
		super(props);
		this.state = {
            ta: "",
			course: "",
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
		fetch("http://localhost:3000/api/add_ta", {
			// Creates a post call with the state info
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					alert("Successfully changed");
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	render() {
		if (
			localStorage.getItem("isAuth") != true &&
			localStorage.getItem("category") == "instructor" 
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
										type="text"
										name="ta"
										placeholder="TA Email"
										variant="outlined"
										value={this.state.ta}
										onChange={this.handleInputChange}
										required
									/>
								</div>
								<div class="login-fields">
									<TextField
										fullWidth
										class="login-textfield"
										type="text"
										name="course"
										placeholder="Course Code"
										variant="outlined"
										value={this.state.course}
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
