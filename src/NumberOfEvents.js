import React, { Component } from 'react';
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      num: 32,
      errAlert: ""
    };
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value >= 1 || value <= 32) {
      this.setState({ num: value });
      this.props.updateEvents(this.props.selectedCity, value);
    } else {
        this.setState({ errAlert: "Please choose a number between 1 and 32." });
    };
  };

  render() {
    return (
      <div>
        <ErrorAlert text={this.state.errAlert} />
        <input
          className='num'
          type='number'
          min={1}
          max={32}
          value={this.state.num}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;