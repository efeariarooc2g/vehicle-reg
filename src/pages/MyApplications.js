import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SubmitButton from '../components/form/SubmitButton';

class MyApplications extends React.Component{
	render(){
		let headings = ['Application Type', 
					'Test Tscore', 
					'Location of Application', 
					'Residentianl Address', 
					'New/Renewal',
					'Status',
				 ];
		return (
			<div className="col-mod-9">
				<h2>My Vehicle Applications</h2>
				<div className="btn btn-default btn-sm"><Link to="/application/new">New Application</Link></div>
				<table className="table striped-table">
					<Thead headings={headings} />
					<Table />
				</table>
			</div>
		);
	}
}

class Table extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
			pg_start: 0,
			pg_end: 0
		}

		this.deleteRow = this.deleteRow.bind(this);
	}
	componentDidMount(){
		axios.get('/api/myapplications')
		.then((data) => {
			let users = data.data;
			this.setState({ users });
			//let jwtdata = localStorage.getItem('sessionid');
		},
		({ response }) => {

		});
	}

	deleteRow(e){
		let idx = e.target.value;
		
		let users = this.state.users;
		if(users.length > 0 && typeof users[idx] !== undefined){
			let user = users[idx].id;
			axios.get(`/api/users/delete/${user}`)
			.then((data) => {
				let success = data.data.deleted;
				if(success === true){
					delete users[idx];
					this.setState({ users });
				}
			});
		}
	}

	render() {

		let rows = [];
			let userdata = this.state.users;
			if (userdata.length > 0) {
				
				userdata.forEach((user, idx) => {
					rows.push(<Row key={idx} 
						idx={idx} id={user.id} 
						username={user.username} 
						email={user.email} 
						deleteFn={this.deleteRow}
						/>);
				});
				return (
					<tbody>{rows}</tbody>
				);
			} else {
				return (
					<tbody>
						<tr>
							<td colSpan="6">No records found</td>
						</tr>
					</tbody>
				);
			}

	}
}

class Row extends React.Component {
	 render () {
	 	let sessionid = localStorage.getItem('sessionid');
	 	console.log(sessionid);
	 	console.log(localStorage);
	 	const { idx, id, username, email, deleteFn } = this.props;
	 	return (
	 		<tr key={idx}>
				<td>{id}</td>
				<td>{username}</td>
				<td>{email}</td>
				<td><Link to={`/application/edit/${id}`}><div className="btn btn-default btn-sm">Edit</div></Link></td>
				<td><SubmitButton type="button" classType="btn-default btn-sm" name="Delete" value={idx} ClickFn={deleteFn} /></td>
			</tr>
		);
	 }
}


 let Thead = ({ headings }) => {
 	let data = headings.map((heading, index) => {
 		return <td key={'head' + index}>{heading}</td>;
 	});

 	return (
 		<thead>
 		<tr key="head">
			{data}
		</tr>
		</thead>
	);
 }

Table.contextTypes = {
	router: React.PropTypes.object.isRequired
}
export default MyApplications;