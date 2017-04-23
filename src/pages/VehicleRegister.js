import React from 'react';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import InputField from '../components/form/InputField';
import SelectDropDown from '../components/form/SelectDropDown';
import RadioButton from '../components/form/RadioButton';
import SubmitButton from '../components/form/SubmitButton';
import validate from '../components/form/validate';
//import { states, genders } from '../../config';

let apptypelist = {
	"CM":"Commercial", "AR":"Articulated", "PR":"Private", "BK":"Motorcycle" 
};

class VehicleReg extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			apptype: '', 
			testscore: '', 
			applocal: '', 
			appaddress: '', 
			isnew: '', 
			errors: {}
		}

		this.getVal = this.getVal.bind(this);
		this.getLocation = this.getLocation.bind(this);
		this.submitForm = this.submitForm.bind(this);
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
				({ data }) => {
					this.setState({ errors });
				});
		} else {
			this.setState({ errors });
		}

	}

	render() {
		let { apptype, testscore, applocal, appaddress, isnew, errors } = this.state;
		
		return (
			<div className="col-md-4 col-md-offset-4">
				<form onSubmit={this.submitForm} >
					<h2>Vehicle Registration</h2>
					<SelectDropDown
						label="Application Type"
						name="apptype"
						onChange={this.getVal}
						value={apptype}
						error={errors.apptype}
						options={apptypelist}
					/>
					<InputField
						label="Test Score"
						type="number"
						name="testscore"
						onChange={this.getVal}
						value={testscore}
						error={errors.testscore}
					/>
					
					<InputField
						label="Location of Application"
						type="text"
						name="applocal"
						onChange={this.getVal}
						value={applocal}
						error={errors.applocal}
					/>
					<InputField
						label="Residential Address"
						type="text"
						name="appaddress"
						onChange={this.getLocation}
						value={appaddress}
						error={errors.appaddress}
					/>
					<RadioButton
						label="First Time"
						type="radio"
						name="isnew"
						id="firsttime"
						onChange={this.getVal}
						value={isnew}
						error={errors.isnew}
					/>
					
					<RadioButton
						label="Renewal"
						type="radio"
						name="isnew"
						onChange={this.getVal}
						value={isnew}
						error={errors.isnew}
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

export default VehicleReg;