import React, { Component } from 'react';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import './App.css';

// Custom Components
import NumberOfEvents from './NumberOfEvents';
import CitySearch from './CitySearch';
import EventList from './EventList';

class App extends Component {
  state = {
    events: [],
    locations: []
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
          <CitySearch 
            locations={this.state.locations} 
            updateEvents={this.updateEvents} 
          />
          <EventList events={this.state.events} />
          <NumberOfEvents
            selectedCity={this.state.selectedCity}
            num={this.state.eventCount}
            updateEvents={this.updateEvents}
          />
      </div>
    );
  }
}

export default App;
