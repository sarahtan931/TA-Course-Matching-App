import React, { Component } from "react";
import Button from "@material-ui/core/Button";


class RequirementsPage extends Component {

  SAVE = '<Button id = "save">Save</Button>';

    constructor(props){
        super(props);
        this.state = {
            courses: [],
            course: "",
            questions: [],
            question: "",
            qualifications: [],
            qualification: "",
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
        console.log(this.state.questions);
    }

    addQualification = () => {
        this.state.qualifications.push(this.state.qualification);
        console.log(this.state.qualification);
    }

    handleDropChange = (event) => {
        this.state.course = event.target.value;
        console.log(this.state.course);
    }

    handleInputChangeQuestion = (event) => {
		this.state.question = event.target.value;
	};

    handleInputChangeQualification = (event) => {
        this.state.qualification = event.target.value;
    };

    saveQuestions = () => {
        // TODO: update the course and save to database
        console.log(this.state.courses);

        fetch("http://localhost:3000/api/courseinfo", {
			// Creates a post call with the state info
			method: "POST",
			body: JSON.stringify({
                course: this.state.course,
                questions: this.state.questions,
                qualifications: this.state.qualifications,
              }),
			headers: {
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3001",
			},
		})
    };

    render(){
        return (
            <div class="accept-reject-card">
                <h1 class="manage-TA-title">Requirements Questions</h1>
                <div>
                    Requirements Page
                    Courses: <select onChange={this.handleDropChange}>
                        {this.createSelectItems()}
                    </select>
                </div>
                <div>
                    Question: 
                    <input type="text" onChange={this.handleInputChangeQuestion}/>
                    <button onClick={this.addQuestion}>Add</button>
                </div>
                <div>
                    Qualifications: 
                    <input type="text" onChange={this.handleInputChangeQualification}/>
                    <button onClick={this.addQualification}>Add</button>
                </div>
                <div>
                    <ul className="list-group">
                        {this.state.questions.map(listitem => (
                            <li>{listitem}</li>
                        ))}
                    </ul>
                </div>
                <div>
                <Button
                    type="submit"
                    color="primary"
                    value="Submit"
                    variant="contained"
                    fullWidth
                    onClick={this.saveQuestions}
                    style={{
                        backgroundColor: "#FFA62B",
                    }}
                >
                    Save
                </Button>
                </div>
            </div>
        )
    
    }
}

export default RequirementsPage;