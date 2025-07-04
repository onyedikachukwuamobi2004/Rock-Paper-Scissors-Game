let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();


  /*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}   note: we can also use this instead of the one on top of it*/


function updateScoreElement () {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
}


function pickComputerMove() {
const randomNumber = Math.random();

let computerMove = ''

  if (randomNumber >=0 && randomNumber <1/3) {
    computerMove = 'rock';
  } else if (randomNumber >=1/3 && randomNumber <2/3) {
    computerMove = 'paper';
  } else if (randomNumber >=2/3 && randomNumber <1) {
    computerMove = 'scissors'
  }

  return computerMove;
}


let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//};

document.querySelector('.js-auto-play-button')
.addEventListener('click', () => {
  autoPlay();
})

document.querySelector('.js-reset-button')
.addEventListener('click', () => {
  resetConfirmation();
});


function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}


function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.js-auto-play-button')
    .innerHTML = 'Stop Playng'

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.js-auto-play-button')
    .innerHTML = 'Auto Play'
  }
}
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoPlay('Auto Play')
  }
})

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  speak('rock')
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  speak('paper')
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  speak('scissors')
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper')
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'e') {
    resetConfirmation('reset Score');
  }
});


function resetConfirmation() {
  document.querySelector('.js-reset-confirmation')
  .innerHTML = `Are you sure you want to reset the score?
  <button class="js-reset-confirm-yes reset-confirm-button">Yes</button>
  <button class="js-reset-confirm-no reset-confirm-button">No</button>`

  document.querySelector('.js-reset-confirm-yes')
  .addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
 })


 document.querySelector('.js-reset-confirm-no')
 .addEventListener('click', () => {
  hideResetConfirmation();
 })
}



function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
  .innerHTML = ''
}



function playGame(playerMove) {
  const computerMove = pickComputerMove();

let result = ''

if(playerMove === 'scissors') {
    if (computerMove === 'rock') {
      speak('You lose')
    result = 'You lose.';
  } else if (computerMove === 'paper') {
    speak('You win')
    result = 'You win.';
  } else if (computerMove === 'scissors') {
    speak('Tie')
    result = 'Tie.';
  }

} else if(playerMove === 'paper') {
    if (computerMove === 'rock') {
      speak('You win')
    result = 'You win.';
  } else if (computerMove === 'paper') {
    speak('Tie')
    result = 'Tie.';
  } else if (computerMove === 'scissors') {
    speak('You lose')
    result = 'You lose.'
  }

} else if(playerMove === 'rock') {
  if (computerMove === 'rock') {
    speak('tie')
    result = 'Tie.';
  } else if (computerMove === 'paper') {
    speak('You lose')
      result = 'You lose.';
  } else if (computerMove === 'scissors') {
    speak('You win')
      result = 'You win.';
  }
}

if(result === 'You win.') {
  score.wins += 1;
} else if (result === 'You lose.') {
  score.losses += 1; 
} else if (result === 'Tie.') {
  score.ties += 1;
}


localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
.innerHTML = result;

document.querySelector('.js-moves')
.innerHTML = `You 
<img src="Rock paper scissors icons/${playerMove}-emoji.png" class="rock-paper-scissors-icon">
<img src="Rock paper scissors icons/${computerMove}-emoji.png" class="rock-paper-scissors-icon">
Computer`;
}

const music = document.getElementById('js-music')

function toggleMusic() {
  music.volume = 0.4;
  if (music.paused) {
    music.play();
    alert("music is playing")
  } else {
    music.pause();
    alert("music off")
  } 
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

