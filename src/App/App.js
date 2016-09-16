import React, { Component } from 'react';
import AutocompleteInput from '../AutocompleteInput/AutocompleteInput';
import MapComponent from '../MapComponent/MapComponent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: 0, long: 0, zoom: 3 };
  }

  render() {
    const { lat, long, zoom } = this.state;
    return (
      <div>
        <AutocompleteInput />
        <MapComponent lat={lat} long={long} zoom={zoom} />
      </div>
    );
  }
}

export default App;
