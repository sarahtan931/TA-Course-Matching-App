import React, { Component, useState } from "react";
import CsvDownload from 'react-json-to-csv';
const fs = require('fs');
let json2xls = require('json2xls');
const filename = 'sample.xlsx';


export default class GenerateReqPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.data = [{
            "code":"ece123",
            "question 1": "Are you familiar with javascript?",
            "question 2": "Are you busy on weekends?",
            "question 3": "",
            "qualification 1": "Degree in Engineering.",
            "qualification 2": "",
            "qualification 3": "",
        },
        {
            "code":"ece456",
            "question 1": "Are you familiar with javascript?",
            "question 2": "Do you understand OOP",
            "question 3": "",
            "qualification 1": "Degree in Engineering.",
            "qualification 2": "",
            "qualification 3": "",
        },
        {
            "code":"ece789",
            "question 1": "Are you familiar with javascript?",
            "question 2": "",
            "question 3": "",
            "qualification 1": "Degree in Engineering.",
            "qualification 2": "",
            "qualification 3": "",
        }]
        this.getCourses();
    }

    convert = () => {
        // let xls = json2xls(this.testData);
        // fs.writeFileSync(filename, xls, 'binary', (err) => {
        //     if (err) {
        //         console.log("writeFileSync :", err);
        //     }
        //     console.log( filename+" file is saved!");
        // });
        // console.log(this.data);
        console.log(this.data);
    }

    getCourses = () => {
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

                // this.changeData(data);
                this.data = data;
				document.getElementById("load").style.display = "none";
			})
			.catch((error) => {
				console.log("Error: ", error);
			});
    }

    // toJson = () => {
    //     let json = [];
    //     this.data.forEach(course => {
    //         let obj = {
    //             "code":course.code,
    //         };
    //         for (let i = 0; i < 3; i++ ) {
    //             obj["question" + i] = 
    //         }

    //     });
    // }

    render() {
        return (
            <>
                <button onClick={this.convert}>
                    Test
                </button>
                <CsvDownload data={this.data}/>
            </>
        )
    }
}