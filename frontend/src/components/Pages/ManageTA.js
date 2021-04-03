import React, { Component } from "react";
import Course from "../Course";
import Button from "@material-ui/core/Button";

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
			localStorage.getItem("category") != "instructor"
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
						<h1 class="manage-TA-title">Manage TA's</h1>
						<button onClick={this.showMatches} class="manage-show-TA">Show TA's</button>
						<div class="loader" id="load"></div>
					</div>
					{this.state.data.map((data) => (
						<div class="accept-reject-card">
							<a class="accept-reject-header">{data.code}</a>
							{data.instructors.map((instruct) => (
								<div>
									<a class="accept-reject-sub-header">Professor: {instruct}</a>
								</div>
							))}
							<br></br>
							<a>
								{data.assigned.map((obj) => (
									<div>
										<a class="accept-reject-text">
											Name: {obj.name}, Accepted: {obj.accepted.toString()}, Hours: {obj.hours} per week
										</a>
										<br></br>
										<div class="accept-reject-buttons"> 
											<Button
											type="submit"
											color="primary"
											value="Submit"
											variant="contained"
											size="small"
											style={{
												backgroundColor: "#FFA62B",
											}}
										>
											Accept
										</Button>
										<Button
											type="submit"
											color="primary"
											value="Submit"
											variant="contained"
											size="small"
											style={{
												backgroundColor: "#FFA62B",
											}}
										>
											Reject
										</Button></div> 
										<br></br>
									</div>
								))}
							</a>
							<br></br>
						</div>
					))}
				</>
			);
		}
	}
}
