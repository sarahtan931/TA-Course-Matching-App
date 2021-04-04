import React, { Component, useState } from "react";
import * as XLSX from "xlsx";
import * as ReactBootStrap from "react-bootstrap";
import { render } from "@testing-library/react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import ReactToExcel from 'react-html-table-to-excel';
import Button from "@material-ui/core/Button";
import { forEach } from "underscore";
var underscore = require("underscore");


class UploadPage extends Component {

  SAVE = '<Button id = "save">Save</Button>';

    constructor(props){
        super(props);
        // this.getCourses();
        this.state = {
            courses: [],
        };
        this.getCourses();	
    }  

    getCourses() {
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

				this.setState({ courses: data });
				document.getElementById("load").style.display = "none";
			})
			.catch((error) => {
				this.setState({ errorMessage: error.toString() });
				console.log("Error: ", error);
			});
    }

    createSelectItems() {
        let items = [];         
        for (let i = 0; i < this.state.courses.length; i++) {             
            items.push(<option key={this.state.courses[i]} value={this.state.courses[i]}>{this.state.courses[i]}</option>);   
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }  

  render(){
    return (
        <>
            <div>
                Requirements Page
                Courses: <select>
                    {this.createSelectItems()}
                </select>
            </div>
        </>
    )
   
  }
}

export default UploadPage;