function expand(clicked){
	/*
	This function toggles the expansion of clicked 'language proficiency' bars.
	*/
	var bars = document.getElementsByClassName('lang-wrapper');

	for(var i=0; i<bars.length; i++) {
		if(bars[i] == clicked){
			if(clicked.classList.contains('display')) {
				clicked.classList.remove('display');
			} else {
				clicked.classList.add('display');
			}
		} else {
			bars[i].classList.remove('display');
		}
	}
}