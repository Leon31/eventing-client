import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import moment from 'moment';

import User from '../../Components/User';

import './style.sass';

class Event extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.getEvent();
    this.unsplash = new Unsplash({
      applicationId: '3d7b42e7b6d028c189f9024d46ab5154096c37b2120203be63e3daa77798c4fc',
      secret: '7fe29ed4baa2b71aeff30b4c633cf33a2053b30733405cdc29c3af49d8b3ec40',
      callbackUrl: 'urn:ietf:wg:oauth:2.0:oob'
    });
  }

  getEvent = () => {
    let EventId = new URLSearchParams(location.search.substring(1)).get('EventId');
    fetch(`https://cc0b5ae5.ngrok.io/event?EventId=${1}`)
      .then((res) => res.json())
      .then((res)=> {
        console.log(res);
        this.setState({
          event: res.Event,
          category: res.Category,
          users: res.Users,
        },()=>this.getUnsplashPicture(this.state.category));
      }).catch((err)=>{
        console.log(err);
      });
  }

  getUnsplashPicture = (cat) => {
    this.unsplash.search.photos(cat, 1)
      .then(toJson)
      .then(json => {
        if (json.results.length) {
          this.setState({
            picture: json.results[0].urls.regular
          },()=>console.log(this.state.picture));
        }
      }).catch((err)=>{
        console.log(err);
      });
  }


  render() {
    const { users, picture, category, event} = this.state;
    return (
      <div className="event">
        <div className="close_lable">Close here <span alt="hand" aria-label="hand">☝️</span> </div>
        <div className="event_title">{category}</div>
        <div className="event_picture_container">
          <img src={picture} alt=""/>
        </div>
        <div className="event_date">
          <div className="event_status"></div>
          On the {event ? moment(event.createdAt).add(2,'days').format('MMMM Do'): null}</div>
        <div className="event_user_list">
          {users ? users.map(user => <User key={user.id} user={user}/>) : null }
        </div>
      </div>
    );
  }
}

export default Event;
