// Cookie Conjector Core Game Controller

// Game Setup:
// Game State Enums 
const inputStates = {
    GAMEPLAY: 'gameplay',
    GAMEOVER: 'gameover'
};

// Game Data Controller
var gameData = {

    // Word Library Data
    wordLibrary:    ['SWEET', 'SUGAR', 'CHERRY', 'FUDGE', 'TAFFY', 'SYRUP', 'DONUT', 'CAKE', 'PIE', 'HONEY' ],
    wordValue:      null,
    lettersUsed:    [],

    // Game States
    inputAllowed:   true,
    inputState:     inputStates.GAMEPLAY,
    correctTotal:   0,
    wrongTotal:     0,
    turnCount:      0
};


// Keyboard Input Listener
document.addEventListener('keydown', function (event) {
    game_check_letter();
});

// Game Start Generate Word
game_generate_word();