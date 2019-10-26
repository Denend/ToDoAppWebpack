import "../styles/index.scss";
import ModalWindow from "./ModalWindow";
import SearchBar from "./mainSearchbar";
import Notes from "./notes";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "./redux/reducer";

// const handleFormSubmit = event => {
// 	event.preventDefault();
// 	const form = document.getElementsByClassName("inputSection")[0];
// 	alert(form);
// };

const store = createStore(reducer, applyMiddleware(logger));

function createNoteList() {
	const storeNotes = store.getState().notes;
	return storeNotes.map(elem => {
		let noteElement = document.createElement("div");
		noteElement.classList.add("noteItem");
		const noteHTML = `<h3>${elem.title}</h3>`;
		noteElement.innerHTML = noteHTML;
		return noteElement;
	});
}

function render() {
	const notesArray = createNoteList();
	document.querySelector(".toDoSection").innerHTML = "";
	notesArray.forEach(element => {
		document.querySelector(".toDoSection").appendChild(element);
	});
}
store.subscribe(render);

const modalClass = new ModalWindow();
const searchBar = new SearchBar();
const notesClass = new Notes();
// notesClass.onStoreChange();
searchBar.addSubmitEvent();
searchBar.addButtonEvent();
modalClass.addCloseEvent();
modalClass.addSubmitEvent();

export default store;
