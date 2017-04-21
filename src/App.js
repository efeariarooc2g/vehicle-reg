import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import isAuthenticated from './funcs/authentic';

import Main from './pages/Main';
import FBLoginButton from './components/FBLoginButton';
import checkLoginState from './funcs/checkLoginStatus';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedin: false
    };
  }

  componentDidMount(){
    checkLoginState();
  }

  render() {
    
    return (
        <Route path="/" render={() => {
          return this.state.isLoggedin ? <Main /> : <FBLoginButton />
        }} />
    );
  }
}

export default App;
