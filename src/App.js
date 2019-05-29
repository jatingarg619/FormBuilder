import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router  } from 'react-router-dom'
import {FormBuilder} from './container'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Form Builder</h2>
        <Router>
          <Switch>
            <Route path='/' exact component={FormBuilder} />
          
          </Switch>
        </Router>  
      </div>
    );
  }
}

export default App;
