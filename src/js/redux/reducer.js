const initialState = {
  notes: [],
  filteredNotes: [],
  isFiltered: false,
  isEditMode: false,
  noteToEdit: {},
};
function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, payload],
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: [...payload],
      };
    case 'SET_FILTERS': {
      return {
        ...state,
        isFiltered: true,
      };
    }
    case 'UNSET_FILTERS': {
      return {
        ...state,
        isFiltered: false,
      };
    }
    case 'FILTER_NOTES':
      return {
        ...state,
        filteredNotes: payload,
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: [...payload],
      };
    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        isEditMode: !state.isEditMode,
      };
    case 'ADD_NOTE_TO_EDIT':
      return {
        ...state,
        noteToEdit: payload,
      };

    default:
      return state;
  }
}

export default reducer;
