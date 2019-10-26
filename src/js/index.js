import "../styles/index.scss";
import ModalWindow from "./ModalWindow";
import SearchBar from "./mainSearchbar";
import Notes from "./notes";
import storeCB from "./redux/configureStore";
import watch from "redux-watch";
import { subscribe } from "redux-subscriber";

const { store } = storeCB();

function createNoteList(state) {
	let storeNotes = state.notes;
	return storeNotes.map(elem => {
		let noteElement = document.createElement("div");
		noteElement.classList.add("noteItem");
		const noteHTML = `<a class="closeButton" target="_self">&times;</a>
        <h3>${elem.title}</h3><p class="description">${elem.description}</p>
        <div class="noteItem-footer"><span class=${elem.priority}>Priority:${elem.priority}</span><select class="selectStatus">	
        <option value="done">done</option>
		<option value="edit">edit</option>
        <option value="delete">delete</option></select></div>`;
		noteElement.innerHTML = noteHTML;
		return noteElement;
	});
}

function render(state) {
	let notesArray = createNoteList(state);
	document.querySelector(".toDoSection").innerHTML = "";
	notesArray.forEach(element => {
		document.querySelector(".toDoSection").appendChild(element);
	});
}

subscribe("notes", state => setTimeout(render(state), 1000));

const modalClass = new ModalWindow();
const searchBar = new SearchBar();
const notesClass = new Notes();
searchBar.addSubmitEvent();
searchBar.addButtonEvent();
modalClass.addCloseEvent();
modalClass.addSubmitEvent();
