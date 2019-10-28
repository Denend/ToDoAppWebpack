import store from "./redux/configureStore";
import { subscribe } from "redux-subscriber";
// const { store, persistor } = storeCB();

class SearchBar {
	autoFealEvent(state) {
		document.querySelector("#inputSection-suggestions").innerHTML = "";
		state.notes.forEach(elem => {
			let option = document.createElement("option");
			option.value = elem.title;
			document.querySelector("#inputSection-suggestions").appendChild(option);
		});
	}

	filterByTitle() {}

	filterByStatus() {}

	filterByPriority() {}

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

	addButtonEvent() {
		document.querySelector(".createButton").addEventListener("click", e => {
			const modal = document.querySelector(".modalWindow");
			modal.classList.toggle("modalWindow");
			modal.classList.toggle("modalWindow-open");
		});
	}
}

export default SearchBar;
