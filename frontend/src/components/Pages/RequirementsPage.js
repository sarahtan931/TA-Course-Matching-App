import React, { Component, useState } from "react";
import LoginButton from "../LoginButton";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
var underscore = require("underscore");


class UploadPage extends Component {

  SAVE = '<Button id = "save">Save</Button>';

    constructor(props){
        super(props);
        this.state = {
            courses: [],
            course: "",
            questions: [],
            question: ""
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
            items.push(<option key={this.state.courses[i].code} value={this.state.courses[i].code}>{this.state.courses[i].code}</option>);   
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }  

    addQuestion = () => {
        this.state.questions.push(this.state.question);
    }

    handleDropChange = (event) => {
        this.setState({course: event.target.value})
        console.log(this.state.course);
    }

    handleInputChange = (event) => {
		this.setState({question: event.target.value})
	};

    saveQuestions = () => {
        // TODO: update the course and save to database
    };

  render(){
    return (
        <>
            <div>
                Requirements Page
                Courses: <select onChange={this.handleDropChange}>
                    {this.createSelectItems()}
                </select>
            </div>
            <div>
                Question:
                <input type="text" onChange={this.handleInputChange}/>
                <button onClick={this.addQuestion}>Add</button>
            </div>
            <div>
                <button onClick={this.saveQuestions}>Save</button>
            </div>
        </>
    )
   
  }
}

export default UploadPage;