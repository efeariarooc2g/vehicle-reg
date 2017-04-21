import express from 'express';
//import mailer from 'express-mailer';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import User from '../db/models/user';
import bcrypt from 'bcrypt';

let router = express.Router();

router.post('/', (req, res) => {
	let errors = validateInput(req.body);
	const { firstname, lastname, soo, dob, occupation, password, 
			confpassword, address, gender, isadmin, email } = req.body;
	if(isEmpty(errors)){
		if(doesValExist({ email })){
			errors.email = "Email already exists";
		}
	}

	if(isEmpty(errors)){
		let password_hash = bcrypt.hashSync(password, 10);
		console.log('On the matter');
		User.forge({ firstname, lastname, soo, dob, occupation, password_hash,
		 address, gender, email, isadmin }).save()
		.then(user => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log('I messed up');
			res.status(500).json({ error: err });
		});
	} else {
		res.status(400).json({ errors });
	}


});

function doesValExist(data){
	let exists = false;
	User.where(data).fetch().then(user => {
		if(user){
			exists = true;
		}
	});
	return exists;
}

function validateInput(body){
	const { firstname, lastname, soo, dob, occupation, password, 
			confpassword, address, gender, email } = body;
	let errors = {};

	if(Validator.isEmpty(firstname)){
		errors.firstname = "This field must be provided";
	}
	if(Validator.isEmpty(lastname)){
		errors.lastname = "This field must be provided";
	}
	if(Validator.isEmpty(occupation)){
		errors.occupation = "This field must be provided";
	}
	if(Validator.isEmpty(address)){
		errors.address = "This field must be provided";
	}
	if(Validator.isEmpty(soo)){
		errors.soo = "This field must be provided";
	}

	if(Validator.isEmpty(dob)){
		errors.dob = "This field must be provided";
	}
	if(Validator.isEmpty(password)){
		errors.password = "This field must be provided";
	}
	if(Validator.isEmpty(email)){
		errors.email = "This field must be provided";
	}
	if(Validator.isEmpty(email)){
		errors.email = "This field must be provided";
	}
	if(Validator.isEmpty(confpassword)){
		errors.confpassword = "This field must be provided";
	}
	if(!Validator.equals(password, confpassword)){
		errors.password = "Password must be same as the Password Confirmation";
	}

	return errors;
}

export default router;