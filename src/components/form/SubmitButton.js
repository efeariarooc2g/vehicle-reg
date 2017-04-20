import React, { Component } from 'react';

class SubmitButton extends Component {
	render(){
	const { name, type, ClickFn, classType, value } = this.props;
		return (
				<button 
					className={'btn ' + classType} 
					onClick={ClickFn}
					value={value}
					type={type}>{name}</button>
		);
	}
}

SubmitButton.propTypes = {
	type: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	ClickFn: React.PropTypes.func
}

SubmitButton.defaultProps = {
	value: "button",
	ClickFn: () => {},
	classType: 'btn-primary btn-lg'
}

export default SubmitButton;