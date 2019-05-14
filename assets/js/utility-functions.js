// Utility Functions

// Get random number between range
// Returns: Number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get total characters in string
// Returns: Number
function getChrCount(string, chr) {
    return string.split(chr).length - 1;
}

// Check if character code is a letter
// Returns: Boolean
/* Dev Notes: 
    Number/Letter character code ranges: 
    Numbers: 48 - 47
    Upper:   65 - 90
    Lower:   97 - 122 
*/

function isLetter(keyInput) {
    keyInput = event.keyCode;
    let result = false;
    if (keyInput >= 65 && keyInput <= 90 || keyInput >= 97 && keyInput <= 122) {
        result = true;
    }
    return result;
}