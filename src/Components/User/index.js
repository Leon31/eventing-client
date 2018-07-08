import React, { Component } from 'react';

import './style.sass';

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user">
        <div className="user_picture">
          <img src={user.pictureUrl} alt=""/>
        </div>
        <div className="user_name">{user.firstName}</div>
      </div>
    );
  }
}

export default User;
