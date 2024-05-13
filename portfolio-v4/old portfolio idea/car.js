document.addEventListener('DOMContentLoaded', function() {
    var mUp = false;
    var mDown = false;
    var mLeft = false;
    var mRight = false;
    var mario = document.querySelector('.mario');
    var keyInterval = null;
    var brick = document.querySelector('.brick');
    var brick2 = document.querySelector('.brick2');
    var brick3 = document.querySelector('.brick3');
    var popUp = document.querySelector(".pop-up");


    document.addEventListener('keydown', function(e) {
        const curKey = e.keyCode;
        if (curKey === 39) { // ArrowRight
            mRight = true;
            startAnimation();
        }
        if (curKey === 37) { // ArrowLeft
            mLeft = true;
            startAnimation();
        }
        if (curKey === 38) { // ArrowUp
            mUp = true;
            startAnimation();
        }
        if (curKey === 40) { // ArrowDown
            mDown = true;
            startAnimation();
        }
    });

    document.addEventListener('keyup', function(e) {
        const curKey = e.keyCode;
        if (curKey === 39) { // ArrowRight
            mRight = false;
            stopAnimation();
        }
        if (curKey === 37) { // ArrowLeft
            mLeft = false;
            stopAnimation();
        }
        if (curKey === 38) { // ArrowUp
            mUp = false;
            stopAnimation();
        }
        if (curKey === 40) { // ArrowDown
            mDown = false;
            stopAnimation();
        }
    });

    function startAnimation() {
        if (!keyInterval && (mRight || mLeft || mUp || mDown)) {
            keyInterval = setInterval(movement, 16);
        }
    }

    function stopAnimation() {
        clearInterval(keyInterval);
        keyInterval = null;
    }

    function movement() {
        if (mRight) {
            // Move Mario right
            mario.style.left = (parseInt(getComputedStyle(mario).left) + 5) + 'px';
            checkCollision(mario, brick);
            checkCollision(mario, brick2);
            checkCollision(mario, brick3);

        }
        if (mLeft) {
            // Move Mario left
            mario.style.left = (parseInt(getComputedStyle(mario).left) - 5) + 'px';
            checkCollision(mario, brick);
            checkCollision(mario, brick2);
            checkCollision(mario, brick3);

        }
        if (mUp) {
            // Move Mario up
            mario.style.top = (parseInt(getComputedStyle(mario).top) - 5) + 'px';
            checkCollision(mario, brick);
            checkCollision(mario, brick2);
            checkCollision(mario, brick3);

        }
        if (mDown) {
            // Move Mario down
            mario.style.top = (parseInt(getComputedStyle(mario).top) + 5) + 'px';
            checkCollision(mario, brick);
            checkCollision(mario, brick2);
            checkCollision(mario, brick3);

        }
    }

    // Initial mario position
    mario.style.left = '13.5%'; 
    mario.style.top = '85%'; 
    mario.style.transform = 'translateY(-50%)'; 


    function checkCollision(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        if (!(rect1.right < rect2.left ||
              rect1.left > rect2.right ||
              rect1.bottom < rect2.top ||
              rect1.top > rect2.bottom)) {
          
			// Collision detected
			openConfirmDialog(element2);
			
			// force the dot to move outside the project box
			newLeft = Math.min(mario.offsetLeft, rect2.left);
			mario.style.left = newLeft - 20 + 'px';
			
        }
    }
});

/* open class discussion page */
function openDiscussPanel(){
	window.open("./discussion_page/discussion.html","about_class");
}

/* open confirm dialog */
function openConfirmDialog(element2){

	const confirmDialog = document.getElementById("confirmDialog");
	const yesBtn = document.getElementById("yesBtn");
	const noBtn = document.getElementById("noBtn");

	confirmDialog.showModal();

	confirmDialog.addEventListener("close", (e) => {
	  confirmDialog.returnValue === "default"
		  ? "No return value."
		  : `ReturnValue: ${confirmDialog.returnValue}.`; 
	});

	noBtn.addEventListener("click", (e) => {
		event.preventDefault(); 	// We don't want to submit this fake form
		confirmDialog.close("no"); 	// close dialog with the return "no"
	});

	yesBtn.addEventListener("click", (event) => {
	  
	  event.preventDefault(); 		// We don't want to submit this fake form
	  confirmDialog.close("yes"); 	// close dialog with the return "yes"
	  
	  // open project page
	  var projLinkId = element2.getAttribute("data");
	  var projLinkElem = document.getElementById(projLinkId);
	  projLinkElem.click();
				
	});

}

