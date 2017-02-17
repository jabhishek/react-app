import React from 'react';
import { shallow } from 'enzyme';
import Todos from './todos';
import { expect } from 'chai';

describe('Todos', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Todos />);
  });

  it('should exist', () => {
    expect(wrapper.prop('children')).to.equal('Todos');
  });
});
