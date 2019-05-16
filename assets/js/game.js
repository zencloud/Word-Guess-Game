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
    wordLibrary: [
        { "WORD": "SUGAR", "HINT": "Soda is filled with me." },
        { "WORD": "CHERRY", "HINT": "Goes on top of sundae." },
        { "WORD": "TAFFY", "HINT": "Stretchy treat." },
        { "WORD": "SYRUP", "HINT": "Goes on pancakes." },
        { "WORD": "DONUT", "HINT": "Glazed or creme-filled." },
        { "WORD": "CAKE", "HINT": "Served at a birthday." },
        { "WORD": "PIE", "HINT": "Apple, Cherry, Pecan." },
        { "WORD": "FUDGE", "HINT": "A type of chocolate." }
    ],
    wordValue:      null,
    hintValue:      null,
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