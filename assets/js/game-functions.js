// Core Game Functions

// --- Generate and Display New Word
const game_generate_word = function () {

    // Generator Word at start of round
    let wordRandom = getRandomInt(0, gameData.wordLibrary.length - 1);
    gameData.wordValue = gameData.wordLibrary[wordRandom];
    var htmlData = '';

    // Loop through character positions to spell out word
    for (var i = 0; i < gameData.wordValue.length; i++) {

        // Create Main Word Div
        let wordPosition = gameData.wordValue[i];
        htmlData += `
        <div class=\"content-solution-letter-cell\">
        <span class="letter-${i}">${wordPosition}</span>
        <div class=\"content-solution-letter-underline\"></div>
        </div>
    `;
    }

    // Set Div Content
    document.getElementById("content-solution-container").innerHTML = htmlData;
};


// --- UPDATE LETTERS USED
const game_update_letters_used = function () {

    // Update Display of Letters Used
    var htmlData = '<h1>Letters Used:</h1>';

    // Since .innerHTML clears data from element we have to re-write
    // all existing used letters and only animated last one entered
    for (var i = 0; i < gameData.lettersUsed.length; i++) {

        // Create Main Word Div
        let letterValue = gameData.lettersUsed[i];

        // Animation check: Only last value has intro
        // Prevents every container from re-animating every refresh
        let introCheck = '';
        if (i == gameData.lettersUsed.length - 1) {
            introCheck = 'animated rubberBand';
        }
        htmlData += `
            <div class=\"content-letters-used ${introCheck} \">
            ${letterValue}
            </div>
        `;
    }

    // Set Div Content
    document.getElementsByClassName("content-letters-used-container")[0].innerHTML = htmlData;
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
                    // LETTER HAS BEEN USED
                    let elementBody = document.getElementsByTagName("body")[0];
                    elementBody.classList.remove("animated");
                    elementBody.classList.remove("shake");


                    setTimeout(function(){
                        elementBody.classList.add("animated");
                        elementBody.classList.add("shake");
                    }, 1);
                }

                // Letter is new
                if (!letterHasBeenUsed) {

                    // Update Used Letter
                    gameData.lettersUsed.push(keyInput);
                    game_update_letters_used();

                    // Update Player Turn
                    gameData.turnCount++;

                    // Find if letters exist in the word
                    let chrCount = getChrCount(gameData.wordValue, keyInput);

                    // No Letters Found. Update Cookie State
                    if (chrCount === 0) {

                        // Increase Wrong Guess Total
                        gameData.wrongTotal++;2

                        // Update Bites Remaining UI
                        let htmlBitesRemaining = document.getElementsByClassName("content-cookie-details")[0];
                        let bitesRemaining = 6 - gameData.wrongTotal;
                        htmlBitesRemaining.innerHTML = `<h1>Bites Remaining: <span class=\"bites-remaining\">${bitesRemaining}</span></h1>`;

                        // Cookie Display Stages 1-6
                        if (gameData.wrongTotal < 6) {
                            document.getElementById("cookie-display").src = "assets/imgs/cookie-stages/" + (gameData.wrongTotal + 1) + ".png";
                        }

                        // Player Lost - Game Over
                        if (gameData.wrongTotal == 6) {

                            // Update Game Cookie Display
                            document.getElementById("cookie-display").src = "assets/imgs/game-states/lose.png";
                            
                            // Change Input Mode
                            gameData.inputState = inputStates.GAMEOVER;

                            // Reveal Answer
                            for (var i = 0; i < gameData.wordValue.length; i++) {
                                let className = "letter-" + i;
                                document.getElementsByClassName(className)[0].style.display = 'block';
                            }
                        }
                    }

                    // Letter(s) Found in Word
                    // Loop Through and add character position(s) in array
                    if (chrCount > 0) {

                        // Update Correct Totals
                        gameData.correctTotal += chrCount;
                        
                        // Check if Won
                        if (gameData.correctTotal == gameData.wordValue.length) {

                            // Update Cookie Display
                            document.getElementById("cookie-display").src = "assets/imgs/game-states/win.png";
                            let cookieElement = document.getElementById("cookie-display");
                            cookieElement.classList.add("animated");
                            cookieElement.classList.add("fadeIn");

                            // Change Input
                            gameData.inputState = inputStates.GAMEOVER;
                        }

                        // Reveal Letters Found
                        for (var i = 0; i < gameData.wordValue.length; i++) {
                            if (gameData.wordValue[i] == keyInput) {
                                let className = "letter-" + i;
                                let solutionElement = document.getElementsByClassName(className)[0];
                                solutionElement.style.display = 'block';
                                solutionElement.classList.add("animated");
                                solutionElement.classList.add("fadeInDown");
                            }
                        }
                    }
                }
            }
        break;

        case "gameover":
            // Reset Game
            location.reload();
        break;
    }
}