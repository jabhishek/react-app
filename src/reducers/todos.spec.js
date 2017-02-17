import todoReducer, { initialTodos } from './todos';
import { ADD_TODO } from '../constants';
import { expect } from 'chai';

describe('todos reducer', () => {
  it('should return default state if no state passed', () => {
    expect(todoReducer()).to.deep.equal(initialTodos);
  });
  it('should return default state if no action passed', () => {
    expect(todoReducer([])).to.deep.equal([]);
  });
  it('should return default state if action has no type passed', () => {
    expect(todoReducer([], {})).to.deep.equal([]);
  });

  describe('Add todos', () => {
    it('should add todos', () => {
      const todosAdded = { _id: 2, todo: 'TEST2' };
      expect(todoReducer([], { type: ADD_TODO, payload: todosAdded })).to.deep.equal([todosAdded]);
      expect(todoReducer(initialTodos, { type: ADD_TODO, payload: todosAdded }))
          .to.deep.equal([...initialTodos, todosAdded]);
    });
  });
});
