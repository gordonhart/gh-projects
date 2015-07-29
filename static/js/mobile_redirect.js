window.onload = function() {
	console.log(window.innerWidth);

	if (window.innerWidth <= 1050) {
		window.location = "/mobile";
	}
}