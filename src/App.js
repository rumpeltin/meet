import React from 'react';
import './App.css';

// Custom Components
import NumberOfEvents from './NumberOfEvents';
import CitySearch from './CitySearch';
import EventList from './EventList';

function App() {
  return (
    <div className="App">
        <CitySearch />
        <EventList />
        <NumberOfEvents />
    </div>
  );
}

export default App;
