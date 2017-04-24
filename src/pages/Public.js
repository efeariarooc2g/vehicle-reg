import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Login from './Login';

class Public extends React.Component{
	render(){
		console.log(this.props);
		return (
			<div className="container">
				<Navigation isLoggedin={this.props.isLoggedin} />

				<Route path="/" render={() => {
					return (this.context.router.history.location.pathname !== '/login') ? <Redirect to="/login" />: <Login />;
				}} />
			</div>
		);
	}
}

Public.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Public;