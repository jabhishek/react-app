import { ADD_SALES_DATA } from '../constants';
export const initialData = [];

export default function (state = initialData, action) {
  if (!action || !action.type) return state;
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case ADD_SALES_DATA: {
      if (Array.isArray(action.payload)) {
        return [...state, ...action.payload];
      }
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
