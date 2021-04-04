import React, { Component, useState } from "react";
import * as XLSX from "xlsx";
import * as ReactBootStrap from "react-bootstrap";
import { render } from "@testing-library/react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import ReactToExcel from 'react-html-table-to-excel';
var underscore = require("underscore");


class UploadTa extends Component {

  SAVE = '<button id = "save">Save</button>';

  constructor(props){
    super(props);
    this.headers = [];
    this.information = [];
    this.newinfo = [];
    this.sort = [];
    this.final = [];
    this.flag = false;
    this.state = {
			message: ""
		};	
    
  }

  readExcel = (file) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      let data = [];

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        data = XLSX.utils.sheet_to_json(ws); 
        console.log('consoling')
        console.log(data)
        this.headers = Object.keys(data[0]);
        this.information = data;
        document.getElementById("head").innerHTML = this.renderTableHeaders();
        document.getElementById('body').innerHTML = this.renderBody();
        this.flag = true;
      };
  };

  renderTableHeaders = () => {
    let x = this.headers.map((oneHead) =>{
      return '<th>' + oneHead + '</th>';
    });
    let str = x.toString() + '<th>Calculated Hours</th>';
    return str.replace(/,/g,"");
  }

  renderBody = () => {
    let s = this.information.map((oneObject) =>{
      return '<tr><td>' + oneObject['Course Code'] +'</td><td>'+ oneObject['Applicant Name'] + '</td><td>'+ oneObject['applicant email'] + '</td><td>'+ oneObject['Applicant status ( 1- Fundable, 2-NotFundable,3-External)'] + '</td><td>'+ oneObject['5or10 hrs'] + '</td></tr>' + oneObject['Course Rank'];
    });
    return s.toString().replace(/,/g,"");
  }

  save = () => {
        console.log('information')
        fetch("http://localhost:3000/api/saveHours", {
            // Creates a post call with the state info
        method: "PUT",
        body: JSON.stringify({"Courses": this.newinfo}),
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001"
          },
        })
      this.setState({ message: "Hours Saved"})
    }; 
 // } 

  render(){

    if (
			localStorage.getItem("isAuth") != true &&
			localStorage.getItem("category") != "admin"
		) {
			this.props.history.push("/"); // Redirect to the login page
			return (
				<div>
					<h1>Redirecting...</h1>
				</div>
			);
		} else {
    return(
      <div>
        <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          this.readExcel(file);
        }}/>
        <ReactBootStrap.Table id ="excelTable" className="table table-dark">
        <thead id = "head">
  
        </thead>
        <tbody id = "body">

        </tbody>
        </ReactBootStrap.Table>
        <div id = 'but'>
          <button id = "save" onClick = {this.calcHours}>Calculate Hours</button>
          <button id = "save" onClick = {this.save}>Save</button>
          <div>
					{this.state.message}
				</div>
        </div>
        <ReactToExcel className='btn' table = 'excelTable' fileName = 'excelFile' sheet = 'sheet 1' buttonText = 'Export Table as Excel'/>
      </div>
    );
  }
}
}
export default CalcCourseHours;