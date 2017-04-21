/*import jwt from 'jsonwebtoken';
//import config from '../../config';

let config = {
	jwtSecret: 'Iamstillonahotseat'
}

let isAuthenticated = () => {
	let authenticated = false;
	if(localStorage.vehJwtToken){
		let token = localStorage.vehJwtToken;
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if(err){
				authenticated = false;
			} else {
				authenticated = true;
			}
		});
	} else {
		authenticated = false;
	}

	return authenticated;
}

let isAdmin = () => {
	let admin = false;
	if(localStorage.vehJwtToken){
		let token = localStorage.vehJwtToken;
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if(err){
				admin = false;
			} else {
				admin = true;
				;
				if(decoded.isadmin === "Y"){
					admin = true
				}
			}
		});
	} 

	return admin;
}
export { isAuthenticated, isAdmin };*/