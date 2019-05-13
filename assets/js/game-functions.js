// Core Game Functions

// --- Generate and Display New Word
var game_generate_word = function () {

    // Generator Word at start of round
    wordRandom = getRandomInt(0, wordLibrary.length-1);
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


// --- Input Detection
