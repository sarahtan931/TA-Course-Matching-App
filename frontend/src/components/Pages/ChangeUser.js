import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField"

export default class ManageTA extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "No Data",
			data: [],
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
					<div class="change-TA-form">
						<form noValidate autoComplete="off">
							<TextField id="standard-basic" fullWidth label="TA Email" />
                            <br></br>
							<TextField id="standard-basic" fullWidth label="Course Code"/>
                            <br></br>
							<TextField id="standard-basic" fullWidth label="Hours (Week)"/>
                            <br></br>
                            <a class="spacingline"> </a>
                            <br></br>
							<Button
								type="submit"
								color="primary"
								value="Submit"
								variant="contained"
								size="large"
								style={{
									backgroundColor: "#FFA62B",
								}}
							> Submit </Button>
						</form>
					</div>
				</>
			);
		}
	}
}
