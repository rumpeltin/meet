import React, { Component } from 'react';
import { getEvents, extractLocations } from './api';
import { InfoAlert } from './Alert';
import './nprogress.css';
import './App.css';

// Custom Components
import NumberOfEvents from './NumberOfEvents';
import CitySearch from './CitySearch';
import EventList from './EventList';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null
  }

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        this.setState({
          events: locationEvents.slice(0, this.state.eventCount),
          selectedCity: location,
        });
      });
    } else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        this.setState({
          events: locationEvents.slice(0, eventCount),
          eventCount: eventCount,
        });
      });
    } else if (this.state.selectedCity === "all") {
      getEvents().then((events) => {
        this.setState({
          events: events.slice(0, eventCount),
          eventCount: eventCount,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          this.state.locations === "all"
            ? events
            : events.filter(
                (event) => this.state.selectedCity === event.location
              );
        this.setState({
          events: locationEvents.slice(0, eventCount),
          eventCount: eventCount
        });
      });
    }
  };

  networkStatus = () => {
    this.setState({infoText: navigator.online ? 'online' : 'offline'})
  };

  componentDidMount() {
    this.mounted = true;
    window.addEventListener('online', this.networkStatus);
    window.addEventListener('offline', this.networkStatus);
    getEvents().then((events) => {
      if (this.mounted) {
        events=events.slice(0,this.state.eventCount);
        this.setState({ events, locations: extractLocations(events) });
        this.networkStatus();
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <InfoAlert text={this.state.infoText} />
        <h1>Search All Cities</h1>
        <div className="citySearch">
          <CitySearch 
            locations={this.state.locations} 
            updateEvents={this.updateEvents} 
          />
          <NumberOfEvents
            selectedCity={this.state.selectedCity}
            num={this.state.eventCount}
            updateEvents={this.updateEvents}
          />
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
