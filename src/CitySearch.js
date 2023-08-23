import React, { Component } from 'react';
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
    infoText: ""
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter(location => 
      location.toUpperCase().includes(value.toUpperCase())
    );

    this.setState({
      query: value,
      suggestions,
      showSuggestions: true,
      infoText: suggestions.length ? "" : "We cannot find that city. Please try another."
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: ""
    });
    this.props.updateEvents(suggestion);
  }

  render() {
    const { query, suggestions, showSuggestions, infoText } = this.state;

    const suggestionStyles = {
      display: showSuggestions ? 'block' : 'none'
    };

    return (
      <>
        <div id="CityAlert">
            <InfoAlert text={infoText} />
        </div>
        <div className="CitySearch">
          <input
            type="text"
            className="city"
            value={query}
            onChange={this.handleInputChanged}
            onFocus={() => this.setState({ showSuggestions: true })}
          />
          <ul className="suggestions" style={suggestionStyles}>
            {suggestions.map(suggestion => (
              <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
                {suggestion}
              </li>
            ))}
            <li onClick={() => this.handleItemClicked("all")}>
              <b>See all cities</b>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default CitySearch;
