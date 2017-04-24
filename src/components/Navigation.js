import React from 'react';
import { Link } from 'react-router-dom';
//import isAuthenticated from '../funcs/authentic';

class Navigation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isAuthentic: false
		}

	}
	componentDidMount(){
		//let auth = false;//isAuthenticated();
		//this.setState({ isAuthentic: auth  });
		this.setState({ isAuthentic: this.props.isLoggedin });
	}

	logOut(){
		window.FB.logout((response) => {
			this.setState({ isAuthentic: false });
		});
	}
	render () {
		let links = '';

		if(this.state.isAuthentic){
			links = (
	        <ul className="nav navbar-nav navbar-right">
	          <li><Link to="/home">Home</Link></li>
	          <li><Link to="/myapplications">My Registrations</Link></li>
	          <li><Link to="/applications">All Registrations</Link></li>
	          <li><Link to="/signup">My Personal Data</Link></li>
	          <li><a onClick={this.logOut.bind(this)}>Logout</a></li>
	        </ul>
	      );
	    } else {
	      links = (
	        <ul className="nav navbar-nav navbar-right">
	          <li><Link to="/login">Login</Link></li>
	        </ul>
	      );
	    }
		return (
			<nav className="navbar navbar-default">
	          <div className="container-fluid">
	            <div className="navbar-header">
	              <a className="navbar-brand" href="#">Vehicle Register</a>
	            </div>
	            <div className="collapse navbar-collapse">
	              {links}
	            </div>
	          </div>
	        </nav>
		);
	}
}

export default Navigation;	