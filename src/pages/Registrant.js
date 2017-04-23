import React from 'react';
//import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import axios from 'axios';
import InputField from '../components/form/InputField';
import SelectDropDown from '../components/form/SelectDropDown';
import SubmitButton from '../components/form/SubmitButton';
import validate from '../components/form/validate';
//import { states, genders } from '../../config';

let states = {
	"AB":"Abia", "AD":"Adamawa", "AN":"Anambra", "AK":"Akwa Ibom" 
};

let genders = {
	'Male': 'M', 'Female': 'F'
};

class Registrant extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			dob: '',
			address: '',
			gender: '',
			occupation: '',
			soo: '',
			isadmin: '',
			errors: {},
			completed: false
		}

		this.getVal = this.getVal.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	componentDidMount(){

		let isadmin = "N";
		if(this.props.match.path === 'adminregister'){
			isadmin = "Y";
			this.setState({ isadmin });
		}

		axios.get('/api/register')
		.then((data) => {
			let user = data.data;
			this.setState({ 
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				dob: user.dob,
				address: user.address,
				gender: user.gender,
				occupation: user.occupation,
				soo: user.soo 
			});
			//let jwtdata = localStorage.getItem('sessionid');
		},
		({ response }) => {

			let errors = this.state.errors;
			errors.nodata = response.data;
			this.setState({ errors });
		});
	}

	validateInput(){
		const { email, errors } = this.state;

		if(!Validator.isEmail(email)){
			errors.email = 'Your email address must be provided';
		}

		this.setState({ errors });
	}

	getVal(e){
		this.setState({
			[e.target.name]: e.target.value
		});
		let errors = validate(e, this.state.errors);
		this.setState({ errors });
	}

	submitForm(e){
		e.preventDefault();
		this.validateInput();
		let errors =  this.state.errors;

		if(isEmpty(errors)){
			axios({
			  method: 'post',
			  url: '/api/register',
			  data: this.state
			}).then(({ data }) => {
				if(data.success === true){
					//this.context.router.history.push('/welcome');
					this.setState({ completed: true })
				}
			},
				({ response }) => {
					let errors = response.data;
					this.setState({ errors });
				});
		} else {
			this.setState({ errors });
		}

	}

	render() {
		let { firstname, lastname, soo, dob, occupation, address, gender, email, errors, completed } = this.state;

		return (
			<div className="col-md-4 col-md-offset-4">
				<form onSubmit={this.submitForm} >
					<h2>Sign up</h2>
					{completed}
					{errors.nodata && <div className="alert alert-danger">Fill in the information below</div>}
					<InputField
						label="First Name"
						type="text"
						name="firstname"
						onChange={this.getVal}
						value={firstname}
						error={errors.firstname}
					/>
					
					<InputField
						label="Last Name"
						type="text"
						name="lastname"
						onChange={this.getVal}
						value={lastname}
						error={errors.lastname}
					/>
					<InputField
						label="Date of Birth"
						type="text"
						name="dob"
						onChange={this.getVal}
						value={dob}
						error={errors.dob}
					/>
					<InputField
						label="Residential Address"
						type="text"
						name="address"
						onChange={this.getVal}
						value={address}
						error={errors.address}
					/>
					<InputField
						label="Occupation"
						type="text"
						name="occupation"
						onChange={this.getVal}
						value={occupation}
						error={errors.occupation}
					/>

					<InputField
						label="Email"
						type="text"
						name="email"
						onChange={this.getVal}
						value={email}
						error={errors.email}
					/>
					<SelectDropDown
						label="State of Origin"
						name="soo"
						onChange={this.getVal}
						value={soo}
						error={errors.soo}
						options={states}
					/>
					<SelectDropDown
						label="Gender"
						name="gender"
						onChange={this.getVal}
						value={gender}
						error={errors.gender}
						options={genders}
					/>
					
					<SubmitButton 
						type="submit"
						name="Submit"
					/>
					
				</form>
			</div>
		);
	}
}

export default Registrant;