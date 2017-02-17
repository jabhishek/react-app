import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from './page-header';
import { expect } from 'chai';

describe('PageHeader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PageHeader />);
  });

  it('contains a header text', () => {
    expect(wrapper.find('h1').length).to.equal(1);
  });

  it('contains a header with text Todos Manager', () => {
    expect(wrapper.find('h1').text()).to.deep.equal('Todos Manager');
  });
});
