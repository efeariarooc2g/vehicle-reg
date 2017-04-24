import React from 'react';
import axios from 'axios';

class Application extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			apptype: '', 
			testscore: '', 
			applocal: '', 
			appaddress: '', 
			isnew: '', 
			geodata: {},
			errors: {},
			completed: false
		};
	}

	componentDidMount(){
		let id = this.props.match.params.id;
		axios.get(`/api/application/${id}`).then((data) => {
			let appData = data.data;
			this.setState({
				apptype: appData.appType, 
				testscore: appData.testScore, 
				applocal: appData.appLocal, 
				appaddress: appData.appAddress, 
				isnew: appData.isNew, 
				geodata: appData.geoData
			});
		});
	}

	render(){
		let {apptype, applocal, testscore, appaddress, isnew, geodata } = this.props;
		return (
			<div className="col-md-8 col-md-offset-4">
				<h3>Application</h3>
				<table className="table table-striped">
				<TData name="Application Type" value={apptype} />
				<TData name="Test Score" value={testscore} />
				<TData name="Address of Application" value={appaddress} />
				<TData name="Address Coordinates" value={geodata} />
				<TData name="Location of Application" value={applocal} />
				<TData name="First/Renewal" value={isnew} />
			</table>
			</div>
		);
	}
}

class TData extends React.Component {

	render(){
		let { name, value } = this.props.tbdata;

		return (
				<tr>
					<td></td>
					<td>{name}</td>
					<td>{value}</td>
					<td></td>
				</tr>
		);
	}
}





export default Application;