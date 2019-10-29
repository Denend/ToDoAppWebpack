import store from "./redux/configureStore";
import { subscribe } from "redux-subscriber";
import ModalWindow from "./ModalWindow";
// const { store, persistor } = storeCB();

class SearchBar extends ModalWindow {
	autoFealEvent(state) {
		document.querySelector("#inputSection-suggestions").innerHTML = "";
		state.notes.forEach(elem => {
			let option = document.createElement("option");
			option.value = elem.title;
			document.querySelector("#inputSection-suggestions").appendChild(option);
		});
	}

	checkIfEmpty(arrayProt) {
		return arrayProt.filter(elem => Object.values(elem)[0]).length;
	}

	formSubmitEvent(event) {
		let payload = [];
		let notes = store.getState().notes;
		let activeFilters = [];

		event.preventDefault();
		activeFilters.push({
			title: event.target.querySelector(".inputSection-inputTitle").value
		});
		activeFilters.push({
			status: event.target.querySelector(".inputSection-statusSelect").value
		});

		activeFilters.push({
			priority: event.target.querySelector(".inputSection-prioritySelect").value
		});

		if (!this.checkIfEmpty(activeFilters)) {
			store.dispatch({ type: "UNSET_FILTERS" });
		}

		activeFilters.forEach(filter => {
			const localNotes = notes;
			const filterArr = Object.entries(filter)[0];
			const key = filterArr[0];
			const value = filterArr[1];
			if (filter[key]) {
				store.dispatch({ type: "SET_FILTERS" });
				payload = [
					...notes.filter(elem => {
						return elem[key] === value;
					})
				];
				notes = payload;
			}
		});

		if (!payload.length) {
			super.createAlertElem("No notes with these search params");
		}

		store.dispatch({ type: "FILTER_NOTES", payload: payload });
	}

	addSubmitEvent() {
		document
			.querySelector(".inputSection")
			.addEventListener("submit", event => this.formSubmitEvent(event));
		document
			.querySelector(".inputSection-statusSelect")
			.addEventListener("change", event => {
				document.querySelector(".submitSearchbar").click();
			});
		document
			.querySelector(".inputSection-prioritySelect")
			.addEventListener("change", event => {
				document.querySelector(".submitSearchbar").click();
			});

		document
			.querySelector(".inputSection-inputTitle")
			.addEventListener("keyup", event => {
				document.querySelector(".submitSearchbar").click();
			});
	}

	openModalEvent(defaultValues) {
		const modal = document.querySelector(".modalWindow");
		console.log(modal.classList);
		modal.classList.toggle("modalWindow");
		modal.classList.toggle("modalWindow-open");
		console.log(modal.classList);
		const description = defaultValues ? defaultValues.description : "";
		const title = defaultValues ? defaultValues.title : "";
		modal.querySelector("#description").value = description;
		modal.querySelector("#title").value = title;
	}

	addButtonEvent() {
		document
			.querySelector(".createButton")
			.addEventListener("click", e => this.openModalEvent());
	}
}

export default SearchBar;
