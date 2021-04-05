import React, { Component } from "react";
import Course from "../Course";
import Button from "@material-ui/core/Button";

export default class MatchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "No Data",
			data: [],
			instructor: true,
		};
	}

	setCategory(event) {
		this.setState({ instructor: event.target.value });
	}

	clearMatch = () => {
		fetch("http://localhost:3000/api/clearmatching", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3001",
			},
		});

		this.setState({ message: "Cleared Matches", data: [] });
	};

	getMatches = () => {
		document.getElementById("load").style.display = "block";

		fetch("http://localhost:3000/api/match", {
			method: "PUT",
			body: JSON.stringify({ instructor: this.state.instructor }),
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

				const filteredData = data.filter((course) => {
					return course.instructors.includes("mcat@uwo.ca");
				});
				console.log(filteredData);
				console.log("Setting State");
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
					<div class="accept-reject-card">
						<h1 class="manage-TA-title">User Preference</h1>
						<div onChange={this.setCategory.bind(this)}>
							<input type="radio" value="true" name="instructor" /> 
							<a class="small-text">Instructor</a>
							<input type="radio" value="false" name="instructor" />
							<a class="small-text">Teaching Assistant</a>
						</div>
						<Button
							type="submit"
							color="primary"
							value="Submit"
							variant="contained"
							size="large"
							onClick={this.getMatches}
							style={{
								backgroundColor: "#FFA62B",
							}}
						>
							Match
						</Button>
						<div class="loader" id="load"></div>
						<Button
							type="submit"
							color="primary"
							value="Submit"
							variant="contained"
							size="large"
							onClick={this.clearMatch}
							style={{
								backgroundColor: "#FFA62B",
							}}
						>
							Clear Matches
						</Button>
						<a class="small-text">{this.state.message}</a>
					</div>
					<div class="accept-reject-card">
						{this.state.data.map((course) => (
							<Course code={course.code} tas={course.assigned} />
						))}
					</div>
					
				</>
			);
		}
	}
}
