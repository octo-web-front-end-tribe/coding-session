import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)
    this.state = { result: [], inputValue: '' };

    // Bind this to override context in changeAddress (otherwise this === <input>)
    this.changeAddress = this.changeAddress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({
      inputValue: newValue,
    });
  }

  getSuggestionValue(suggestion) {
    return suggestion.label;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.label}</span>
    );
  }

  changeAddress({value}) {
    if (!value.length) {
      return this.setState({ result: [] });
    }

    return fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}`, { method: 'get' })
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

  onSuggestionsClearRequested() {
    this.setState({
      result: []
    });
  }

  render() {
    const inputProps = {
      placeholder: 'Ex: 50 avenue des champs élysées',
      value: this.state.inputValue,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={this.state.result}
        onSuggestionsFetchRequested={this.changeAddress}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutocompleteInput;
