const initialState = {
	notes: []
};
function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case "ADD_NOTE":
			return {
				...initialState,
				notes: [...state.notes, payload]
			};
		case "DECREMENT":
			return state - 1;
		default:
			return state;
	}
}

export default reducer;
