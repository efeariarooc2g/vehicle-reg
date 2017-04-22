import express from 'express';
//import mailer from 'express-mailer';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import User from '../db/models/user';
import bcrypt from 'bcrypt';
import getLoggedInUser from '../sfuncs/sessiondetails';

let router = express.Router();

router.get('/', (req, res) => {
	let authtoken = req.headers['authorization'];
	
	let userdetails = {};
	getLoggedInUser(authtoken.split(' ')[1]).then((sessioindetails) => {
		userdetails = sessioindetails;
		console.log('The FBID');
		console.log(userdetails.fbId);
		if(userdetails.fbId){
			let fbId = userdetails.fbId;
			User.query({
				select: ['firstname', 'lastname', 'soo', 'dob', 'email',  
			 			'occupation','address', 'gender', 'isadmin'],
				where: { fbId }
			}).fetch().then((user) => {
				if(user){
					res.json(user);
				} else {
					res.status(400).json(false);
				}
			});
		}
	});;
});

router.post('/', (req, res) => {
	let errors = validateInput(req.body);
	const { firstname, lastname, soo, dob, occupation, 
		 address, gender, isadmin, email } = req.body;

	let authtoken = req.headers['authorization'];

	let { fbId } = getLoggedUser(authtoken.split(' ')[1]);

	if(isEmpty(errors)){
		if(doesValExist({ email })){
			errors.email = "Email already exists";
		}

		if(doesValExist({ fbId })){
			errors.fbId = "Email already exists";
		}
	}

	if(isEmpty(errors)){
		let password_hash = bcrypt.hashSync(password, 10);
		console.log('On the matter');
		User.forge({ firstname, lastname, soo, dob, occupation,
		 address, gender, email, isadmin, fbId }).save()
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
	const { firstname, lastname, soo, dob, 
		occupation,address, gender, email } = body;
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
	if(Validator.isEmpty(email)){
		errors.email = "This field must be provided";
	}
	if(Validator.isEmpty(email)){
		errors.email = "This field must be provided";
	}

	return errors;
}

export default router;