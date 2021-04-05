import React, { Component, useState } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { forEach } from "underscore";
var underscore = require("underscore");


class AddCoursePage extends Component {

  SAVE = '<Button id = "save">Save</Button>';

    constructor(props){
        super(props);
        this.state = {
            allInstructors: [],
            courseInstructors: [],
            hours: 0,
            instructor: "",
            course: "",
            code: "",
        };	
        this.getCourses();
    }  

    getCourses() {
        fetch("http://localhost:3000/api/getinstructors", {
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

				this.setState({ allInstructors: data });
				document.getElementById("load").style.display = "none";
			})
			.catch((error) => {
				this.setState({ errorMessage: error.toString() });
				console.log("Error: ", error);
			});
    }

    createSelectItems() {
        let items = [];         
        for (let i = 0; i < this.state.allInstructors.length; i++) {             
            items.push(<option key={this.state.allInstructors[i].email} value={this.state.allInstructors[i].email}>{this.state.allInstructors[i].email}</option>);   
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }  

    addInstructor = () => {
        this.state.courseInstructors.push(this.state.instructor);
        this.state.courseInstructors = this.state.courseInstructors.filter((value, index) => this.state.courseInstructors.indexOf(value) === index);

        console.log(this.state.instructor);
    }

    handleDropChange = (event) => {
        this.state.instructor = event.target.value;
        console.log(this.state.instructor);
    }

    handleInputChangeCode = (event) => {
		this.state.code = event.target.value;
	};

    handleInputChangeHour = (event) => {
        this.state.hours = event.target.value;
    };

    save = () => {
        // TODO: update the course and save to database
        console.log(this.state.courses);

        fetch("http://localhost:3000/api/fillcourse", {
			// Creates a post call with the state info
			method: "POST",
			body: JSON.stringify({
                code: this.state.code,
                hours: this.state.hours,
                instructors: this.state.courseInstructors,
              }),
			headers: {
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3001",
			},
		})
    };

    render(){
        return (
            <>
                <div>
                    Add Course Page
                    Instructors: <select onChange={this.handleDropChange}>
                        {this.createSelectItems()}
                    </select>
                    <button onClick={this.addInstructor}>Add</button>
                </div>
                <div>
                    Course Code:
                    <input type="text" onChange={this.handleInputChangeCode}/>
                </div>
                <div>
                    Hours:
                    <input type="text" onChange={this.handleInputChangeHour}/>
                </div>
                <div>
                    <button onClick={this.save}>Save</button>
                </div>
            </>
        )
    
    }
}

export default AddCoursePage;