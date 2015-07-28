window.onload = function(){
	/*
	This function populates the sidebar accompanying the gallery.
	*/

	var gallery_main = document.getElementById("gallery-main"); // fixed-position div covering full screen
	var gallery_side = document.getElementById("gallery-side");

	var items = gallery_main.children;

	for(var i=0; i<items.length; i++){
		var new_node = cloneAndScale(items[i]);
		gallery_side.appendChild(new_node);
	}

	//JQUERY ELEMENTs for SLIDER
//	document.getElementById('gallery-hover').addEventListener('mousedown', mouseDown, false);
//	window.addEventListener('mouseup', mouseUp, false);

	document.getElementById("gallery-main").addEventListener('scroll', followMain); // add scroll listener to main div
	document.getElementById("gallery-side").addEventListener('scroll', followSide); // add scroll listener to side div
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

function followMain(){
	if($("#gallery-main").is(':hover')){ // only do if hovered to get rid of echo/feedback between the two
		var main_height = $("#gallery-main")[0].scrollHeight; // this gets the total height of div
		var side_height = $("#gallery-side")[0].scrollHeight;

		var main_position = $("#gallery-main").scrollTop();

		var ratio = side_height/main_height;

		$("#gallery-side").scrollTop(ratio*main_position);
	}
}

function followSide(){
	if($("#gallery-side").is(':hover')){
		var main_height = $("#gallery-main")[0].scrollHeight; // this gets the total height of div
		var side_height = $("#gallery-side")[0].scrollHeight;

		var side_position = $("#gallery-side").scrollTop();

		var ratio = main_height/side_height;

		$("#gallery-main").scrollTop(ratio*side_position);
	}
}

/*******************************
TESTING JQUERY FOR SLIDING PIECE
*******************************/
/*

function mouseUp(){
	window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
	window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
	var div = document.getElementById('gallery-hover');

	if(e.clientY >= 0 && e.clientY <= (window.innerHeight-100)){
		div.style.top = e.clientY + 'px';
	}
}

*/