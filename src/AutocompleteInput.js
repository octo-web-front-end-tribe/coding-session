import React, { Component } from 'react';

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)
    this.state = { result: [] }

    // Bind this to override context in changeAddress (otherwise this === <input>)
    this.changeAddress = this.changeAddress.bind(this);
  }

  changeAddress(event) {
    const query = event.target.value;

    if (!query.length) {
      return this.setState({ result: [] });
    }

    fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`, { method: 'get' })
      .then((response) => {
        return response
          .json()
          .then(json => {
            const result = json.features.map((feature) => ({
              coordinates: feature.geometry.coordinates,
              label: feature.properties.label,
            }));

            this.setState({ result });
          });
      })
      .catch((err) => {
        this.setState({ result: [], err });
      });
  }

  renderItem(item, idx) {
    return (
      <li key={idx}>
        {item.label}
      </li>
    );
  }

  renderResult(err, data) {
    if (err) {
      return <div>{ err.message }</div>
    }

    return <ul>{ data.map(this.renderItem) }</ul>
  }

  render() {
    return (
      <div>
        <label htmlFor="address">Enter an address : </label>
        <input onChange={this.changeAddress} className="test" id="address" />

        { this.renderResult(this.state.err, this.state.result) }
      </div>
    );
  }
}

export default AutocompleteInput;
