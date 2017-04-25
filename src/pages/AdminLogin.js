import React from 'react';
import axios from 'axios';
import SubmitButton from '../components/form/SubmitButton';

class AppReviewer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			verified: false
		};

		this.setReviewer = this.setReviewer.bind(this);
	}
	setReviewer(token){
		if(token){
			localStorage.setItem('reviewer', 'Y');
			localStorage.setItem('vehJwtToken', token);
			this.setState({ verified: true });
		}
	}
	componentWillMount(){
		// confirm as admin
		axios.get('/api/login/access/set').then((data) => {
			let token = data.data.token;
			this.setReviewer(token);
		});
	}

	render(){
		if(this.state.verified){
			return <Redirect to="/applications" />
		} else {	
			return (
				<div className="col-mod-9">
					Your Log in as a Reviewer was not successful. Please try again
				</div>
			);
		}
	}
}


export default AppReviewer;