import React, { Component } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Course from "../Course"

export default class UploadPage extends Component {	

	render () {
		if (
			localStorage.getItem("isAuth") != true &&
			localStorage.getItem("category") != "instructor"
		) {
			this.props.history.push("/login"); // Redirect to the login page
			return (
				<div>
					<h1>Redirecting...</h1>
				</div>
			);
		} else {
		return (
			<>

            <div>		
				Upload Page		
			</div>
			
			</>			
		);
	}
}
}
