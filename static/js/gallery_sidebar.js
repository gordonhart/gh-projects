function construct_gallery(){
	/*
	This function populates the sidebar accompanying the gallery.
	*/
	console.log("construct called");

	var gallery_main = document.getElementById("gallery-main"); // fixed-position div covering full screen
	var gallery_side = document.getElementById("gallery-side");

	var items = gallery_main.children;

	for(var i=0; i<items.length; i++){
		var temp = items[i].cloneNode(true);

		temp.removeAttribute("id");
		temp.removeAttribute("href");
		temp.removeAttribute("onclick");

		temp.style.cursor = "pointer";

/*		var fontsize = temp.style.fontSize;
		console.log("font size is: " + fontsize);

		temp.style.fontSize = '0.1rem';
*/
		gallery_side.appendChild(temp);
	}
}

/*
TESTING JQUERY FOR SLIDING PIECE
*/

window.onload = addListeners;

function addListeners(){
    document.getElementById('dxy').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp()
{
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
    var div = document.getElementById('dxy');
  div.style.position = 'absolute';
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
}​