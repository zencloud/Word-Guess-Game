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
var wordLibrary = ['SWEET', 'SUGAR', 'CHERRY', 'FUDGE', 'TAFFY', 'SYRUP', 'DONUT', 'CAKE', 'PIE', 'HONEY' ];
var wordValue   = null;
var wordRandom  = null;
var lettersUsed = [];

// Game State Data
var gameInputAllowed   = true;          // Game Input State Controller
var gameInputState     = "gameplay";    // Switch input control states: gameplay, gameover
var playerCorrectTotal = 0;             // Total player correct turns
var playerWrongTotal   = 0;             // Total player wrong turns
var playerTurn         = 0;             // Total player turns

// Game Start Generate Word
game_generate_word();