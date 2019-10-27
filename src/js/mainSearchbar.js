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
	addAutofealEvent() {
		subscribe("notes", state => this.autoFealEvent());
	}
	addSubmitEvent() {
		document.querySelector(".inputSection").addEventListener("submit", e => {
			e.preventDefault();
			const form = document.getElementsByClassName("inputSection")[0];
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
