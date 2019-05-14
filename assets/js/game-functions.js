// Core Game Functions

// --- Generate and Display New Word
const game_generate_word = function () {

    // Generator Word at start of round
    wordRandom = getRandomInt(0, wordLibrary.length - 1);
    wordValue = wordLibrary[wordRandom];
    var htmlData = '';

    // Loop through character positions to spell out word
    for (var i = 0; i < wordValue.length; i++) {

        // Create Main Word Div
        let wordPosition = wordValue[i];
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

const game_check_letter = function () {

    // Break out of function if input disabled
    if (!gameInputAllowed) {
        return false;
    }

    // Game Input Detection
    switch (gameInputState) {

        case "gameplay":
            
            // Detect Keyboard Input and Check for only letters
            // let keyInput = event.keyCode;
            // if (keyInput >= 65 && keyInput <= 90 || keyInput >= 97 && keyInput <= 122) {

            let keyInput = event.keyCode;
            if (isLetter(keyInput)) {

                // Convert Keyinput to Single Letter UpperCase String
                keyInput = String.fromCharCode(keyInput);
                
                // Check if Letter has been used before
                let letterHasBeenUsed = lettersUsed.includes(keyInput);

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
                    lettersUsed.push(keyInput);
                    game_update_letters_used();

                    // Update Player Turn
                    playerTurn++;

                    // Find if letters exist in the word
                    let chrCount = getChrCount(wordValue, keyInput);

                    // No Letters Found. Update Cookie State
                    if (chrCount === 0) {

                        // Increase Wrong Guess Total
                        playerWrongTotal++;2

                        // Update Bites Remaining UI
                        let htmlBitesRemaining = document.getElementsByClassName("content-cookie-details")[0];
                        let bitesRemaining = 6 - playerWrongTotal;
                        htmlBitesRemaining.innerHTML = `<h1>Bites Remaining: ${bitesRemaining}</h1>`;

                        // Cookie Display Stages 1-6
                        if (playerWrongTotal < 6) {
                            document.getElementById("cookie-display").src = "assets/imgs/cookie-stages/" + (playerWrongTotal + 1) + ".png";
                        }

                        // Player Lost - Game Over
                        if (playerWrongTotal == 6) {

                            // Update Game Cookie Display
                            document.getElementById("cookie-display").src = "assets/imgs/game-states/lose.png";
                            
                            // Change Input Mode
                            gameInputState = "gameover";

                            // Reveal Answer
                            for (var i = 0; i < wordValue.length; i++) {
                                let className = "letter-" + i;
                                document.getElementsByClassName(className)[0].style.display = 'block';
                            }
                        }
                    }

                    // Letter(s) Found in Word
                    // Loop Through and add character position(s) in array
                    if (chrCount > 0) {

                        // Update Correct Totals
                        playerCorrectTotal += chrCount;
                        
                        // Check if Won
                        if (playerCorrectTotal == wordValue.length) {

                            // Update Cookie Display
                            document.getElementById("cookie-display").src = "assets/imgs/game-states/win.png";
                            let cookieElement = document.getElementById("cookie-display");
                            cookieElement.classList.add("animated");
                            cookieElement.classList.add("fadeIn");

                            // Change Input
                            gameInputState = "gameover";
                        }

                        // Reveal Letters Found
                        for (var i = 0; i < wordValue.length; i++) {
                            if (wordValue[i] == keyInput) {
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

const game_update_letters_used = function () {

    // Update Display of Letters Used
    var htmlData = '<h1>Letters Used:</h1>';

    // Loop through character positions to spell out worad
    for (var i = 0; i < lettersUsed.length; i++) {

        // Create Main Word Div
        let letterValue = lettersUsed[i];

        // Animation check: Only last value has intro
        // Preents every container from re-animating every refresh
        // Dev note: Need to learn to append
        let introCheck = '';
        if (i == lettersUsed.length - 1) {
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