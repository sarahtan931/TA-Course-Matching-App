import React, { Component, useState } from "react";
import * as XLSX from "xlsx";
import * as ReactBootStrap from "react-bootstrap";
import { uniq } from "underscore";

class SaveTA extends Component {

  SAVE = '<button id = "save">Save</button>';

  constructor(props) {
    super(props);
    this.headers = [];
    this.information = [];
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

      this.headers = Object.keys(data[0]);
      this.information = data;
      document.getElementById("head").innerHTML = this.renderTableHeaders();
      document.getElementById('body').innerHTML = this.renderBody();
      this.flag = true;
    };
  };

  renderTableHeaders = () => {
    let x = this.headers.map((oneHead) => {
      return '<th>' + oneHead + '</th>';
    });
    let str = x.toString();
    return str.replace(/,/g, "");
  }

  renderBody = () => {

    this.sort = this.information.sort(function (a, b) {
      if (a['Applicant status ( 1- Fundable, 2-NotFundable,3-External)'] > b['Applicant status ( 1- Fundable, 2-NotFundable,3-External)']) return 1;
      if (a['Applicant status ( 1- Fundable, 2-NotFundable,3-External)'] < b['Applicant status ( 1- Fundable, 2-NotFundable,3-External)']) return -1;
      return 0;
    });

    let s = this.sort.map((oneObject, index) => {
      return '<tr><td>' + oneObject['Course Code'] + '</td><td>' + oneObject['Applicant Name'] + '</td><td>' + oneObject['applicant email'] + '</td><td>' + oneObject['Applicant status ( 1- Fundable, 2-NotFundable,3-External)'] + '</td><td>' + oneObject['5or10 hrs'] + '</td><td>' + oneObject['Course Rank'] + '</td><td>' + oneObject['Q1'] + '</td><td>' + oneObject['A1'] + '</td><td>' + oneObject['Q2'] + '</td><td>' + oneObject['A2'] + '</td><td>' + oneObject['Q3'] + '</td><td>' + oneObject['A3'] + '</td></tr>';
    });
    return s.toString().replace(/,/g, "");
  }

  save = () => {
    if (this.information == null || this.information.length == 0) {
      alert("You need to upload an excel file before saving!");
    }
    else {
      alert("TA applicants successfully saved to the database!");
      console.log(this.information);
<<<<<<< HEAD
      let Arr = []
      let experience = false;
      for (let i = 0; i < this.information.length; i++) {

        if (this.information[i]['5or10 hrs'] == 10) {
          experience = true
        }

        if (Arr.includes)
          Arr.push({
            "experience": experience,
            "priority": 1,
            "email": this.information[i]['applicant email'],
            "name": this.information[i]['Applicant Name'],
            "preference": []
          })

      }
      console.log(Arr)

      const map = {};
      let uniqueArray = [];
      Arr.forEach(el => {
        if (!map[JSON.stringify(el)]) {
          map[JSON.stringify(el)] = true;
          uniqueArray.push(el);
        }
      });
      console.log(uniqueArray);

      for (let j = 0; j < this.information.length; j++){
        let email =  this.information[j]['applicant email']
        let index = uniqueArray.findIndex(x => x.email == email)
        console.log('the index is', index)

        uniqueArray[index].preference.push({
          "code":this.information[j]['Course Code'],
          "rank": this.information[j]['Course Rank'],
          "answers": [this.information[j]['A1'],this.information[j]['A2']]


        })
      }
      uniqueArray = {"tas": uniqueArray}
      console.log(uniqueArray)

      fetch("http://localhost:3000/api/saveTAs", {
        method: "POST",
        body: JSON.stringify(uniqueArray),
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
      
=======
      //send this.information to database
      fetch("http://localhost:3000/api/saveTas", {
			method: "POST",
			body: JSON.stringify({
        //return '<tr><td>' + oneObject['Course Code'] +'</td><td>'+ oneObject['Applicant Name'] + '</td><td>'+
        // oneObject['applicant email'] + '</td><td>'+ oneObject['Applicant status ( 1- Fundable, 2-NotFundable,3-External)'] 
        //+ '</td><td>'+ oneObject['Q1'] + '</td><td>'+ oneObject['A1'] + '</td><td>'+ oneObject['Q2'] +
        // '</td><td>'+ oneObject['A2'] + '</td><td>'+ oneObject['Q3'] + '</td><td>'+ oneObject['A3'] + '</td></tr>';
              experience: oneObject["experience"],
              priority: oneObject["priority"] ,
              email: oneObject["applicant email"] ,
              name: oneObject["Applicant Name"] ,
              preference: oneObject["Applicant email"]
      }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					// If the auth is correct, redirect to login page
					//this.props.history.push("/");
					alert('New User Added')
				} else {
					// Throw errors
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				// More error handling, not specific just alerts
				console.error(err);
				alert("Error registering in please try again");
			});
>>>>>>> ee93c9e5f61c3c27aed1f6014b7fe8f4175f8b7c
    }
  }



  cancelBut = () => {
    this.information = [];
    document.getElementById("head").innerHTML = "";
    document.getElementById("body").innerHTML = "";
  }

  render() {
    return (
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            this.readExcel(file);
          }} />
        <ReactBootStrap.Table id="excelTable" className="table table-dark">
          <thead id="head">

          </thead>
          <tbody id="body">

          </tbody>
        </ReactBootStrap.Table>

        <div id='but'>
          <button id="save" onClick={this.save}>Save</button>
          <button id="cancel" onClick={this.cancelBut}>Cancel</button>
        </div>
      </div>
    );
  }
}
export default SaveTA;