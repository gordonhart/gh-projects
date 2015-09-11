
document.addEventListener('DOMContentLoaded', function () {
	/* 
	save changes when the text box is clicked away from,
	and when the window is unloaded (closed, navigated away from, etc)
	*/
    document.getElementById('notepad').addEventListener('blur', saveChanges);
    window.addEventListener('beforeunload', saveChanges);
});

function saveChanges() {
	/* Use AJAX to send changes back to the backend */
	var notes = document.getElementById('notepad').value;
	out = {
		text: notes
	}

	// send new notes to backend to save them on the s3 server
	$.getJSON('/notepad/save', out, function(data) { // return HTML for new container
//		console.log(data.notes);
//		document.getElementById('notepad').value = data.notes;
	});	

	return notes; // beforeunload listener needs a return value
}