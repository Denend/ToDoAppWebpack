import "../styles/index.scss";
import ModalWindow from "./ModalWindow";
import SearchBar from "./mainSearchbar";

// const handleFormSubmit = event => {
// 	event.preventDefault();
// 	const form = document.getElementsByClassName("inputSection")[0];
// 	alert(form);
// };

const modalClass = new ModalWindow();
const searchBar = new SearchBar();
searchBar.addSubmitEvent();
searchBar.addButtonEvent();
modalClass.addCloseEvent();
