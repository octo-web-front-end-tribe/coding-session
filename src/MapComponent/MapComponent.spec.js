import React from 'react';
import { shallow } from 'enzyme';
import MapComponent from './MapComponent';
import { expect } from 'chai';
import { Map } from 'react-leaflet';

describe('MapComponent', () => {
  it('Should have an element named Map', () => {
    const wrapper = shallow(<MapComponent />);
    expect(wrapper.find(Map)).to.have.length(1);
  });
});
