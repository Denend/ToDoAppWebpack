import store from "./redux/configureStore";
// const { store } = storeCB();

class ModalWindow {
	closeModal() {
		const modal = document.querySelector(".modalWindow-open");
		modal.classList.toggle("modalWindow-open");
		modal.classList.toggle("modalWindow");
		if (store.getState().isEditMode)
			store.dispatch({ type: "TOGGLE_EDIT_MODE" });
	}
	resetForm() {
		document.querySelector("#description").value = "";
		document.querySelector("#title").value = "";
	}

	addCloseEvent() {
		document
			.querySelector(".closeModalButton")
			.addEventListener("click", function() {
				const modal = document.querySelector(".modalWindow-open");
				modal.classList.toggle("modalWindow-open");
				modal.classList.toggle("modalWindow");
				if (store.getState().isEditMode)
					store.dispatch({ type: "TOGGLE_EDIT_MODE" });
			});
	}

	createAlertElem(msg) {
		let alertElem = document.createElement("div");
		alertElem.innerHTML = msg;
		alertElem.classList.add("sideAlert");
		document.body.appendChild(alertElem);
	}

	getValidationMsg(desc, title) {
		let message = "";

		if (desc.length < 1) message = "description can't be emplty";

		if (desc.length > 140) message = "too long description";

		if (title.length < 1) message = "title can't be emplty";

		if (title.length > 60) message = "too title";

		if (message) {
			this.createAlertElem(message);
		}

		return message;
	}

	handlSubmit(event) {
		event.preventDefault();
		const { isEditMode, isFiltered, notes, noteToEdit } = store.getState();
		const { status, noteId, title, description } = noteToEdit;

		const currDescription = event.target.querySelector("#description").value;
		const currTitle = event.target.querySelector("#title").value;
		const currPriority = event.target.querySelector("#priority").value;
		if (!this.getValidationMsg(currDescription, currTitle)) {
			if (!isEditMode) {
				let number = Math.random();
				number.toString(36);
				const id = number.toString(36).substr(2, 9);
				const payload = {
					description: currDescription,
					title: currTitle,
					priority: currPriority,
					id,
					status: "open"
				};
				store.dispatch({ type: "ADD_NOTE", payload: payload });
			} else {
				const noteStatus = status ? status : "open";
				const payload = notes.map(elem => {
					if (elem.id === noteId) {
						elem.status = noteStatus;
						elem.description = currDescription;
						elem.title = currTitle;
						elem.priority = currPriority;
					}
					return elem;
				});
				store.dispatch({ type: "EDIT_NOTE", payload: payload });
				if (isFiltered) document.querySelector(".submitSearchbar").click();
				store.dispatch({ type: "TOGGLE_EDIT_MODE" });
			}
			this.resetForm();
			this.closeModal();
		}
	}

	// handlSubmitEditMode(event, noteId, noteStatus) {
	// 	event.preventDefault();
	// 	const { isFiltered, notes } = store.getState();
	// 	const description = event.target.querySelector("#description").value;
	// 	const title = event.target.querySelector("#title").value;
	// 	const status = noteStatus ? noteStatus : "open";
	// 	const payload = notes.map(elem => {
	// 		if (elem.id === noteId) {
	// 			elem.status = status;
	// 			elem.description = description;
	// 			elem.title = title;
	// 		}
	// 		return elem;
	// 	});

	// 	store.dispatch({ type: "EDIT_NOTE", payload: payload });
	// 	if (isFiltered) document.querySelector(".submitSearchbar").click();
	// 	this.resetForm();
	// 	this.closeModal();
	// 	store.dispatch({ type: "TOGGLE_EDIT_MODE" });
	// }

	addSubmitEvent() {
		document
			.querySelector(".modalWindow")
			.addEventListener("submit", event => this.handlSubmit(event));
	}
}

export default ModalWindow;
