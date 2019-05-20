// Core Game Functions



// --- Player Wond
const game_set_round_won = function () {
    // Update Cookie Display
    document.getElementById("cookie-display").src = "assets/imgs/game-states/win.png";
    let cookieElement = document.getElementById("cookie-display");
    cookieElement.classList.add("animated");
    cookieElement.classList.add("fadeIn");
    
    // Change Input
    gameData.inputState = inputStates.GAMEOVER;

    // Update Game Win Count
    gameData.winCount++;
    document.getElementById("win-record").textContent = gameData.winCount;
}

// --- Set Game Over
const game_set_game_over_display = function () {
    // Update Game Cookie Display
    document.getElementById("cookie-display").src = "assets/imgs/game-states/lose.png";

    // Change Input Mode
    gameData.inputState = inputStates.GAMEOVER;

    // Update Game Lose Count
    gameData.loseCount++;
    document.getElementById("lose-record").textContent = gameData.loseCount;
}

// --- Reset Game Turn
const game_new_round = function () {

    // Reset System Vars
    gameData.wordValue      = null;
    gameData.hintValue      = null;
    gameData.lettersUsed    = [];

    gameData.inputAllowed   = true;
    gameData.inputState     = inputStates.GAMEPLAY;
    gameData.correctTotal   = 0;
    gameData.wrongTotal     = 0;
    gameData.turnCount      = 0;

    // Display Updates
    document.getElementById("cookie-display").src = "assets/imgs/cookie-stages/1.png";

    // Update Last Letters Used:
    document.getElementById("content-letters-used-container")
            .innerHTML ="<h1>Letters Used:</h1>";

    // Generate new word
    game_generate_word();

}




// --- Reveal Correct Letters Found
const game_reveal_found_letters = function (keyInput) {
    for (var i = 0; i < gameData.wordValue.length; i++) {
        if (gameData.wordValue[i] === keyInput) {
            let className = "letter-" + i;
            let solutionElement = document.getElementsByClassName(className)[0];
            solutionElement.style.display = 'block';
            solutionElement.classList.add("animated");
            solutionElement.classList.add("fadeInDown");
        }
    }
}

// --- Reveal game answer
const game_reveal_solution = function () {
    for (var i = 0; i < gameData.wordValue.length; i++) {
        let className = "letter-" + i;
        document.getElementsByClassName(className)[0].style.display = 'block';
    }
}

// --- Updates bites remaining after failed guess
const game_update_bites_remaining = function () {
    
    // Update Bite Remaining Data
    gameData.wrongTotal++;
    
    // Update Bites Remaining UI
    let htmlBitesRemaining = document.getElementById("content-cookie-details");
    let bitesRemaining = 6 - gameData.wrongTotal;
    htmlBitesRemaining.innerHTML = `<h1>Bites Remaining: <span class=\"bites-remaining\">${bitesRemaining}</span></h1>`;

    // Update Cookie State
    // Cookie Display Stages 1-6
    if (gameData.wrongTotal < 6) {
        document.getElementById("cookie-display").src = "assets/imgs/cookie-stages/" + (gameData.wrongTotal + 1) + ".png";
    }
}

// --- Generate and Display New Word
const game_generate_word = function () {

    // Generator Word at start of round
    let wordRandom = getRandomInt(0, gameData.wordLibrary.length - 1);
    
    // Pull Word from Object
    gameData.wordValue = gameData.wordLibrary[wordRandom];
    gameData.hintValue = gameData.wordValue.HINT;
    gameData.wordValue = gameData.wordValue.WORD;
    var htmlData = '';

    // Loop through character positions to spell out word
    for (let i = 0; i < gameData.wordValue.length; i++) {
        let wordPosition = gameData.wordValue[i];
        htmlData += `
            <div class=\"content-solution-letter-cell\">
            <span class="letter-${i}">${wordPosition}</span>
            <div class=\"content-solution-letter-underline\"></div>
            </div>
        `;
    }

    // Update visuals for solution and hint
    document.getElementById("content-solution-container").innerHTML = htmlData;
    document.getElementById("hint-details").innerHTML = gameData.hintValue;
};


// --- UPDATE LETTERS USED
const game_update_letters_used = function () {

    // Update Display of Letters Used
    var htmlData = '<h1>Letters Used:</h1>';

    // Since .innerHTML clears data from element we have to re-write
    // all existing used letters and only animated last one entered
    for (let i = 0; i < gameData.lettersUsed.length; i++) {

        // Create Main Word Div
        let letterValue = gameData.lettersUsed[i];

        // Animation check: Only last value has intro
        // Prevents every container from re-animating every refresh
        let lastLetterClass = '';
        if (i === gameData.lettersUsed.length - 1) {
            lastLetterClass = 'animated rubberBand';
        }
        htmlData += `
            <div class=\"content-letters-used ${lastLetterClass} \">
            ${letterValue}
            </div>
        `;
    }

    // Update display for last letters used
    document.getElementById("content-letters-used-container").innerHTML = htmlData;
};

// --- CHECK INPUT - MASTER LOOP
const game_check_letter = function () {

    // Break out of function if input disabled
    if (!gameData.inputAllowed) {
        return false;
    }

    // Game Input Detection
    switch (gameData.inputState) {

        case inputStates.GAMEPLAY:
            
            // Detected Keyboard Input and Check for only letters
            let keyInput = event.keyCode;
            if (isLetter(keyInput)) {

                // Convert Keyinput to Single Letter UpperCase String
                keyInput = String.fromCharCode(keyInput);
                
                // Check if Letter has been used before
                let letterHasBeenUsed = gameData.lettersUsed.includes(keyInput);

                // Letter has already been used
                if (letterHasBeenUsed) {
                    screen_shake();
                }

                // Letter is new
                if (!letterHasBeenUsed) {

                    // Update Used Letter
                    gameData.lettersUsed.push(keyInput);

                    // Update Letters that have been used.
                    game_update_letters_used();

                    // Update Player Turn
                    gameData.turnCount++;

                    // Find if letters exist in the word
                    let chrCount = getChrCount(gameData.wordValue, keyInput);

                    // No Letters Found. Update Cookie State
                    if (chrCount === 0) {

                        // Update displays and data for wrong letter choice
                        game_update_bites_remaining();

                        // Player Lost - Game Over
                        if (gameData.wrongTotal === 6) {

                            // Set Gameover Display
                            game_set_game_over_display();

                            // Reveal Answer
                            game_reveal_solution();
                        }
                    }

                    // Letter(s) Found in Word
                    if (chrCount > 0) {

                        // Update Correct Totals
                        gameData.correctTotal += chrCount;
                        
                        // Check if Won
                        if (gameData.correctTotal === gameData.wordValue.length) {
                            game_set_round_won();
                        }

                        // Reveal Letters Found
                        game_reveal_found_letters(keyInput);
                    }
                }
            }
        break;

        case "gameover":
            // Reset Game by reloadings
            game_new_round();
            //location.reload();
        break;
    }
}