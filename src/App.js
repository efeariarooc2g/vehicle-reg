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
      isLoggedin: false,
      reviewer: 'N',
      processor: 'N'
    };
    this.initFBSDK = this.initFBSDK.bind(this);
    this.loadFBSDK = this.loadFBSDK.bind(this);
    this.logOut = this.logOut.bind(this);
    this.checkIfLoggedin = this.checkIfLoggedin.bind(this);
  }

  componentWillMount(){
    this.loadFBSDK().then(fb => {
      console.log(window.FB);
    });
  }
  loadFBSDK(){
    return new Promise(function(resolve, reject){
      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        resolve(window.FB);
      }(document, 'script', 'facebook-jssdk'));
    });
  }
  initFBSDK(){
    return new Promise(function(resolve, reject){
      window.fbAsyncInit = function() {
        window.FB.init({
          appId      : '287653328329244',
          cookie     : true,  // enable cookies to allow the server to access
                            // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.1' // use version 2.1
        });
        
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
        resolve(window.FB);
      }

    });
  }

  checkIfLoggedin(){
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus(function(response) {
        if(response.status === 'connected') { 
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  componentDidMount(){

    this.initFBSDK().then((FB) => {
      this.checkIfLoggedin().then((response) => {
        this.statusChangeCallback(response);
      });
    })
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

  setSession(token,reviewer,processor){
    if(!isEmpty(token)){
      localStorage.setItem('vehJwtToken', token);
      localStorage.setItem('reviewer', reviewer);
      localStorage.setItem('processor', processor);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('vehJwtToken');
      localStorage.removeItem('reviewer');
      localStorage.removeItem('processor');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
  checkIfUserExists(id, access){
    axios.post('/api/login/authentic', {id, access}).then((data) => {
      let { token, reviewer, processor } = data.data;
      this.setSession(token, reviewer, processor);
      this.setState({ reviewer, processor});
    }).catch((response) => {
      this.setSession('');this.setState({ 
        isLoggedin: false, 
        reviewer: 'N', 
        processor: 'N' });
    });
  }

  logOut(){
    this.props.FB.logout((response) => {
      this.setSession('');
      this.setState({ 
        isLoggedin: false, 
        reviewer: 'N', 
        processor: 'N' });
    });
  }

  render() {
    console.log(this.state);

    let fbAPI = this.FB;
    let { isLoggedin, reviewer, processor } = this.state;
    let props = { fbAPI, isLoggedin, reviewer, processor };
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
