import React, { Component } from 'react';

// Custom Components
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
    selectedCity: null,
    showWelcomeScreen: undefined
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

    async componentDidMount() {
      this.mounted = true;
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      this.setState({ showWelcomeScreen: !(code || isTokenValid) });

      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({ events, locations: extractLocations(events) });
          }
        });
      }
    }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const offlineMessage = navigator.onLine ? "Welcome! You're online." : "You're offline — we cannot update any events in this mode.";
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
        <>
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
            <ErrorAlert message={offlineMessage} />
            <EventList events={this.state.events} />
          </div>
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                  getAccessToken={() => { getAccessToken() }} />
        </>
    );
  }
}

export default App;
