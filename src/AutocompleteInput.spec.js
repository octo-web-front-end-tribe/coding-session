import React from 'react';
import { shallow } from 'enzyme';
import Autosuggest from 'react-autosuggest';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import AutocompleteInput from './AutocompleteInput';

describe('AutocompleteInput', () => {
  before(() => {
    return fetchMock.get('https://api-adresse.data.gouv.fr/search/?q=paris', {
      features: [
        {
          properties: {
            label: 'Paris, 75017'
          },
          geometry: {
            coordinates: [1.2345678, 1.2345678]
          }
        }
      ]
    });
  });

  afterEach(() => {
    return fetchMock.reset();
  });

  it('Should have an Autosuggest element for the address', () => {
    //when
    const wrapper =
      shallow(<AutocompleteInput />)
      .setState({
        inputValue: 'paris'
      });

    //then
    expect(wrapper.find(Autosuggest)).to.have.length(1);
  });

  it('Should display an input in Autosuggest element', () => {
    //when
    const wrapper =
      shallow(<AutocompleteInput />)
        .setState({
          result: [{label: 'Paris, 75017', coordinates: [1.2345678, 1.2345678]}]
        });

    //then
    const autosuggest = wrapper.find(Autosuggest).render();
    const inputWrapper = autosuggest.find('.react-autosuggest__input');
    expect(inputWrapper).to.have.length(1);
    // inputWrapper.simulate('change', {target: {value: 'paris'}});
  });

  it('Should update state on fetch', () => {
    //given
    const wrapper = shallow(<AutocompleteInput/>);

    //when
    return wrapper
      .instance()
      .changeAddress({value: 'paris'})
      //then
      .then(() => {
        expect(fetchMock.calls().matched).to.have.length(1);
        expect(wrapper.state().result).to.deep.equal([{label: 'Paris, 75017', coordinates: [1.2345678, 1.2345678]}]);
      });
  });
});
