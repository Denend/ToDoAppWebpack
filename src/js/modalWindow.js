import storeCB from "./redux/configureStore";
const { store } = storeCB();

class ModalWindow {
	appendNoteEvent() {}
	closeModal() {
		const modal = document.querySelector(".modalWindow-open");
		modal.classList.toggle("modalWindow-open");
		modal.classList.toggle("modalWindow");
	}
	resetForm() {
		document.querySelector("#description").value = "";
		document.querySelector("#title").value = "";
		document.querySelector("#priority").value = "";
	}

	addCloseEvent() {
		document
			.querySelector(".closeModalButton")
			.addEventListener("click", function() {
				const modal = document.querySelector(".modalWindow-open");
				modal.classList.toggle("modalWindow-open");
				modal.classList.toggle("modalWindow");
			});
	}

	handlSubmit(event) {
		event.preventDefault();
		const description = event.target.querySelector("#description").value;
		const title = event.target.querySelector("#title").value;
		const priority = event.target.querySelector("#priority").value;
		const payload = {
			description,
			title,
			priority
		};
		store.dispatch({ type: "ADD_NOTE", payload: payload });
		this.appendNoteEvent();
		this.resetForm();
		this.closeModal();
	}

	addSubmitEvent() {
		document
			.querySelector(".modalWindow")
			.addEventListener("submit", event => this.handlSubmit(event));
	}
}

export default ModalWindow;
