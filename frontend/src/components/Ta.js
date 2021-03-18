import { render } from "@testing-library/react"
import { Component } from "react"
import * as ReactBootStrap from "react-bootstrap";

/*class Ta extends Component{

    constructor(props){
        super(props);
        this.headers = [];
        this.information = [];
        this.sort = [];
        this.final = [];
        this.flag = false;
        this.courses = ['SE123','SE'];
      }
    
  

    render(){
      return (
        <div>
        <ReactBootStrap.Table id ="excelTable" className="table table-dark">
            <thead id = "head">
                <th></th>
            </thead>
            <tbody id = "body">

            </tbody>
        </ReactBootStrap.Table>
        </div>
        );
 
}
*/
const Ta = ({ ta }) => {
    //document.getElementById('head').innerHTML = '<th>Name</th><th>Hours</th>'
    return (
        <div>
        Name: {ta.name}, 
        Hours: {ta.hours},
        Rank: <select id><option value = "1">1</option><option value = "2">2</option><option value = "3">3</option><option value = "4">4</option><option value = "5">5</option><option value = "6">6</option><option value = "7">7</option><option value = "8">8</option><option value = "9">9</option><option value = "10">10</option></select>
        </div>
        );
    }

  export default Ta


