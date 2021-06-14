export function renderLoading(element, text, attribute) {
	element.innerText = text;
	if (attribute === 'disabled') {
		element.setAttribute("disabled", "disabled");
	} else {
		element.removeAttribute("disabled");
	}
}

