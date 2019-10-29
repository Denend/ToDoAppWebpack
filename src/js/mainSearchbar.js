import store from './redux/configureStore';
import ModalWindow from './modalWindow';
// const { store, persistor } = storeCB();

class SearchBar extends ModalWindow {
  autoFealEvent(state) {
    document.querySelector('#inputSection-suggestions').innerHTML = '';
    state.notes.forEach((elem) => {
      const option = document.createElement('option');
      option.value = elem.title;
      document.querySelector('#inputSection-suggestions').appendChild(option);
    });
  }

  checkIfEmpty(arrayProt) {
    return arrayProt.filter((elem) => Object.values(elem)[0]).length;
  }

  formSubmitEvent(event) {
    let payload = [];
    let { notes } = store.getState();
    const activeFilters = [];

    event.preventDefault();
    activeFilters.push({
      title: event.target.querySelector('.inputSection-inputTitle').value,
    });
    activeFilters.push({
      status: event.target.querySelector('.inputSection-statusSelect').value,
    });

    activeFilters.push({
      priority: event.target.querySelector('.inputSection-prioritySelect').value,
    });

    if (!this.checkIfEmpty(activeFilters)) {
      store.dispatch({ type: 'UNSET_FILTERS' });
    }

    activeFilters.forEach((filter) => {
      const filterArr = Object.entries(filter)[0];
      const key = filterArr[0];
      const value = filterArr[1];
      if (filter[key]) {
        store.dispatch({ type: 'SET_FILTERS' });
        payload = [...notes.filter((elem) => elem[key] === value)];
        notes = payload;
      }
    });

    if (!payload.length) {
      super.createAlertElem('No notes with these search params');
    }

    store.dispatch({ type: 'FILTER_NOTES', payload });
  }

  addSubmitEvent() {
    document
      .querySelector('.inputSection')
      .addEventListener('submit', (event) => this.formSubmitEvent(event));
    document
      .querySelector('.inputSection-statusSelect')
      .addEventListener('change', () => {
        document.querySelector('.submitSearchbar').click();
      });
    document
      .querySelector('.inputSection-prioritySelect')
      .addEventListener('change', () => {
        document.querySelector('.submitSearchbar').click();
      });

    document
      .querySelector('.inputSection-inputTitle')
      .addEventListener('keyup', () => {
        document.querySelector('.submitSearchbar').click();
      });
  }

  openModalEvent(defaultValues) {
    const modal = document.querySelector('.modalWindow');
    modal.classList.toggle('modalWindow');
    modal.classList.toggle('modalWindow-open');
    const description = defaultValues ? defaultValues.description : '';
    const title = defaultValues ? defaultValues.title : '';
    modal.querySelector('#description').value = description;
    modal.querySelector('#title').value = title;
  }

  addButtonEvent() {
    document
      .querySelector('.createButton')
      .addEventListener('click', () => this.openModalEvent());
  }
}

export default SearchBar;
