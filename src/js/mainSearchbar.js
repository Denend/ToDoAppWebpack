class SearchBar {
	addSubmitEvent() {
		document.querySelector(".inputSection").addEventListener("submit", e => {
			e.preventDefault();
			const form = document.getElementsByClassName("inputSection")[0];
			console.log(form);
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
