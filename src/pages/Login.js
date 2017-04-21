
import React, { Component } from 'react';
import FBLoginButton from '../components/FBLoginButton';
import { Redirect } from 'react-router-dom';
import InputField from '../components/form/InputField';
import isEmpty from 'lodash/isEmpty';
import SubmitButton from '../components/form/SubmitButton';
import validate from '../components/form/validate';
//import isAuthenticated from '../funcs/authentic';
import axios from 'axios';

class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			username: '',
			password: '',
			errors: {},
			isLoggedin: false,
		};
		this.getVal = this.getVal.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	componentDidMount(){
		this.setState({ isLoggedin: false });
	}

	getVal(e){
		this.setState({
			[e.target.name]: e.target.value
		});

		let errors = validate(e, this.state.errors);
		this.setState({ errors });
	}

	setSession(token){
		if(!isEmpty(token)){
			localStorage.setItem('vehJwtToken', token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		}
	}

	submitForm(e){
		e.preventDefault();

		let { errors } = this.state;
		if(isEmpty(errors)){
			axios.post('/api/login', this.state)
			.then((data) => { 
				const token = data.data.token;
				console.log('Token');
				console.log(data.data);
				console.log(token);
				this.setSession(token);
				this.setState({ isLoggedin: true });
			},
			({ response }) => {
				errors = response.data;
				this.setState({ errors });
			});
		}
	}

	render(){
		if(this.state.isLoggedin){
			return <Redirect to="/home" />
		}
		const { username, password, errors } = this.state;

		//if(this.state.isLoggedin)
		return (
			<div className="row">
			<div className="col-md-4 col-md-offset-4">
			
			<form onSubmit={this.submitForm}>
				<h2>Login</h2>
				{ errors.error && <div className="alert alert-danger">{errors.error}</div> }
				<InputField
					name="username"
					label="Email"
					type="text"
					value={username}
					onChange={this.getVal}
					error={errors.username}
				/>
				<InputField
					name="password"
					label="Password"
					type="password"
					value={password}
					onChange={this.getVal}
					error={errors.password}
				/>

				<SubmitButton
					type="submit"
					name="Login"
				/>
			</form>
			</div>
			<div className="col-md-4 col-md-offset-4">
				
			<FBLoginButton />
			</div>
			</div>
		);
	}
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
}


export default Login;