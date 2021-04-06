import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Course from "../Course"
let underscore = require("underscore");

class RankPage extends Component {	
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
	save = () => {
		this.state.tas.forEach((ta, index) => {
			ta.rank = document.getElementById(index.toString()).value;
		});
		this.state.instructor.preference = this.state.tas;
		
            fetch("http://localhost:3000/api/saveinstructor", {
            // Creates a post call with the state info
            method: "POST",
            body: JSON.stringify({
				instructor: this.state.instructor
			}
			),
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001"
          },
        });
		alert('Rankings Have Been Saved!');
	}
	
	render () {
        return (
			<>
				<div>
					<button onClick={this.getInstructor}>
						Rank TAs
					</button>
					{this.state.code}
					{this.state.tas ? (
							// <Course code={this.state.code} tas={this.state.tas}/>	
							<>
								<h3>{this.state.code}</h3>
								{this.state.tas.map((ta,index) => {		
									return(
									<div>
										Name: {ta.name}, 
										Hours: {ta.hours},
										Rank: <select id = {index.toString()} ><option value = "1">1</option><option value = "2">2</option><option value = "3">3</option><option value = "4">4</option><option value = "5">5</option><option value = "6">6</option><option value = "7">7</option><option value = "8">8</option><option value = "9">9</option><option value = "10">10</option></select>
									</div>
									);				
								})}
								<button onClick={this.save}>
									Save
								</button>
							</>	
						) : ( 
							"No data"
						)
					}											
				</div>
						
			</>
        )
	}
}
export default RankPage;

