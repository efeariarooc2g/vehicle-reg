import jwt from 'jsonwebtoken';
import config from '../config';

let verifyUser = (req, res, next) => {
	let authtoken = req.headers['authorization'];
	getLoggedInUser(authtoken.split(' ')[1]).then((userdetails) => {
		
		if(userdetails.id){			
			req.body.userid = userdetails.id;
			req.body.fbId = userdetails.fbId;
			req.body.fbToken = userdetails.fbToken;
			req.body.reviewer = userdetails.reviewer;
			req.body.processor = userdetails.processor;
			User.query({
				where: { applicant: userdetails.id }
			}).fetch().then(user => {
				if(user){
					req.body.name = user.get('firstname') + ' ' + user.get('lastname');
					req.body.email = user.get('email');
				}
			});
			next();
		} else {
				res.status(401).json({ error: 'Invalid Credentials'});
		}
	}).catch((err) => {
		res.status(400).json({ error: 'Invaild Credentials' });
	});
}

export default verifyUser;