import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		)
	}
}

class EmployeeList extends React.Component{
	render() {
		var employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{employees}</tbody>
        </table>
      </div>
			
		)
	}
}

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	componentDidMount() {
		
    var $that = this;
    fetch('http://localhost:8081/api/employees').then(function(response) {
      // $that.setState({employees: response.entity._embedded.employees});
      return response.json();
    }).then(function(res){
      $that.setState({employees: res._embedded.employees});
      // console.log(res._embedded.employees);
    })
	}

	render() {
		return (
			<EmployeeList employees={this.state.employees}/>
		)
	}
}

export default App;
