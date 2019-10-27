const initialState = {
	notes: []
};
function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case "ADD_NOTE":
			return {
				...state,
				...initialState,
				notes: [...state.notes, payload]
			};
		case "DELETE_NOTE":
			return {
				...state,
				...initialState,
				notes: [...payload]
			};
		default:
			return state;
	}
}

export default reducer;
