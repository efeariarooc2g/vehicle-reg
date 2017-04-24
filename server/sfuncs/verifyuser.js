import jwt from 'jsonwebtoken';
import config from '../config';

let verifyUser = (req, res, next) => {
	let authtoken = req.headers['authorization'];
	getLoggedInUser(authtoken.split(' ')[1]).then((userdetails) => {
		
		if(userdetails.id){
			let id = userdetails.fbId;
			if(id){
				req.body.userid = id;
				next();
			} else {
				res.status(401).json({ error: 'Invalid Credentials'});
			}
		}
	}).catch((err) => {
		res.status(400).json({ error: 'Invaild Credentials' });
	});
}

export default verifyUser;