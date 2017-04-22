import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import isAuthenticated from './funcs/authentic';
import Public from './pages/Public';
import Main from './pages/Main';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

//import checkLoginState from './funcs/checkLoginStatus';

class App extends Component {
  constructor(props){
    super(props);

    this.FB = {};

    this.state = {
      isLoggedin: false
    };
  }

  componentDidMount(){
    window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '287653328329244',
      cookie     : true,  // enable cookies to allow the server to access
                        // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.1' // use version 2.1
    });
    this.FB = window.FB;
    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }.bind(this);

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
    //checkLoginState();
  }

  statusChangeCallback(response){
    console.log(response);
    if(response.status === 'connected'){
      this.setState({ isLoggedin: true });

      let authResponse = response.authResponse;
      this.checkIfUserExists(authResponse.userID, authResponse.accessToken);
    }
  }

  setSession(token){
    if(!isEmpty(token)){
      localStorage.setItem('vehJwtToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  checkIfUserExists(id, access){
    axios.post('/api/login/authentic', {id, access}).then((data) => {
      let token = data.data.token;
      this.setSession(token);
    });
  }

  render() {
    console.log(this.state);

    let fbAPI = this.FB;
    let isLoggedin = this.state.isLoggedin;
    let props = { fbAPI, isLoggedin };
    return (
        <Route path="/" render={() => 
          <MyCheck {...props} />
        } />
    );
  }
}


let MyCheck = (props) => {
  return props.isLoggedin ? <Main {...props} /> : <Public {...props} />;
}


export default App;
