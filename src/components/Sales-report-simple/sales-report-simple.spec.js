import React from 'react';
import { shallow } from 'enzyme';
import { SalesReport } from './sales-report-simple';
import { expect } from 'chai';

describe('SalesReport', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SalesReport />);
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });
});
