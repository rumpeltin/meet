import React, { Component } from "react";

// Custom Components
import { InfoAlert } from './Alert';

class StatusBar extends Component {
  state = { infoText: ''}

  networkStatus = () => {
    this.setState({infoText: navigator.online ? 'online' : 'offline'})
  };

  async componentDidMount() {
    window.addEventListener('online', this.networkStatus);
    window.addEventListener('offline', this.networkStatus);
    this.networkStatus();
  }

  render() {
    return (
      <div className="status-bar">
        <div className="network-status">
          <InfoAlert text={this.state.infoText} />
        </div>
        <div className="status-bar-title">
          <h1>Meet</h1>
        </div>
      </div>
    );
  }
}

export default StatusBar;