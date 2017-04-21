import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Registrant from './Registrant';
import Welcome from './Welcome';
import Login from './Login';

class Public extends React.Component{
	render(){
		return (
			<div className="container">
				<Navigation />

				<Route exact path="/" component={Login} />
				<Route path="/signup" component={Registrant} />
				<Route path="/welcome" component={Welcome} />
				<Route path="/adminregister" component={Registrant} />
				<Route path="/login" component={Login} />
			</div>
		);
	}
}

export default Public;