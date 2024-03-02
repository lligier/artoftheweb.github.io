function selectBook(elem){
	var myId = elem.id; // book-1
	
	// max
	var maxBooksCnt = 5;
	for (let i = 1; i <= maxBooksCnt; i++) {
		var dimElemId = "book-" + i + "-notebook"; //book-1-notebook
		var noteElemId = "note-" + i + "-summary"; // note-1-summary
		var dimElem = document.getElementById(dimElemId);
		var noteElem = document.getElementById(noteElemId);
		
		// check which book we selected.
		if (myId.includes(i)){  
			
			// undim the selected book
			dimElem.style.opacity = "unset";
			
			// show the note for the selected book
			noteElem.style.visibility = "visible";
			noteElem.style.display = "block";
	
			noteElem.scrollIntoView();
			
		}else{
			
			// dim unselected book
			dimElem.style.opacity = 0.2;
			
			// hide the note for the unselected book
			noteElem.style.visibility = "hidden";
			noteElem.style.display = "none";
		}
		
		// show the button "Go to Top"
		var moveToTopElem = document.getElementById("moveTop");
		moveToTopElem.style.visibility = "visible";
		moveToTopElem.style.display = "block";
	}
	
	
}

function moveToTop(){
	window.scrollTo(0,0);
}