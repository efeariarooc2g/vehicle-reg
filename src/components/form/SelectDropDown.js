import React, { Component } from 'react';
import map from 'lodash/map';

class SelectDropDown extends Component {
	render(){
		const { label, name, value, options, onChange, error } = this.props;
		let hasError = error ? 'has-error' : '';
		let optionlist = map(options, (val, key) => {
			return <option key={val} value={val} >({key}) {val}</option>;
		});
		return (
			<div className={'form-group ' + hasError}>
				<label htmlFor="control-label">{label}</label>
				<select 
					className="form-control"
					name={name}	
					value={value} 
					onChange={onChange} >
					{optionlist}
				</select>
				{error && <span className="help-block">{error}</span>}
			</div>
		);
	}
}

SelectDropDown.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.object.isRequired
}

export default SelectDropDown;