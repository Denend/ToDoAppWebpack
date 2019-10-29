import '../styles/index.scss';
import ModalWindow from './modalWindow';
import SearchBar from './mainSearchbar';
import Notes from './notes';
import store from './redux/configureStore';

// const { store } = storeCB();
const modalClass = new ModalWindow();
const searchBar = new SearchBar();
const notesClass = new Notes();

function createNoteList(state) {
  const { notes, isFiltered, filteredNotes } = state;
  const noteOptions = ['default', 'done', 'edit', 'delete'];

  const storeNotes = isFiltered ? filteredNotes : notes;
  return storeNotes.map((elem) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('noteItem');
    noteElement.id = elem.id;
    const closeElem = document.createElement('a');
    closeElem.innerHTML = '&times;';
    closeElem.classList.add('closeButton');
    closeElem.target = '_self';
    closeElem.onclick = () => notesClass.dleteNoteEvent(event, state);

    const select = document.createElement('select');
    select.classList.add('selectStatus');
    select.onchange = () => notesClass.markAsEvent(event, state);

    noteOptions.forEach((option) => {
      const optionElem = document.createElement('option');
      if (option === 'default') {
        optionElem.default;
        optionElem.selected;
        optionElem.value = '';
        optionElem.innerHTML = '-----';
      } else {
        optionElem.innerHTML = option;
        optionElem.value = option;
      }
      select.appendChild(optionElem);
    });

    const noteHTML = `<p class=${elem.status}>&#10004;</p><h3 >${elem.title}</h3><p class="description">${elem.description}</p>
        <div class="noteItem-footer"><span class=${elem.priority}>Priority:${elem.priority}</span></div>`;

    noteElement.innerHTML = noteHTML;
    noteElement.appendChild(closeElem);
    noteElement.appendChild(select);
    return noteElement;
  });
}

function render() {
  const state = store.getState();
  const notesArray = createNoteList(state);
  document.querySelector('.toDoSection').innerHTML = '';
  notesArray.forEach((element) => {
    document.querySelector('.toDoSection').appendChild(element);
  });
  searchBar.autoFealEvent(state);
}

store.subscribe(render);

searchBar.addSubmitEvent();
searchBar.addButtonEvent();
modalClass.addCloseEvent();
modalClass.addSubmitEvent();
