import React, { Component } from 'react';
import './style.sass';

const posText = [
  'Stop clicking me',
  'Sir, could you gently end clicking me',
  'Police, here someone is abuseing me ',
  'Come on.. Again? really.. Again!?',
  'Thanks, but I don\'t like to be pushed',
  'I dare you to do it again',
];

class Location extends Component {
  constructor(props){
    super(props);
    this.state = {
      position: null,
      text: 'Get tracked like there is no tomorrow',
    };
  }

  getLocation = () => {
    if (!this.state.position) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        this.setState({
          position: coords,
          text: 'Now we will track you for life',
        });
        this.props.storeLocation({lng: coords.longitude, lat: coords.latitude}, 'location');
      });
    } else {
      this.setState({ text: posText[Math.floor((Math.random() * 6))],});
    }
  }

  render() {
    return (
      <div>
        <div className="title">Your Location.</div>
        <div onClick={this.getLocation} className="location">
          { this.state.text }
          <span className="location_span" role="img" alt="pin" aria-label="pin">➤</span>
        </div>
      </div>
    );
  }
}

export default Location;
