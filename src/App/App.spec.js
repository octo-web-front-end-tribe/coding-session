import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';
import AutocompleteInput from '../AutocompleteInput/AutocompleteInput';

describe('App', () => {
  it('Shows the input', () => {
    expect(shallow(<App />).find(AutocompleteInput)).to.have.length(1);
  });

  it('Should update the coordinates and zoom level when handleUserInput is called', () => {
    const suggestion = {
      suggestion: {
        coordinates: [8.7654321, 8.7654321],
      },
    };
    const wrapper = shallow(<App />);

    wrapper
      .instance()
      .onSuggestionSelected(null, suggestion);

    const state = wrapper.state();

    expect(state.lat).to.equal(8.7654321);
    expect(state.long).to.equal(8.7654321);
    expect(state.zoom).to.equal(14);
  });
});
