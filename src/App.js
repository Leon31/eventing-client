import React, { Component } from 'react';

import Location from './Location';
import DatePicker from './DatePicker';
import CategoriesList from './CategoriesList';

import './App.sass';

class App extends Component {
  storeLocation = (pos) => {
    console.log(pos);
  };

  render() {
    return (
      <div className="App">
        <Location storeLocation={this.storeLocation}/>
        <DatePicker/>
        <CategoriesList/>
      </div>
    );
  }
}

export default App;
