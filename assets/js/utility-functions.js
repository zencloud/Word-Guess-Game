// UTILITY FUNCTIONS


// Math Utility
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get Total Characters From String
function getChrCount(string, chr) {
    return string.split(chr).length - 1;
}

function isLetter(keyInput) {
    keyInput = event.keyCode;
    let result = false;
    if (keyInput >= 65 && keyInput <= 90 || keyInput >= 97 && keyInput <= 122) {
        result = true;
    }
    return result;
}