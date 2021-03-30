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

		fetch("http://localhost:3000/api/gettas", {
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
						<h1 class="manage-TA-title">Manage TA's</h1>
						<button onClick={this.showMatches}>Show TA's</button>
						<div class="loader" id="load"></div>
						<div>{this.state.message}</div>
					</div>
					{this.state.data.map((data) => (
						<div>
							<a>{data.email}</a>
							<br></br>
							<a>
								{data.preference.map((obj) => (
									<div>
										<a>
											{obj.code} : {obj.rank}
										</a>
										<br></br>
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
										</Button>
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
