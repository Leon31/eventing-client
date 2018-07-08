import React, { Component } from 'react';

import Location from '../../Components/Location';
import DatePicker from '../../Components/DatePicker';
import CategoriesList from '../../Components/CategoriesList';
import {DotLoader} from 'react-spinners';


import './style.sass';

class InfoPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      complete: false,
      loader: false,
      categories: [],
      dates: [],
    };
  }
  componentDidMount(){
    let userId = new URLSearchParams(location.search.substring(1)).get('userId');
    this.handleStore(userId, 'userId');
  }

  handleStore = (entry, name) => {
    this.setState({
      [name]: entry
    }, ()=> console.log(this.state));
  };

  handleSubmit = () => {
    const {location, categories, dates, userId} = this.state;
    if (location && categories.length && dates.length) {
      this.setState({loader: true});
      fetch('https://4640fa73.ngrok.io/userRequest', {
        method:'POST',
        body: JSON.stringify({location, categories, dates, userId}),
        headers: {
          'Content-Type': 'application/json'
        }}).then((res)=> {
        this.setState({
          complete: true,
          loader: false
        });
      }).catch((err)=>{
        console.log(err);
      });
    } else {
      alert('Fill all fields');
    }
  }

  render() {
    return (
      <div className="infoPicker">
        {  this.state.complete
          ? <div className="infoPicker_complete">
            <div className="close_lable">Close here <span alt="hand" aria-label="hand">☝️</span> </div>
            <div className="infoPicker_complete_title">
              <span role="img" alt="party" aria-label="party">🎉</span>
              <div className="infoPicker_complete_title_text">  Alright, Thanks to share your interests!</div>
              <span role="img" alt="party" aria-label="party">🎉</span>
            </div>
            <div className="infoPicker_complete_message"> When I will find an event that matches with your data I will share it with you! 😉 </div>
          </div>
          : <div>
            <Location storeLocation={this.handleStore}/>
            <DatePicker storeDates={this.handleStore}/>
            <CategoriesList storeCategories={this.handleStore}/>
            {
              this.state.loader
                ? <div className="submit_loader">
                  <DotLoader
                    color={'DodgerBlue'}
                    size={50}
                    loading={true}
                  />
                </div>
                : <button onClick={this.handleSubmit} className="submit">Submit</button>
            }
          </div>
        }
      </div>
    );
  }
}

export default InfoPicker;
