import React, { Component } from 'react';

class RadioButton extends Component {
	render(){
		const { label, name, id, value, type, onChange, error } = this.props;
		let hasError = error ? 'has-error' : '';
		
		return (
			<div className={'form-group ' + hasError}>
				<div className="radio">
				<label>
					<input 
						className="form-control"
						id={id}
						name={name} 
						type={type} 
						value={value} 
						onChange={onChange} 
					/>
					{label}
					</label>
				{error && <span className="help-block">{error}</span>}
			</div>
		);
	}
}

RadioButton.propTypes = {
	name: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
}

RadioButton.defaultProps = {
	type: "text"
}

export default InputField;