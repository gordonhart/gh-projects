mobile_redirect(); // apply redirection to mobile site if screen size is too small

window.onload = function(){
	/*
	This function ensures that blocks are not displayed before they have finished
	loading. It does so by adding the "transition-in" class which will fade the 
	block in and override its opacity to make it visible.
	*/

	var title = document.getElementById("title-text"); // title screen (landing)
	var block = document.getElementById("content-section"); // regular page

	var loader = document.getElementById("loader");

	if(title){ // only add class if the element exists
		title.classList.add("fade-in");
	} else if(block) {
		block.classList.add("fade-in");
//		block.classList.add("slide-in");
	}

	if(loader) { // hide the loader only if it exists
		loader.classList.add("hidden");
	}
}

function mobile_redirect() { /* used to be held in "mobile_redirect.js" */
//	console.log(window.innerWidth);

	if (window.innerWidth <= 1050) {
		window.location = "/mobile"; // redirect to the temporary mobile page if resolution is too small
	}
}