import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true };

  toggleDetails = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  EventDetails = ({ event }) => (
    <div className='details'>
      <h3 className='about'>About This Event:</h3>
      <a className='link' href={event.htmlLink} target='_blank' rel='noopener noreferrer'>
        See Details on Google Calendar
      </a>
      <p className='description'>{event.description}</p>
    </div>
  );

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    const { EventDetails } = this;

    return (
      <div>
        <div className="Event">
          <h2 className="summary">{event.summary}</h2>
          <p className="start">{event.start.dateTime}</p>
          <p className="location">{`Location: ${event.location}`}</p>
          <button className='details-button' onClick={this.toggleDetails}>
            {collapsed ? 'show' : 'hide'} details
          </button>
          {!collapsed && <EventDetails event={event} />}
        </div>
        <hr />
      </div>
    );
  }
}

export default Event;
