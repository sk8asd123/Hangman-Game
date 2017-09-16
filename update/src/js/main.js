var answer_word;
var guess_count;
var incorrect_letter_guesses;
var masked_word;
var words = ['apple', 'banana', 'carrot', 'dinosaur', 'python', 'project', 'fire', 'goat', 'shrimp', 'lobster', 'rabbit',
    'house']



//initial hidden word
function hideWord(word) {
    var hidden_word = ""
    for (var j = 0; j < word.length; j++) {
        hidden_word = hidden_word + "*";
    }
    return hidden_word;
}


// find if letter is in secret word
function revealWord(letter, answer_word, masked_word, incorrect_letter_guesses){
    var new_word = '';

    if (! isLetter(letter)){
        $(".letter_alert").text(letter + " Invalid Letter");
        return masked_word;
    }

    if (incorrect_letter_guesses.has(letter) || masked_word.indexOf(letter) != -1) {
        $(".letter_alert").text(letter + " Already Guessed");
        return masked_word;
    }

    if (answer_word.indexOf(letter) === -1)
    {
        guess_count -= 1;
        incorrect_letter_guesses.add(letter);
        $(".your_letters").append(letter);
        $(".guess-title").text("You have " + guess_count + " guesses left");
        return masked_word;
    }

    for (var i = 0; i < answer_word.length; i++){
        if (letter == answer_word[i]){
            new_word += letter;
        }
        else {
            new_word += masked_word[i];
        }
    }
    return new_word;
}

// returns true if player has won
function winGame(answer_word, masked_word){
    if(answer_word === masked_word) {
        $("#result").text("You Win!!!");
        $(".your_letters").empty();
        $(".letter_alert").empty();
        $(".guess-title").empty();
        gameReset();
        return true;
    }
    return false;
}

// returns true if player has lost
function loseGame(guess_count){
    if (guess_count <= 0){
        $("#result").text("The Answer is " + answer_word);
        $(".your_letters").empty();
        $(".letter_alert").empty();
        $(".guess-title").empty();
        gameReset();
        return true;
    }
    return false;
}

// game over if a player has won or lost
function gameOver(winGame, loseGame){
    return (winGame || loseGame);
}

// tested for English only
function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

function gameReset(){
    var answer_word = words[Math.floor(Math.random() * words.length)];
    var guess_count = 7;
    var masked_word = hideWord(answer_word);
    var incorrect_letter_guesses = new Set();
    
    $(".your_letters").empty();
    $(".letter_alert").empty();
    $(".guess-title").empty();
}


// get random word from list
var answer_word = words[Math.floor(Math.random() * words.length)];
var guess_count = 7;
var masked_word = hideWord(answer_word);
var incorrect_letter_guesses = new Set();



// Captures keyboard input. Depending on the letter pressed it will "call" (execute) different functions.
document.onkeyup = function(event) {
    $(".letter_alert").empty();
    var letter_guess = String.fromCharCode(event.keyCode).toLowerCase();
    masked_word = revealWord(letter_guess.toLowerCase(), answer_word, masked_word, incorrect_letter_guesses);
    $("#result").text(masked_word);

    gameOver(loseGame(guess_count), winGame(answer_word, masked_word))
};


