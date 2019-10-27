import "../styles/index.scss";
import ModalWindow from "./ModalWindow";
import SearchBar from "./mainSearchbar";
import Notes from "./notes";
import store from "./redux/configureStore";
import watch from "redux-watch";
import { subscribe } from "redux-subscriber";

// const { store } = storeCB();
const modalClass = new ModalWindow();
const searchBar = new SearchBar();
const notesClass = new Notes();

function createNoteList(state) {
	let storeNotes = state.notes;
	return storeNotes.map((elem, index) => {
		let noteElement = document.createElement("div");
		noteElement.classList.add("noteItem");
		noteElement.id = elem.id;
		let closeElem = document.createElement("a");
		closeElem.innerHTML = "&times;";
		closeElem.classList.add("closeButton");
		closeElem.target = "_self";
		closeElem.onclick = () => notesClass.dleteNoteEvent(event, state);

		const noteHTML = `<h3 >${elem.title}</h3><p class="description">${elem.description}</p>
        <div class="noteItem-footer"><span class=${elem.priority}>Priority:${elem.priority}</span><select class="selectStatus">	
        <option value="default" disabled selected>-----</option>
        <option value="done">done</option>
		<option value="edit">edit</option>
        <option value="delete">delete</option></select></div>`;
		noteElement.innerHTML = noteHTML;
		noteElement.appendChild(closeElem);
		return noteElement;
	});
}

function render(state) {
	let notesArray = createNoteList(state);
	document.querySelector(".toDoSection").innerHTML = "";
	notesArray.forEach(element => {
		document.querySelector(".toDoSection").appendChild(element);
	});
	searchBar.autoFealEvent(state);
}

subscribe("notes", state => render(state));

searchBar.addSubmitEvent();
searchBar.addButtonEvent();
modalClass.addCloseEvent();
modalClass.addSubmitEvent();
// notesClass.addDeleteNoteEvent();
