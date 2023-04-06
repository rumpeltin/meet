import React, { Component } from 'react';

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      num: 32,
    };
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value >= 1 || value <= 32) {
      this.setState({
        num: value,
      });
      this.props.updateEvents(this.props.selectedCity, value);
    }
  };

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
      </>
    );
  }
}

export default NumberOfEvents;