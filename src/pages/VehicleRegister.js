import React from 'react';
import { Redirect } from 'react-router-dom';
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

let states = {
	"AB":"Abia", "AD":"Adamawa", "AN":"Anambra", "AK":"Akwa Ibom" 
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
			geodata: {},
			errors: {},
			completed: false
		}

		this.getVal = this.getVal.bind(this);
		this.getLocation = this.getLocation.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}


	getVal(e){
		if(e.target.name === 'testscore'){
			let input = e.target.value;
			if(!Number.isNaN(input) && !isNaN(input)){
				this.setState({
					[e.target.name]: e.target.value
				});	
			}
		} else {
			this.setState({
				[e.target.name]: e.target.value
			});	
		}


		let errors = validate(e, this.state.errors);
		this.setState({ errors });
	}

	getLocation(e){
		let address = e.target.value;
		let latlong = {};
		if(address !== ''){
			this.setState({ appaddress: e.target.value });
			address = address.replace(' ', '+');
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCQYon3ANp3QhaGPizK6h3qB5Udx4pGTBs`)
			.then((data) => {
				latlong = data.data.results.geometry.location;
				//let lat = latlong.lat;
				//let long = latlong.lng;
				this.setState({ geodata: latlong });
			});
		}
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
		let { apptype, testscore, applocal, appaddress, isnew, geodata, errors } = this.state;
		
		if(this.state.completed){
			return <Redirect to="/myapplications" />;
		}

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
					
					<SelectDropDown
						label="State of Application"
						name="applocal"
						onChange={this.getVal}
						value={applocal}
						error={errors.applocal}
						options={states}
					/>

					<InputField
						label="Residential Address"
						type="text"
						name="appaddress"
						onChange={this.getLocation}
						value={appaddress}
						error={errors.appaddress}
					/>

					{geodata && <span>{`${geodata.lat}, ${geodata.long}`}</span>}
					<div className="form-group">
						<label htmlFor="isnew">
							Is this your first time requesting or a renewal?
						</label>
					</div>
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