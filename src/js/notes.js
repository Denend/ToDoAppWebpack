import store from "./redux/configureStore";
// const { store } = returnStoreAndPersistor();

class Notes {
	dleteNoteEvent(e, state) {
		const noteId = e.target.parentNode.id;
		const payload = state.notes.filter(elem => elem.id !== noteId);
		store.dispatch({ type: "DELETE_NOTE", payload: payload });
	}
}

export default Notes;
