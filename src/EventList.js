import React from 'react';

// Custom Components
import Event from './Event';

const EventList = ({ events }) => (
  <ul className="EventList">
    {events.map(event => (
      <li key={event.id}>
        <Event event={event} />
      </li>
    ))}
  </ul>
);

export default EventList;
