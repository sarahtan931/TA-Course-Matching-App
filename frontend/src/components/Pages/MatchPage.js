import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Course from "../Course"

export default class MatchPage extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			message: "No Data",
			data: [],
		};	
	}	

	getMatches = () => {
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
				<button onClick={this.getMatches}>
					Match
				</button>
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
