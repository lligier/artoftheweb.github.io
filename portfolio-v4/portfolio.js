/**********************************
* unpack the scramble project code
***********************************/
function unpackCode(){

	var listContentElem = document.getElementById("listContent");
	var messyContentElem = document.getElementById("messyContent");
	
	// show list content
	listContentElem.classList.remove("noshow");
	listContentElem.classList.add("show");
	
	// hide messy content
	messyContentElem.classList.remove("show");
	messyContentElem.classList.add("noshow");

}

/***********************
* Open the project
************************/
function openProj(elem){
	
	var attrData = elem.getAttribute("data");
	var navData = attrData.split(":");
	var prevProj = navData[0];
	var currProj = navData[1];
	var nextProj = navData[2];
	window.location.href = currProj + "/index.html";
}

/**************************
* Redirect to next project
****************************/
function goNextProj(){
	var elem = document.getElementById("navData");
	var attrData = elem.getAttribute("data");
	var navData = attrData.split(":"); // 0:prev,1:curr,2:next
	
	var prevProj = navData[0];
	var currProj = navData[1];
	var nextProj = navData[2];
	var proj = navData[2];
	if (proj=='home'){
		window.location.href = "../index.html";
	}else{
		window.location.href = "../" + proj + "/index.html";
	}
}

/******************************
* redirect to previous project
*******************************/
function goPrevProj(){
	var elem = document.getElementById("navData");
	var attrData = elem.getAttribute("data");
	var navData = attrData.split(":"); // 0:prev,1:curr,2:next
	
	var proj = navData[0];
	if (proj=='home'){
		window.location.href = "../index.html";
	}else{
		window.location.href = "../" + proj + "/index.html";
	}
	
}

function backHome(isHomePage){
	if (isHomePage){
		window.location.href = "index.html";
	}else{
		window.location.href = "../index.html";
	}
}