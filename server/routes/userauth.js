import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import User from '../db/models/user';
import UserLogin from '../db/models/userlogin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import config from '../../config';

let router = express.Router();

let config = {
	jwtSecret: 'Iamstillonahotseat'
};

router.post('/', (req, res) => {
	const { username, password } = req.body;

	let errors = {};

	if(Validator.isEmpty(username)){
		errors.username = "This field is required";
	}
	if(Validator.isEmpty(password)){
		errors.password = "This field is required"
	}

	if(isEmpty(errors)){
		User.query({ 
			select: ['id', 'email', 'password_hash'],
			where: { email: username }
		}).fetch().then((user) => {
			if(user){ console.log(user);
				console.log(user);
				console.log(password);
				if(bcrypt.compareSync(password, user.get('password_hash'))){
					let token = jwt.sign({
						id: user.get('id'),
						username: user.get('username')
					}, config.jwtSecret);
					res.json({ token });
				} else {
					res.status(400).json({ error: 'Invalid Username or Password3'});
				}
			} else {
				res.status(400).json({ error: 'Invalid Username or Password2'});
			}
		});
	} else {
		res.status(400).json({ error: 'Invalid Username or Password1'});
	}
});

router.post('/authentic', (req, res) => {
	let { id, access } = req.body;
	let status = 0;
	let errors = 0;
	let reviewer = 'N';
	let processor = 'N';

	if(Validator.isEmpty(id) || Validator.isEmpty(access)){
		res.status(401).json({ error: 'Invalid Credentials'});
	}

	UserLogin.query({
		where:{ fbId: id },
		orWhere:{ fbToken: access }
	}).fetch().then((userlogin) => {
		//console.log({ id, access });
		//console.log(userlogin);
		if(!userlogin){
			// insert new user
			UserLogin.forge({ 
				fbId: id,
				fbToken: access,
				reviewer, processor
			}, { hasTimestamps: true }).save().then((newlogin) => {
				if(newlogin){
					let token = getAPIToken(
						newlogin.get('id'), 
						newlogin.get('fbId'), 
						newlogin.get('fbToken'),
						newlogin.get('reviewer'),
						newlogin.get('processor')
					);
					status = 1;
					res.json({ token, status, reviewer, processor })
				} else {
					res.status(400).json({ error: 'User not saved'})
				}
			});
		} else {
			let token = getAPIToken(
				userlogin.get('id'), 
				userlogin.get('fbId'), 
				userlogin.get('fbToken'),
				userlogin.get('reviewer'),
				userlogin.get('processor')
			);
			reviewer = username.get('reviewer');
			processor = userlogin.get('processor');
			status = 2;
			res.json({ token, status, reviewer, processor });
		}
	});
});

router.post('/access/set', verifyUser, function(req, res){
	let { id, fbId, fbToken, reviewer, processor, admintype } = req.body;
	if(typeof id !== 'undefined' || id !== ''){
		if(admintype !== ''){
			if(admintype === 'reviewer'){
				reviewer = 'Y';
			} else if (admintype === 'processor') {
				processor = 'Y';
			}

			// update user to reviewer
			Userlogin.forge({ id: req.body.id }).save({ reviewer, processor });
			.then((userlogin) => {
				if(userlogin){
					// create new token
					let token = getAPIToken(id, fbId, fbToken, reviewer, processor);

					res.json({ token });
				} else {
					res.status(400).json({ error: 'No update' });
				}
			});
		}
	}
});


function getAPIToken(id, fbId, fbToken, reviewer, processor){

	return jwt.sign({
		id,
		fbId,
		fbToken,
		reviewer,
		processor
	}, config.jwtSecret);
}

export default router;