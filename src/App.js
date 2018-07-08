import React, { Component } from 'react';
import {  Route } from 'react-router-dom';

import InfoPicker from './Containers/InfoPicker';
import Event from './Containers/Event';

import './App.sass';

class App extends Component {
  render() {
    return (
      <div className='main_container'>
        <div>
          <Route exact path="/infoPicker" component={InfoPicker} />
          <Route path="/event" component={Event} />
        </div>
      </div>
    );
  }
}

export default App;
