import { ADD_TODO } from '../constants';

export const initialTodos = [];

export default function (state = initialTodos, action) {
  if (!action || !action.type) return state;
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case ADD_TODO: {
      if (Array.isArray(action.payload)) {
        return [...state, ...action.payload];
      }
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
