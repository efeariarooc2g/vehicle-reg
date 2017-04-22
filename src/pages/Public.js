import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Login from './Login';

class Public extends React.Component{
	render(){
		console.log(this.props);
		return (
			<div className="container">
				<Navigation isLoggedin={this.props.isLoggedin} />

				<Route exact path="/" component={Login} />
				<Route path="/login" component={Login} />
			</div>
		);
	}
}

export default Public;