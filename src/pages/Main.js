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
				<Route path="/UserProfile" component={Registrant} />
				<Route path="/VehicleRegister" component={Welcome} />
				<Route path="/Applcations" component={Login} />
			</div>
		);
	}
}

export default Main;