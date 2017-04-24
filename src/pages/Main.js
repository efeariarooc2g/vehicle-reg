import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Registrant from './Registrant';
import VehicleRegister from './VehicleRegister';
import Application from './Application';
import MyApplications from './MyApplications';
import Applications from './Applications';

class Main extends React.Component{
	render(){
		let props = this.props;
		return (
			<div className="container">
				<Navigation {...props} />
				<Route path="/signup" component={Registrant} />
				
				<Route path="/adminregister" component={Registrant} />
				<Route exact path="/application" component={Application} />
				<Route path="/application/edit/:id" component={VehicleRegister} />
				<Route path="/application/new" component={VehicleRegister} />
				<Route path="/myapplications" component={MyApplications} />
				<Route path="/applications" component={Applications} />
			</div>
		);
	}
}

export default Main;