// const paper = document.querySelector("#paper");
// paper.addEventListener('click', () => console.log(playRound("paper", computerSelection=getComputerChoice())));

// const scissors = document.querySelector("#scissors");
// scissors.addEventListener('click', () => console.log(playRound("scissors", computerSelection=getComputerChoice())));

// const rock = document.querySelector("#rock");
// rock.addEventListener('click', () => console.log(playRound("rock", computerSelection=getComputerChoice())));

let buttons = document.querySelectorAll(".button");
const bbutton = document.getElementById("begin");
const bpsr = document.getElementById('clickme');
const rbutton = document.getElementById('restart');
const playerscore = document.getElementById('playerscore');
const computerscore = document.getElementById('computerscore');
const aiSpeak = document.getElementById("aitalk");
const finalScore = document.getElementById("final");

bpsr.style.display = 'none';

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playerSelection = button.id;
        computerSelection = getComputerChoice();

        playRound(playerSelection, computerSelection);

        if (playerPoints === 5 || computerPoints === 5) {
            gameTrack();
        }
    });
});

// //takes player choice and computer choice and runs it against the possible outcomes
// function playRound(playerSelection, computerSelection) {
//     //possible outcomes and returns a string with an answer
//     if (playerSelection === computerSelection) {
//         return "No winner, try again"
//     } else if (playerSelection === "rock" && computerSelection === "scissors") {
//         playerPoints = playerPoints + 1;
//         return "You Win! rock beats scissors"
//     } else if (playerSelection === "rock" && computerSelection === "paper") {
//         computerPoints = computerPoints + 1;
//         return "You Lose! rock loses to paper"
//     } else if (playerSelection === "paper" && computerSelection === "scissors") {
//         computerPoints = computerPoints + 1;
//         return "You Lose! paper loses to scissors"
//     } else if (playerSelection === "paper" && computerSelection === "rock") {
//         playerPoints = playerPoints + 1;
//         return "You Win! paper beats rock"
//     } else if (playerSelection === "scissors" && computerSelection === "rock") {
//         computerPoints = computerPoints + 1;
//         return "You Lose! scissors loses to rock"
//     } else if (playerSelection === "scissors" && computerSelection === "paper") {
//         playerPoints = playerPoints + 1;
//         return "You Win! scissors beats paper"
//     }

// }

function playRound(playerSelection, computerSelection) {
    if (computerSelection == playerSelection) {
      results("Its a tie!");
    } else if (
      (computerSelection == "rock" && playerSelection == "scissors") ||
      (computerSelection == "scissors" && playerSelection == "paper") ||
      (computerSelection == "paper" && playerSelection == "rock")
    ) {
        computerPoints = ++computerPoints;
      updatedComputerScore();
      if (computerPoints === 1) {
        results(
          `Its only your first loss.
          ${capitals(computerSelection)} beats ${playerSelection}.`
        );
      } else if (computerPoints === 2) {
        results(
          `Unlucky, you'll get em next time!. ${capitals(
            computerSelection
          )} beats ${playerSelection}.`
        );
      } else if (computerPoints === 3) {
        results(
          `${capitals(
            computerSelection
          )} beats ${playerSelection}. You're running out of time...and lives.`
        );
      } else if (computerPoints === 4) {
        results(
          `It's match point! you have to think ahead! ${capitals(
            computerSelection
          )} beats ${playerSelection}.`
        );
      } else {
        results(`${computerSelection} beats ${playerSelection}`);
      }
    } else {
        playerPoints = ++playerPoints;
      updatedPlayerScore();
      if (playerPoints === 1) {
        results(
          `Woo! You won.
          ${capitals(playerSelection)} beats ${computerSelection}.`
        );
      } else if (playerPoints === 2) {
        results(
          `Beginners luck?. ${capitals(
            playerSelection
          )} beats ${computerSelection}.`
        );
      } else if (playerPoints === 3) {
        results(
          `${capitals(
            playerSelection
          )} beats ${computerSelection}! You might actually do it!`
        );
      } else if (playerPoints === 4) {
        results(
          `${capitals(
            playerSelection
          )} beats ${computerSelection}. Just one more! you can do it!`
        );
      } else {
        results(`${playerSelection} beats ${computerSelection}`);
      }
    }
  }

  function capitals(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function results(str) {
    aiSpeak.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      fill: "forwards",
      iterations: 1,
      delay: 0,
      easing: "ease-out",
    });
    aiSpeak.textContent = str;
  }
