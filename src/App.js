import React, { Component } from 'react';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import CitySearch from './CitySearch';
import { InfoAlert, ErrorAlert } from './Alert';
import EventList from './EventList';
import './nprogress.css';
import './App.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: 'all',
    showWelcomeScreen: undefined
  }

  componentDidMount() {
    this.mounted = true;
    this.checkUserAuthentication();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  checkUserAuthentication = async () => {
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const code = new URLSearchParams(window.location.search).get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {
      this.fetchEvents();
    }
  }

  fetchEvents = async () => {
    const { selectedCity, eventCount } = this.state;
    const events = await getEvents();
    const filteredEvents = this.filterEvents(events, selectedCity);
    if (this.mounted) {
      this.setState({
        events: filteredEvents.slice(0, eventCount),
        locations: extractLocations(events)
      });
    }
  }

  filterEvents = (events, location) => {
    if (location === 'all') return events;
    return events.filter(event => event.location === location);
  }

  updateEvents = async (location, eventCount) => {
    const { selectedCity } = this.state;
    location = location || selectedCity;
    eventCount = eventCount || this.state.eventCount;

    const events = await getEvents();
    const filteredEvents = this.filterEvents(events, location);

    this.setState({
      events: filteredEvents.slice(0, eventCount),
      selectedCity: location,
      eventCount
    });
  }

  render() {
    const { events, locations, showWelcomeScreen, selectedCity, eventCount } = this.state;
    const offlineMessage = navigator.onLine ? "Welcome! You're online." : "You're offline — we cannot update any events in this mode.";

    if (showWelcomeScreen === undefined) return <div className="App" />

    return (
      <>
        <div className="App">
          <InfoAlert text={this.state.infoText} />
          <h1>Search All Cities</h1>
          <div className="citySearch">
            <CitySearch
              locations={locations}
              updateEvents={this.updateEvents}
            />
            <NumberOfEvents
              selectedCity={selectedCity}
              num={eventCount}
              updateEvents={this.updateEvents}
            />
          </div>
          <ErrorAlert message={offlineMessage} />
          <EventList events={events} />
        </div>
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={getAccessToken} />
      </>
    );
  }
}

export default App;
