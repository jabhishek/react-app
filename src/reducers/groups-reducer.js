const initialState = {
	groupBy: ['Size'],
	summaryBy: 'Manufacturer'
};

export const groupsReducer = (state = initialState, action) => {
	if (!action || !action.type) return state;
	if (!action.payload) {
		return state;
	}
	switch (action.type) {
		case ADD_GROUP_BY: {
			if (Array.isArray(action.payload)) {
				return [...state, ...action.payload];
			}
			return [...state, action.payload];
		}
		default:
			return state;
	}
};