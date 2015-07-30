mobile_redirect(); // apply redirection to mobile site if screen size is too small

window.onload = function(){
	/*
	This function ensures that blocks are not displayed before they have finished
	loading. It does so by adding the "transition-in" class which will fade the 
	block in and override its opacity to make it visible.
	*/

	var title = document.getElementById("title-text");
	var block = document.getElementById("content-section");

	if(title){ // only add class if the element exists
		title.classList.add("transition-in");
	} else if(block) {
		block.classList.add("transition-in");
	}
}

function mobile_redirect() { /* used to be held in "mobile_redirect.js" */
	console.log(window.innerWidth);

	if (window.innerWidth <= 1050) {
		window.location = "/mobile";
	}
}