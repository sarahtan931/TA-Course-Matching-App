import React, { Component, useState } from "react";
import * as XLSX from "xlsx";
import * as ReactBootStrap from "react-bootstrap";
import { render } from "@testing-library/react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import ReactToExcel from 'react-html-table-to-excel';
var underscore = require("underscore");


class CalcCourseHours extends Component {

  SAVE = '<button id = "save">Save</button>';

  constructor(props){
    super(props);
    this.headers = [];
    this.information = [];
    this.newinfo = [];
    this.sort = [];
    this.final = [];
    this.flag = false;
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
      return '<tr><td>' + oneObject['Course Code'] +'</td><td>'+ oneObject['Lab/tutorial Hours'] + '</td><td>'+ oneObject['Previous Enrollments'] + '</td><td>'+ oneObject['Previous TA hours'] + '</td><td>'+ oneObject['Current Enrollements '] + '</td></tr>';
    });
    return s.toString().replace(/,/g,"");
  }

  calcHours = () => {
  
      let s = this.information.map((oneObject) =>{
          let hours  = (oneObject['Previous TA hours'] / oneObject['Previous Enrollments'] ) * oneObject['Current Enrollements '];
        return '<tr><td>' + oneObject['Course Code'] +'</td><td>'+ oneObject['Lab/tutorial Hours'] + '</td><td>'+ oneObject['Previous Enrollments'] + '</td><td>'+ oneObject['Previous TA hours'] + '</td><td>'+ oneObject['Current Enrollements '] +  '</td><td>' + hours + '</td></tr>';
      });

      let newbody = this.information.map((oneObject) => {
        let hours  = (oneObject['Previous TA hours'] / oneObject['Previous Enrollments'] ) * oneObject['Current Enrollements '];
        let obj = {
            'code': oneObject["Course Code"],
            'ta_hours_old': oneObject['Previous TA hours'],
            'ta_hours_new': hours,
            'enroll_old': oneObject['Previous Enrollments'],
            'enroll_new': oneObject['Current Enrollements ']
            //'Hours': hours
        }
        return obj
      })
      document.getElementById('body').innerHTML = s.toString().replace(/,/g,"");
      console.log(this.information)
      this.newinfo = newbody;
      console.log('The new body')
      console.log(this.newinfo);
   
  }

  save = () => {

   // for (var course in this.newinfo) {
    this.newinfo.forEach(app => {
        let body = {
            code: app["code"],
            ta_hours_old: app['ta_hours_old'],
            ta_hours_new: app['ta_hours_new'],
            enroll_old: app['enroll_old'],
            enroll_new: app['enroll_new']
        }
        console.log('information')
        console.log(body)
        fetch("http://localhost:3000/api/saveHours", {
            // Creates a post call with the state info
        method: "POST",
        body: JSON.stringify(body),
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001"
          },
        })
      });
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
        </div>
        <ReactToExcel className='btn' table = 'excelTable' fileName = 'excelFile' sheet = 'sheet 1' buttonText = 'Export Table as Excel'/>
      </div>
    );
  }
}
}
export default CalcCourseHours;