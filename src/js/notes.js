import store from './redux/configureStore';
import SearchBar from './mainSearchbar';

class Notes extends SearchBar {
  dleteNoteEvent(e, state) {
    const { isFiltered, notes } = state;
    const noteId = e.target.parentNode.id;
    const payload = notes.filter((elem) => elem.id !== noteId);
    store.dispatch({ type: 'DELETE_NOTE', payload });
    if (isFiltered) document.querySelector('.submitSearchbar').click();
  }

  editNoteStatus(e, state) {
    const { isFiltered, notes } = state;
    const noteId = e.target.parentNode.id;
    const payload = notes.map((elem) => {
      if (elem.id === noteId) {
        const status = 'done';
        return {
          ...elem,
          status,
        };
      }
      return elem;
    });
    store.dispatch({ type: 'EDIT_NOTE', payload });
    if (isFiltered) document.querySelector('.submitSearchbar').click();
  }

  editNoteEvent(e, state) {
    const { notes } = state;
    const noteId = e.target.parentNode.id;
    const currentNote = notes.filter((elem) => elem.id === noteId);

    const { title, description, status } = currentNote[0];
    const payload = {
      title,
      description,
      noteId,
      status,
    };

    store.dispatch({ type: 'TOGGLE_EDIT_MODE' });
    store.dispatch({ type: 'ADD_NOTE_TO_EDIT', payload });
    super.openModalEvent(payload);
  }

  markAsEvent(event, state) {
    switch (event.target.value) {
      case 'done':
        this.editNoteStatus(event, state);
        break;
      case 'edit':
        this.editNoteEvent(event, state);
        break;
      case 'delete':
        this.dleteNoteEvent(event, state);
        break;
      default:
    }
  }
}

export default Notes;
