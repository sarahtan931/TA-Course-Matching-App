import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Course from "../Course"
import Button from "@material-ui/core/Button";

export default class MatchPage extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			message: "No Data",
			data: [],
		};	
	}	

	clearMatch = () => {
		fetch('http://localhost:3000/api/clearmatching', {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "http://localhost:3001"
		  },
		})

		this.setState({ message: "Cleared Matches", data: [] })
	  }

	getMatches = () => {

		document.getElementById("load").style.display = "block";

		fetch("http://localhost:3000/api/match")
			.then(async response => {
				const data = await response.json();

				if (!response.ok) {
					console.log("Error! Fix your Code!"); 
				}

				const filteredData = data.filter(course => {
					return course.instructors.includes('mcat@uwo.ca');
				})
				console.log(filteredData);
				console.log("Setting State");
				this.setState({ message: "Have Data", data: data })
				document.getElementById("load").style.display = "none";
			})
			.catch(error => {
				this.setState({ errorMessage: error.toString() });
				console.log("Error: ", error);
			})
		
		
	}

	render () {
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
				<h1>{window.localStorage.getItem('email')}</h1>		
				<Button type="submit"
				color="primary"
				value="Submit"
				variant="contained"
				size="large"
				fullWidth 
				onClick={this.getMatches}>
					Match
				</Button>
				<div class="loader" id="load"></div>
				<button 
				color="primary"
				value="Submit"
				variant="contained"
				size="large"
				fullWidth 
				id = "save" onClick = {this.clearMatch}>Clear Match</button>
				<div>
					{this.state.message}
				</div>					
			</div>
			{this.state.data.map(course => (		
				<Course code={course.code} tas={course.assigned}/>				
			))}	
			</>			
		);
	}
}
}
