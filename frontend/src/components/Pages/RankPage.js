import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Course from "../Course"
let underscore = require("underscore");

export default class RankPage extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			message: "No Data",
			code: "",
			instructor: {},
			courses: {},
			tas: [],
		};	
	}	

	// let appsByCourse = underscore.groupBy(this.information, 'Course Code');

    // get instrucotr preferences
	getInstructor = () => {
		fetch(`http://localhost:3000/api/lstrawb@uwo.ca`)
			.then(async response => {
				const data = await response.json();
				this.state.instructor = data;
				let groupedData = underscore.groupBy(data[0].preference, 'code');

				let code = Object.keys(this.state.courses)[0];
				console.log(this.state.code);

				let tas = this.state.courses[this.state.code];
				console.log(this.state.tas);

				this.setState({ message: "Have Data", code: code, instructor: data, courses: groupedData, tas: tas})
			})
			.catch(error => {
				console.log("Error: " + error);
			}
		)		
	}

	switchCode = () => {
		// switch the current code
	}

	render () {
        return (
			<>
				<div>
					<button onClick={this.getInstructor}>
						Test
					</button>
					{this.state.code}
					{this.state.tas ? (
							<Course code={this.state.code} tas={this.state.tas}/>	
						) : ( 
							"No data"
						)
					}											
				</div>
						
			</>
        )
	}
}

