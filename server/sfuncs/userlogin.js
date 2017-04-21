import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import User from '../db/models/user';
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

export default router;