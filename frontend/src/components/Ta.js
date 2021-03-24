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
     
        </div>
        );
    }

  export default Ta


