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
    // Detect Keyboard Input and Check for only letters
    let keyInput = event.keyCode;
    if (keyInput >= 65 && keyInput <= 90 || keyInput >= 97 && keyInput <= 122) {

        // Convert Keyinput to Single Letter UpperCase String
        keyInput = String.fromCharCode(keyInput);

        // Check if Letter has been used before
        let letterHasBeenUsed = lettersUsed.includes(keyInput);

        // Letter has already been used
        if (letterHasBeenUsed) {
            //console.log('Letter Used');
        }

        // Letter is new
        if (!letterHasBeenUsed) {

            // Update Used Letter
            lettersUsed.push(keyInput);
            game_update_letters_used();

            // Update Player Turn
            playerTurn++;

            console.log(playerTurn);
            // Find if letters exist in the word
            let chrCount = getChrCount(wordValue, keyInput);

            // No Letters Found. Update Cookie State
            if (chrCount === 0) {

                wrongGuessTotal++;

                // Cookie Statges 1-6
                if (wrongGuessTotal < 6) {
                    document.getElementById("cookie-display").src = "assets/imgs/cookie-stages/" + (wrongGuessTotal + 1) + ".png";
                    document.getElementById("cookie-display").src = "assets/imgs/cookie-stages/" + (wrongGuessTotal + 1) + ".png";
                }

                // Player Lost - Game Over
                if (wrongGuessTotal === 7) {
                    document.getElementById("cookie-display").src = "assets/imgs/game-states/lose.png";
                }
            }

            // Letter(s) Found in Word
            // Loop Through and add character position(s) in array
            if (chrCount > 0) {
                for (var i = 0; i < wordValue.length; i++) {
                    if (wordValue[i] == keyInput) {
                        let className = "letter-" + i;
                        document.getElementsByClassName(className)[0].style.display = 'block';
                    }
                }
            }
        }
    }
}

const game_update_letters_used = function () {

    // Update Display of Letters Used
    var htmlData = '<p>Letters Used:</p>';

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

    // Update Turn

    // Set Div Content
    document.getElementsByClassName("content-letters-used-container")[0].innerHTML = htmlData;
};