//tracks player and computer win/loss
let playerPoints = 0;
let computerPoints = 0;
let playerScoreBox = document.getElementById('playerscoreshow');
let computerScoreBox = document.getElementById('computerscoreshow');

function updatedPlayerScore() {
    
  
    playerScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      fill: "forwards",
      iterations: 1,
      delay: 0,
      easing: "ease-out",
    });
  
    playerScoreBox.textContent = playerPoints;
  }
  function updatedComputerScore() {
  
    computerScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      fill: "forwards",
      iterations: 1,
      delay: 0,
      easing: "ease-out",
    });
  
    computerScoreBox.textContent = computerPoints;
  }

//declares the winner and loser
function gameTrack() {
    finalScore.style.display = 'block';
    clearContent();
    if (playerPoints > computerPoints) {
        finalScore.textContent = "Winner, Winner, Chicken Dinner!";
        overlayRestart();
    }
    else {
        finalScore.textContent = "KABOOM!, maybe you'll survive this and become the Hulk.";
        overlayRestart();
    }
}
// uses a random number generator to choose PSR
function getComputerChoice(choice) {
    let randomNumber = Math.floor(Math.random() * 3) + 1

    if (randomNumber === 1) {
        choice = "paper";
    } else if (randomNumber === 2) {
        choice = "scissors";
    } else {
        choice = "rock";
    }
    return choice;
}

function overlayRestart() {
    rbutton.style.display = 'block';
}

rbutton.addEventListener('click', () => {
    rbutton.style.display = 'none';
    finalScore.style.display = 'none';
    restartGame();
});

function bringBack() {
    bpsr.style.display = 'block'
    playerScoreBox.style.display = 'block';
    computerScoreBox.style.display = 'block';
    elem.style.display = 'block'
}
function restartGame() {
    bringBack();
    aiSpeak.textContent = "";
    playerPoints = 0;
    computerPoints = 0;
    updatedPlayerScore();
    updatedComputerScore();
    timeLeft = 30;
    countdown();
}

function clearContent() {
    bpsr.style.display = 'none'
    playerScoreBox.style.display = 'none';
    computerScoreBox.style.display = 'none';
    elem.style.display = 'none'
  }

bbutton.addEventListener('click', () => {
    //hide button
    bbutton.style.display = 'none';
    bpsr.style.display = 'block';
    let timerId = setInterval(countdown, 1000);
    
});

let timerId;
let timeLeft = 30;
let elem = document.getElementById('timer');

function countdown() {

    if (timeLeft == -1) {
        elem.innerHTML = 'KABOOM!';
        bpsr.style.display = 'none';
        aiSpeak.style.display = 'none';
        clearTimeout(timerId);
        overlayRestart();
    }else{
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}


        //runs the game for 5 rounds and keeps track of the points with a winner
        // function game() {
        //     for (let i = 0; i < 5; i++) {
        //         console.log("You have selected: " + playerSelection);
        //         const computerSelection = getComputerChoice();
        //         console.log("The bot selected: " + computerSelection);
        //         console.log(playRound(playerSelection, computerSelection));
        //         console.log("You have " + playerPoints + " points");
        //         console.log("The bot has " + computerPoints + " points");
        //     }
        //     if(playerPoints > computerPoints){
        //         console.log("You Win! " + playerPoints + " points to " + computerPoints);
        //     } else {
        //         console.log("You Lose! " + computerPoints + " points to " + playerPoints);
        //     }
        // }