import salesDataReducer, { initialData } from './sales-data';
import { ADD_SALES_DATA } from '../constants';
import { expect } from 'chai';

describe('sales data reducer', () => {
  it('should return default state if no state passed', () => {
    expect(salesDataReducer()).to.deep.equal(initialData);
  });
  it('should return default state if no action passed', () => {
    expect(salesDataReducer([])).to.deep.equal([]);
  });
  it('should return default state if action has no type passed', () => {
    expect(salesDataReducer([], {})).to.deep.equal([]);
  });

  describe('Add sales data', () => {
    it('should add sales data', () => {
      const salesData = [{ _id: 2, todo: 'TEST2' }];
      expect(salesDataReducer([], { type: ADD_SALES_DATA, payload: salesData })).to.deep.equal(salesData);
      expect(salesDataReducer(initialData, { type: ADD_SALES_DATA, payload: salesData }))
          .to.deep.equal(salesData);
    });
  });
});
