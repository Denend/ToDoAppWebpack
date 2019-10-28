const initialState = {
	notes: [],
	filteredNotes: [],
	isFiltered: false
};
function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case "ADD_NOTE":
			return {
				...state,
				// ...initialState,
				notes: [...state.notes, payload]
			};
		case "DELETE_NOTE":
			return {
				...state,
				// ...initialState,
				notes: [...payload]
			};
		case "SET_FILTERS": {
			return {
				...state,
				isFiltered: true
			};
		}
		case "FILTER_NOTES":
			return {
				...state,
				filteredNotes: payload
			};
		default:
			return state;
	}
}

export default reducer;
