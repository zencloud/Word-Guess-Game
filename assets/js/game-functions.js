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

        if (letterHasBeenUsed) {
            console.log('Letter Used');
        }
        if (!letterHasBeenUsed) {

            // Adjust Letters Used
            lettersUsed.push(keyInput);
            game_update_letters_used();

            let chrCount = getChrCount(wordValue, keyInput);
            // Letters Found
            // Loop Through and add to Array
            if (chrCount > 0) {
                for (var i = 0; i < wordValue.length; i++) {
                    if (wordValue[i] == keyInput) {
                        console.log(wordValue, keyInput, i);
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

    // Loop through character positions to spell out word
    for (var i = 0; i < lettersUsed.length; i++) {

        // Create Main Word Div
        let letterValue = lettersUsed[i];
        htmlData += `
            <div class=\"content-letters-used\">
            ${letterValue}
            </div>
        `;
    }

    // Set Div Content
    document.getElementsByClassName("content-letters-used-container")[0].innerHTML = htmlData;
};
