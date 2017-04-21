import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import isAuthenticated from './funcs/authentic';

import Main from './pages/Main';
import Public from './pages/Public';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedin: false
    };
  }

  componentDidMount(){
    this.setState({ isLoggedin : isAuthenticated() })
  }
  render() {
    let authenticated = this.state.isLoggedin;
    return (
        <Route path="/" render={() => {
          return authenticated ? <Main /> : <Public />
        }} />
    );
  }
}

export default App;
