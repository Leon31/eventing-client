import React, { Component } from 'react';

import Location from './Location';
import DatePicker from './DatePicker';
import CategoriesList from './CategoriesList';

import './App.sass';

class App extends Component {
  handleStore = (entry, name) => {
    this.setState({
      [name]: entry
    }, ()=> console.log(this.state));
  };

  handleSubmit = () => {
    const {location, categories, dates} = this.state;
    if (location && categories.length && dates.length) {
      fetch('http://91.126.107.14:4000/userRequest', {
        method:'POST',
        body: JSON.stringify({location, categories, dates, user:1921533581204203}),
        headers: {
          'Content-Type': 'application/json'
        }}).then((res)=> console.log(res));
    } else {
      alert('Fill all fields');
    }
  }

  render() {
    return (
      <div className="App">
        <Location storeLocation={this.handleStore}/>
        <DatePicker storeDates={this.handleStore}/>
        <CategoriesList storeCategories={this.handleStore}/>
        <button onClick={this.handleSubmit} className="submit">Submit</button>
      </div>
    );
  }
}

export default App;
