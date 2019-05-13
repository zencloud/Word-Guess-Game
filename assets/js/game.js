// Cookie Conjector Core Game Controller

/* Dev Notes: 
Keyboard Character Code All Letters Range:
    Numbers: 48 - 47
    Upper:   65 - 90
    Lower:   97 - 122
*/


// Game Setup:
// Apply Listenners
document.addEventListener('keydown', function (event) {

    // Detect Keyboard Input and Check for only letters
    let keyInput = event.keyCode;
    if (keyInput >= 65 && keyInput <= 90 || keyInput >= 97 && keyInput <=122 ) {
        
        keyInput = String.fromCharCode(keyInput);
        console.log(keyInput);
    }
});

// Temporary Word Library
var wordLibrary = ['money', 'house', 'business', 'cheese'];

// Game Start Generate Word
game_generate_word();

