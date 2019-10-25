class ModalWindow {
	addCloseEvent() {
		document
			.querySelector(".closeModalButton")
			.addEventListener("click", function() {
				const modal = document.querySelector(".modalWindow-open");
				modal.classList.toggle("modalWindow-open");
				modal.classList.toggle("modalWindow");
			});
	}
}

export default ModalWindow;
