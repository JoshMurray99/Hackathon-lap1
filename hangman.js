

/* pseudocode
1. create array of words, randomly select the word for user to guess, let lives=12
2.if lives<=0 then game over message 
3. check if guess_word===word if yes user wins and display the word, else display to user guess word e.g. _ _ _ _ _ _
4. user input:prompt the user to guess a letter (or the word)
5. if the user input > 1 letter, compare against the word. if input=word, user wins, else user loses- end all other code
6. if the user input=1 letter, check if letter is in guess word, if yes display "invalid" and return to step 4. 
7. else if letter is in word, display "[letter] is in the word!" return to step 3
8. else, display "incorrect", add 1 line to hangman (lives -=1), add letter to incorrect letters. return to step 2

create functions to call so steps can be repeated
*/
const prompt = require('prompt-sync')({sigint: true});

const words= ["hangman", "people", "coding","elephant","Hippopotamus"]
let lives= 12;

//select random word from words
const word= words[Math.floor(Math.random() * words.length)]

//initially empty array containing the correct letter guesses
const guessWordArr=Array(word.length).fill("_");
let guessWord=guessWordArr.join("")
let incorrectLetters=""



//check if user has lives
const isAlive = lives => lives > 0? guess(): gameOver();

//game over function
function gameOver(){
    console.log("Hangman! The game is over :(")
}

//check if user has guessed word correctly
function win(){
    if(guessWord === word){
    console.log(`Congratulations, you won! The word was ${word}`)
    } else{
        guess()
    }       
}

function guess(){
    console.log("")
    console.log(guessWord);
    console.log(`Incorrect letters: ${incorrectLetters}`)
    let input= prompt(`Guess a letter or the word for this ${word.length} letter word.`);
    
    if(input===word){
        guessWord=word;
        return win();
    }
    //check if input valid
    if (!/^[a-zA-Z]$/.test(input)) {
        console.log("invalid input, please guess again");
        return guess();
    }
    //convert input to lower case
    input= input.toLowerCase();
    //check if input is a word guess
    if(input.length>1 && input===word){
        guessWord= word;
        return win();

    } else if(input.length>1 && input!==word){
        return gameOver();
    }
        //check if letter has already been guessed
    if(incorrectLetters.includes(input)){
        console.log(`The letter ${input} has already been guessed. Guess again.`)
        return guess();
    }
      //check if letter is in word or not
      let foundLetter = false;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === input) {
          guessWordArr[i] = input;
          foundLetter = true;
        }
      }

      if (foundLetter) {
        guessWord = guessWordArr.join("");
        console.log(`The letter is in the word!`);
        win();
      } else {
        lives -= 1;
        incorrectLetters += input;
        console.log(`Incorrect! You have ${lives} lives left`);
        return isAlive(lives);
      }
    }
      
guess()