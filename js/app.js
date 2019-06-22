/*Varible Decleration Goes Here*/
var cardlist = Array.prototype.slice.call(document.querySelectorAll(".card"))
let move = document.querySelector(".moves")
let timer = document.querySelector(".timer")
var clickedlist = []
var clicked = 0
var win = 0
var sec = 0
var moves
var hours = 0
var mins = 0
// Adding Mouseclick Events to the cards
for (i = 0; i < cardlist.length; i++) {
  cardlist[i].addEventListener("click", showcard)
}
//Function to display the clicked card
function showcard() {
  clicked++
  if (clicked == 1) {
    startTimer()
  }
  this.classList.add('open', 'show', 'disabled');
  clickedlist.push(this)
  if (clickedlist.length == 2) {
    match()
    console.log("before");
    moveincrement()
    console.log("after");

  }
}
//Shuffling the cards in the deck
var deck = document.querySelector(".deck");
var cardShuffle = shuffle(cardlist);
cardShuffle.forEach(function() {
  [].filter.call(cardlist, function(items) {
    deck.appendChild(items);
  });
});
//function to check the matching of the selected cards
function match() {
  if (clickedlist[0].children[0].className == clickedlist[1].children[0].className) {
    win++
    clickedlist[0].classList.remove('open', 'show', 'disabled')
    clickedlist[1].classList.remove('open', 'show', 'disabled')
    clickedlist[0].classList.add('match', 'disabled')
    clickedlist[1].classList.add('match', 'disabled')
    if (win == 8) {
      var killId = setTimeout(function() {
        for (var i = killId; i > 0; i--) clearInterval(i)
      }, 1000);
      over()
    }
    clickedlist = []
  } else {
    setTimeout(time, 200)
  }
}
//Function dealing with unmatched cards
function time() {
  clickedlist[0].classList.remove('open', 'show', 'disabled')
  clickedlist[1].classList.remove('open', 'show', 'disabled')
  clickedlist = []
}
//Function to change the number of moves dynamically
function moveincrement() {
  moves = move.innerHTML
  moves++
  move.innerHTML = moves
  starRating()
}
//Function that starts a timer when the player starts the game
function startTimer() {
  timerInterval = setInterval(function() {
    sec++;
    if (sec == 60) {
      mins++;
      sec = 0;
    }
    if (mins == 60) {
      mins = 0;
      hours++;
    }
    //displaying the time
    timer.innerHTML = hours + " : " + mins + " : " + sec;
  }, 1000);

}
var stars = [...document.querySelectorAll('.fa-star')];
var rate = 3;
//function that calculate the rating based on moves
function starRating() {
  console.log("rating");
  if (moves == 5) {
    stars[2].classList.add('fa-star-o');
    stars[2].classList.remove('fa-star');
    rate = rate - 1;
  } else if (moves == 10) {
    stars[1].classList.add('fa-star-o');
    stars[1].classList.remove('fa-star');
    rate = rate - 1;
  } else if (moves >= 15) {
    rate = 1;
  }
}
//Function that restarts the game
function reload() {
  window.location.reload();
}
//Function to display message after the game is over
function over() {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    html: true,
    title: 'Congratulations You Have Won The Game',
    text: 'Using ' + moves + ' moves' + ' ' + 'In' + ' ' + mins + ' ' + ' minutes' + ' ' + sec + ' ' + ' seconds' + ' ' + 'Rating : ' + rate,
    type: 'success',
    confirmButtonText: 'Do you replay game?'
  }, function() {
    //operation that has to be performed after clicking the button
    location.reload();
  })
}
// Shuffle function to shuffle the cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
