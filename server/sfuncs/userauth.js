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

router.post('/registered', (req, res) => {
	let { id, access } = req.body;
	let status = 0;
	let errors = 0;

	if(Validator.isEmpty(id) || Validator.isEmpty(access)){
		res.status(401).json({ error: 'Invalid Credentials'});
	}

	UserLogin.query({
		where:{ fbId: id },
		orWhere:{ fbToken: access }
	}).fetch().then((userlogin) => {
		console.log({ id, access });
		console.log(userlogin);
		if(!userlogin){
			// insert new user
			UserLogin.forge({ 
				fbId: id,
				fbToken: access
			}, { hasTimestamps: true }).save().then((newlogin) => {
				if(newlogin){
					let token = getAPIToken(
						newlogin.get('id'), 
						newlogin.get('fbId'), 
						newlogin.get('fbToken')
					);
					status = 1;
					res.json({ token, status })
				} else {
					res.status(400).json({ error: 'User not saved'})
				}
			});
		} else {
			let token = getAPIToken(
				userlogin.get('id'), 
				userlogin.get('fbId'), 
				userlogin.get('fbToken')
			);
			status = 2;
			res.json({ token, status });
		}
	});
});


function getAPIToken(id, fbid, fbToken){
	return jwt.sign({
		id,
		fbid,
		fbToken
	}, config.jwtSecret);
}

export default router;