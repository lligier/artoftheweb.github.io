// Get the text element
const textElement = document.getElementById('text');

// Get the text content
const text = textElement.innerText;

// Split the text into words
const words = text.split(' '); 

// Clear the original text
textElement.innerText = '';

let currentLine = '';
let index = 0;

// Define the typing function
function typeNextWord() {
    if (index < words.length) {
        // Get the next word
        const word = words[index];

        // Add word to the current line
        if (currentLine === '') {
            currentLine += word;
        } else {
            currentLine += ' ' + word;
        }

        // Check if line goes past container width
        if (textElement.clientWidth < textElement.scrollWidth) {
            // Start a new line
            textElement.innerText += '\n' + word;
            currentLine = word;
        } else {
            // Update text element with current line
            textElement.innerText = currentLine;
        }

        // Increment index for next word
        index++;

        // Schedule next word typing after delay
        setTimeout(typeNextWord, 300);
    }
}

// Start typing words
typeNextWord();