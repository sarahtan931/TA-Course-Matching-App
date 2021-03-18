import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Course from "../Course"

export default class RankPage extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			message: "No Data",
			data: [],
		};	
	}	

    // get instrucotr preferences
	getInstructor = () => {
		fetch(`http://localhost:3000/api/lstrawb@uwo.ca`)
			.then(async response => {
				const data = await response.json();
				console.log(data);
			})
			.catch(error => {
				console.log("Error: " + error);
			})
		
		
	}

	render () {
        return (
            <div>
                <button onClick={this.getInstructor}>
					Test
				</button>
            </div>
        )
	}
}

