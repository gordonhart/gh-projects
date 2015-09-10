
document.addEventListener('DOMContentLoaded', function () {
	console.log('loaded!')
    document.getElementById('notepad').addEventListener('blur', saveChanges);
});

function saveChanges() {
	/* Use AJAX to send changes back to the backend */
	console.log('saveChanges!');

	var notes = document.getElementById('notepad').value;
	out = {
		text: notes
	}

	$.getJSON('/notepad/save', out, function(data) { // return HTML for new container
		console.log(data.notes);
//		document.getElementById('notepad').value = data.notes;
		//console.log("edit_modify_block() changed block: " + id);
	});	

}