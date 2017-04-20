import React from 'react';
import { Link } from 'react-router-dom';
import isAuthenticated from '../funcs/authentic';

class Navigation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isAuthenticated: false
		}
	}
	componentDidMount(){
		let auth = isAuthenticated();
		this.setState({ isAuthenticated: auth  });
	}
	render () {
		let links = '';

		if(this.state.isAuthenticated){
			links = (
	        <ul className="nav navbar-nav navbar-right">
	          <li><Link to="/home">Home</Link></li>
	          <li><a onClick={this.logOut}>Logout</a></li>
	        </ul>
	      );
	    } else {
	      links = (
	        <ul className="nav navbar-nav navbar-right">
	          <li><Link to="/signup">Sign up</Link></li>
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