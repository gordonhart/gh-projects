//////////////////////////////////////
////// IMAGE CLICKS //////////////////
//////////////////////////////////////

function spotlight(image_source){
	/*
	This function toggles isolation view mode for images in the gallery.
	*/
	var overlay = document.getElementById("gallery-overlay"); // fixed-position div covering full screen
	var image = document.getElementById("gallery-overlay-image");

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

document.addEventListener('click', function() {
	var overlay = document.getElementById("gallery-overlay");

//	console.log(event.target.tagName);
	if(event.target.tagName != 'IMG') { // click was outside image, hide overlay

		if(overlay.classList.contains('active')) { // remove active from any click
			overlay.style.opacity = 0.0;
			overlay.style.zIndex = -1;

			overlay.classList.remove('active');

			console.log('remove');
		}
	}
});


//////////////////////////////////////
////// SIDEBAR ///////////////////////
//////////////////////////////////////

window.onload = function(){
	/*
	This function populates the sidebar accompanying the gallery.
	*/

	var gallery_main = document.getElementById("gallery-main"); // fixed-position div covering full screen
	var gallery_side = document.getElementById("gallery-side");

	var items = gallery_main.children;

	for(var i=0; i<items.length; i++){
		var new_node = cloneAndScale(items[i]);

		if(!new_node.classList.contains("no-side")){
			gallery_side.appendChild(new_node);
		}
	}

	document.getElementById("gallery-main").addEventListener('scroll', follow); // add scroll listener to main div
	document.getElementById("gallery-side").addEventListener('scroll', follow); // add scroll listener to side div

	// enable button to hide the loading screen
	loadComplete();
};

function cloneAndScale(el){
	var node = el.cloneNode(true);

	node.removeAttribute("id");
	node.removeAttribute("href");
	node.removeAttribute("onclick");

	node.classList.add("gallery-side-el");

	var node_children = node.querySelectorAll("*"); // get all child nodes
	for(var i=0; i<node_children.length; i++){ // apply changes to all child nodes as well
		node_children[i].removeAttribute("id");
		node_children[i].removeAttribute("href");
		node_children[i].removeAttribute("onclick");

	 	node_children[i].classList.add("gallery-side-el");
	}

	return node;
}

function follow(){
	var leader_name = "#gallery-";
	var follow_name = "#gallery-";

	if($("#gallery-main").is(':hover')){ // currently scrolling in the main section
		leader_name += "main";
		follow_name += "side";
	} else { // currenlty scrolling in the side section
		leader_name += "side";
		follow_name += "main";
	}

	if($(leader_name).is(':hover')){ // only do if hovered to get rid of echo/feedback between the two
		var leader_height = $(leader_name)[0].scrollHeight; // this gets the total height of div
		var follow_height = $(follow_name)[0].scrollHeight;

		// calculate and compensate for the height of the scrollbar
		var leader_bar_height = (window.innerHeight/leader_height)*leader_height;
		var follow_bar_height = (window.innerHeight/follow_height)*follow_height;
//		console.log("lead: " + leader_bar_height + ", follow: " + follow_bar_height);
		leader_height -= leader_bar_height;
		follow_height -= follow_bar_height;

		var lead_position = $(leader_name).scrollTop(); // current position of the div being scrolled
		var ratio = follow_height/leader_height;

		$(follow_name).scrollTop(ratio*lead_position);
	}
}

function loadComplete(){
/*	document.getElementById("gallery-welcome-button").style.display = 'block'; */
	var loading = document.getElementsByClassName("loading");
	var loaded = document.getElementsByClassName("loaded");

	for(var i=0; i<loading.length; i++){ // hide loading objects
		loading[i].style.display = 'none';
	}
	for(var i=0; i<loaded.length; i++){ // show loaded objects
		loaded[i].style.display = 'block';
	}
}

function hideWelcome(){
//	document.getElementById("gallery-welcome").style.display = "none"; // this one works too, but no animation
	document.getElementById("gallery-welcome").classList.add("slide-up");
	document.getElementById("foot").classList.add("slide-down");
}