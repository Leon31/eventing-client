import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

import './style.sass';

class DatePicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      selI: [],
      week: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      }
    };
  }

  selectDay = (i, date) => {
    this.setState({
      week: {...this.state.week, [i]: !this.state.week[i]}
    });
  }
  // moment().add(i,'days').format('YYYY-M-D')
  // Object.keys(this.state.week).filter(day => this.state.week[day]);

  render() {
    return (
      <div>
        <div className="title">Choose your free days.</div>
        <div className="datepicket">
          {_.range(7).map(i => {
            return(
              <div onClick={this.selectDay.bind(null, i)} key={`day${i}`} className="datepicket_date">
                <div className="datepicket_date_week">{moment().add(i,'days').format('ddd')}</div>
                <div className={
                  this.state.week[i]
                    ? 'datepicket_date_day--selected'
                    : 'datepicket_date_day'
                }>{moment().add(i,'days').format('D')}</div>
                <div className="datepicket_date_month">{moment().add(i,'days').format('MMMM')}</div>
              </div>
            );
          })}
        </div>
        {/* <hr/> */}
      </div>
    );
  }
}

export default DatePicker;
