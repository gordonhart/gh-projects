function spotlight(image_source){
	/*
	This function toggles isolation view mode for images in the gallery.
	*/
	var overlay = document.getElementById("overlay"); // fixed-position div covering full screen
	var image = document.getElementById("overlay-image");

	image.src = image_source; // set the new spotlight image

	if(overlay.classList.contains("active")){ // if it's currently being viewed, hide it
		overlay.style.opacity = 0.0;
		overlay.style.zIndex = -1;

		overlay.classList.remove("active");
	} else { // else show the image
		overlay.style.opacity = 1.0;
		overlay.style.zIndex = 1;

		overlay.classList.add("active");
	}
}