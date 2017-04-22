import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Registrant from './Registrant';
import Welcome from './Welcome';
import Login from './Login';
import UserProfile from './UserProfile';

class Main extends React.Component{
	render(){
		let props = this.props;
		return (
			<div className="container">
				<Navigation {...props} />
				<Route path="/signup" component={Registrant} />
				<Route path="/welcome" component={Welcome} />
				<Route path="/adminregister" component={Registrant} />
				<Route path="/UserProfile" component={UserProfile} />
				<Route path="/VehicleRegister" component={Welcome} />
				<Route path="/Applcations" component={Login} />
			</div>
		);
	}
}

export default Main;