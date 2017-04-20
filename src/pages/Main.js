import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Registrant from './Registrant';
import Welcome from './Welcome';
import Login from './Login';

class Main extends React.Component{
	render(){
		return (
			<div className="container">
				<Navigation />
				<Route path="/signup" component={Registrant} />
				<Route path="/welcome" component={Welcome} />
				<Route path="/login" component={Login} />
			</div>
		);
	}
}

export default Main;