// Cookie Conjector Core Game Controller

/* Dev Notes: 
Keyboard Character Code All Letters Range:
    Numbers: 48 - 47
    Upper:   65 - 90
    Lower:   97 - 122
*/


// Game Setup:
// Apply Listenners


// KEYBOARD INPUT
document.addEventListener('keydown', function (event) {
    game_check_letter();
});

// Word Library
var wordLibrary = ['MONEY', 'HOUSE', 'BUSINESS', 'CHEESE'];
var wordValue   = null;
var wordRandom  = null;
var lettersUsed = [];

// Game State Data
var playerTurn = 0;
var wrongGuessTotal = 0;

// Game Start Generate Word
game_generate_word();