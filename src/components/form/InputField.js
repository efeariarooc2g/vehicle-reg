import React, { Component } from 'react';

class InputField extends Component {
	render(){
		const { label, name, value, type, onChange, error } = this.props;
		let hasError = error ? 'has-error' : '';
		
		return (
			<div className={'form-group ' + hasError}>
				<label htmlFor="control-label">{label}</label>
				<input 
					className="form-control"
					name={name} 
					type={type} 
					value={value} 
					onChange={onChange} 
				/>
				{error && <span className="help-block">{error}</span>}
			</div>
		);
	}
}

InputField.propTypes = {
	name: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
}

InputField.defaultProps = {
	type: "text"
}

export default InputField;