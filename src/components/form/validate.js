
import Validator from 'validator';

	export default function validate(e, errors){
		if(Validator.isEmpty(e.target.value)){
			errors[e.target.name] = e.target.name + " must be provided";
		} else if (typeof errors[e.target.name] !== undefined) {
			delete errors[e.target.name];
		}
		console.log('I dey enter here');
		return errors;
	}