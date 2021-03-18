import React, { Component, useState } from "react";
import * as XLSX from "xlsx";
import * as ReactBootStrap from "react-bootstrap";
import { render } from "@testing-library/react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import ReactToExcel from 'react-html-table-to-excel';
import Button from "@material-ui/core/Button";
var underscore = require("underscore");


class UploadPage extends Component {

  SAVE = '<Button id = "save">Save</Button>';

  constructor(props){
    super(props);
    this.headers = [];
    this.information = [];
    this.sort = [];
    this.final = [];
    this.flag = false;
    this.courses = ['SE123','SE'];
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
    let str = x.toString() + '<th>Ranking</th>';
    return str.replace(/,/g,"");
  }

  renderBody = () => {

    this.sort = this.information.sort( function(a ,b){
      if(a['Applicant status ( 1- Fundable, 2-NotFundable,3-External)'] > b['Applicant status ( 1- Fundable, 2-NotFundable,3-External)']) return 1;
      if(a['Applicant status ( 1- Fundable, 2-NotFundable,3-External)'] < b['Applicant status ( 1- Fundable, 2-NotFundable,3-External)']) return -1;
      return 0;
    });

    let s = this.sort.map((oneObject, index) =>{
      return '<tr><td>' + oneObject['Course Code'] +'</td><td>'+ oneObject['Applicant Name'] + '</td><td>'+ oneObject['Applicant Email'] + '</td><td>'+ oneObject['Applicant status ( 1-Fundable, 2-NotFundable, 3-External)'] + '</td><td>'+ oneObject['Q1'] + '</td><td>'+ oneObject['A1'] + '</td><td>'+ oneObject['Q2'] + '</td><td>'+ oneObject['A2'] + '</td><td>'+ oneObject['Q3'] + '</td><td>'+ oneObject['A3'] + '</td><td><select id = "'+index+'"><option value = "1">1</option><option value = "2">2</option><option value = "3">3</option><option value = "4">4</option><option value = "5">5</option><option value = "6">6</option><option value = "7">7</option><option value = "8">8</option><option value = "9">9</option><option value = "10">10</option></select></td></tr>';
    });
    return s.toString().replace(/,/g,"");
  }


  save = () => {
    let s = this.information.map((oneObject, index) =>{
      return '<tr><td>' + oneObject['Course Code'] +'</td><td>'+ oneObject['Applicant Name'] + '</td><td>'+ oneObject['Applicant Email'] + '</td><td>'+ oneObject['Applicant status ( 1-Fundable, 2-NotFundable, 3-External)'] + '</td><td>'+ oneObject['Q1'] + '</td><td>'+ oneObject['A1'] + '</td><td>'+ oneObject['Q2'] + '</td><td>'+ oneObject['A2'] + '</td><td>'+ oneObject['Q3'] + '</td><td>'+ oneObject['A3'] + '</td><td>' + document.getElementById(index.toString()).value + '</td></tr>'
    });
    document.getElementById('body').innerHTML = s.toString().replace(/,/g,"");

    console.log(this.information);
    let appsByCourse = underscore.groupBy(this.information, 'Course Code');
    console.log(appsByCourse);
    for (var course in appsByCourse) {
          appsByCourse[course].forEach(app => {
            fetch("http://localhost:3000/api/save", {
            // Creates a post call with the state info
            method: "POST",
            body: JSON.stringify({
              code: app["Course Code"],
              name: app["Applicant Name"] ,
              email: app["Applicant email"] ,
              rank: 0
            }),
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001"
          },
        })
      });
    };

    
  } 

  render(){

    if (
			localStorage.getItem("isAuth") != true &&
			localStorage.getItem("category") != "instructor"
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
        class="button-download"
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
          <button color="primary"
          class="button-download"
          id = "save" onClick = {this.save}>Save</button>
        </div>
        <ReactToExcel table = 'excelTable' fileName = 'excelFile' sheet = 'sheet 1' buttonText = 'Export Table as Excel'/>
      </div>
    );
  }
}
}
export default UploadPage;