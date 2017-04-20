import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Main from './pages/Main';


class App extends Component {
  render() {
    let isLoggedin = true;
    return (
        <Route path="/" render={() => {
          return isLoggedin ? <Main /> : <Redirect to="/login" />
        }} />
    );
  }
}

export default App;
