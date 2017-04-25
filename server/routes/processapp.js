import express from 'express';
//import mailer from 'express-mailer';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import User from '../db/models/user';
import bcrypt from 'bcrypt';
import getLoggedInUser from '../sfuncs/sessiondetails';
import verifyUser from '../sfuncs/verifyUser';
import email from '../sfuncs/sendemail';

let router = express.Router();

router.get('/:id', verifyUser, (req, res) => {
	let authtoken = req.headers['authorization'];
	
	let id = req.params.id;

		if(userdetails.id){
			let fbId = userdetails.fbId;
			User.query({
				select: ['appType', 'appLocal', 'testScore', 'appNumber', 'geoData',  
			 			'isNew','appAddress', 'appStatus'],
				where: { id }
			}).fetch().then((application) => {
				if(application){
					res.json(application);
				} else {
					res.status(400).json(false);
				}
			});
		}
});

router.post('/new', verifyUser, (req, res) => {
	let errors = validateInput(req.body);
	const { apptype, applocal, testscore, geoData,  
		isnew, appaddress, userid, id } = req.body;

	if(isEmpty(errors)){
		if(doesValExist({ email })){
			errors.email = "Email already exists";
		}
	}

	if(isEmpty(errors)){
		console.log('On the matter');
		User.forge({ appType: apptype, appLocal: applocal, testScore: testscore, geoData: geodata,  
		isNew: isnew, appAddress: appaddress, applicant: userid }).save()
		.then(user => {
			//get reviewers
			userlogin.query({
				where: { reviewer: 'Y'}
			}).fetch().then((reviewers) => {
				if(reviewers){
					let reviewerid = reviewers.get('id');
					User.forge({ applicant }).fetch().then(user => {
						if(user){
							let remailaddress = user.get('email');
							let rname = user.get('firstname') + ' ' + user.get('lastname');
							let useremail = req.body.email;
							let userfullname = req.body.name;
							// prep email
							let body = `<h3>New Application</h3>
								${userfullname} just completed a new application
							`;

							mailOptions = {
				                from: '"Uche C 👻" <naijaphilia@gmail.com>', // sender address
				                to: remailaddress, // list of receivers
				                subject: 'Completion of Application', // Subject line
				                //text: 'Hello world ?', // plain text body
				                html: body // html body
				            };
							// send mail notification
							email(mailOptions).then(info => {
								res.json({ success: true });
							});
						}
					});
				}
			});
			
		})
		.catch((err) => {
			console.log('I messed up');
			res.status(404).json({ error: err });
		});
	} else {
		res.status(400).json({ errors });
	}


});

router.post('/edit', verifyUser, (req, res) => {
	let errors = validateInput(req.body);
	const { apptype, applocal, testscore, geoData,  
		isnew, appaddress, userid } = req.body;

	if(isEmpty(errors)){
		let password_hash = bcrypt.hashSync(password, 10);
		console.log('On the matter');
		User.forge({ appType: apptype, appLocal: applocal, testScore: testscore, geoData: geodata,  
		isNew: isnew, appAddress: appaddress, applicant: userid }).save()
		.then(user => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log('I messed up');
			res.status(404).json({ error: err });
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
	const { apptype, applocal, testscore, geoData,  
		isnew, appaddress } = body;
	let errors = {};

	if(Validator.isEmpty(apptype)){
		errors.firstname = "This field must be provided";
	}
	if(Validator.isEmpty(applocal)){
		errors.lastname = "This field must be provided";
	}
	if(Validator.isEmpty(testscore)){
		errors.occupation = "This field must be provided";
	}
	if(Validator.isEmpty(appaddress)){
		errors.address = "This field must be provided";
	}
	if(Validator.isEmpty(geodata)){
		errors.soo = "This field must be provided";
	}

	if(Validator.isEmpty(isnew)){
		errors.dob = "This field must be provided";
	}

	return errors;
}

export default router;