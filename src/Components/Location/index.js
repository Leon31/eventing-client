import React, { Component } from 'react';

import {DotLoader} from 'react-spinners';

import './style.sass';

const posText = [
  'Stop clicking me',
  'Sir, could you gently stop clicking me',
  'Police, here someone is abuseing me ',
  'Come on.. Again? really.. Again!?',
  'Thanks, but I don\'t like to be pushed',
  'I dare you to do it again',
];

class Location extends Component {
  constructor(props){
    super(props);
    this.state = {
      pos: null,
      text: 'Get tracked like there is no tomorrow',
    };
  }

  getLocation = () => {
    if (!this.state.pos) {
      this.setState({loader: true});
      setTimeout(() => this.setState({
        pos: {lng:  2.1976373, lat: 41.3950044},
        text: 'Now we will track you for life',
        loader: false
      },()=>this.props.storeLocation(this.state.pos, 'location')), 2000);
    } else {
      this.setState({ text: posText[Math.floor((Math.random() * 6))],});
    }
  }

  render() {
    return (
      <div>
        <div className="title">Set your Location.</div>
        {this.state.loader
          ?
          <div onClick={this.getLocation} className='location'>
            <DotLoader
              color={'DodgerBlue'}
              size={50}
              loading={true}
            />
          </div>
          :
          <div onClick={this.getLocation} className={!this.state.pos ? 'location' : 'location--visited'}>
            {this.state.text}
            <span className="location_span" role="img" alt="pin" aria-label="pin">➤</span>
          </div>
        }
      </div>
    );
  }
}

export default Location;
