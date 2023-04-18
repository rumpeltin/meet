import React, { Component } from 'react';
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = { num: 32, alert: '' }

  handleInputChanged = (event, props) => {
      let amount = event.target.value;
      let err;

      if (amount > 32) {
        err = 'Sorry, we cannot show more than 32 events at once.';
        amount = 32;
      } else if (amount <= 0) {
        err = 'Please choose at least 1.';
        amount = 1;
      }
      this.props.updateEvents(null, amount);
      this.setState({ num: amount, alert: err });
    }

  render() {
    return (
      <>
        <input
          className='num'
          type='number'
          min={1}
          max={32}
          value={this.state.num}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert text={this.state.alert} />
      </>
    );
  }
}

export default NumberOfEvents;