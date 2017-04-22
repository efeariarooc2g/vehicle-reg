import jwt from 'jsonwebtoken';
import config from '../config';

let getLoggedInUser = (token) => {
	let userdetails = {};
	console.log('the token');
	console.log(token);
	if(token){
		let verifyJwt = new Promise(function(resolve, reject){
			jwt.verify(token, config.jwtSecret, (err, decoded) => {
				if(err){
					reject(err);	
				} else {
					let details = {};
					details.id = decoded.id;
					details.fbId = decoded.fbId;
					details.fbToken = decoded.fbToken;
					resolve(details);
				}
			});
		});

		return verifyJwt;
	}
}

export default getLoggedInUser;