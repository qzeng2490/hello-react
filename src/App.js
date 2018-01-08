import React, { Component } from 'react';
import { Table, Icon, Divider } from 'antd';
import './App.css';
import 'antd/dist/antd.css'


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
      // console.log($that.employees);
    })
	}

	render() {
    const columns = [{
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#">Add</a>
          <Divider type="vertical" />
          <a href="#">Delete</a>
          <Divider type="vertical" />
          <a href="#">Modify</a>
        </span>
      ),
    }];
    
    console.log(this.state.employees);

		return (
			<Table columns={columns} dataSource={this.state.employees} rowKey="id"/>
		)
	}
}

export default App;
