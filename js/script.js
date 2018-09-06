/*** VARIABLES ***/

var allCards = ["club01.png", "club02.png", "club03.png", "club04.png", "club05.png", "club06.png", "club07.png", "club08.png", "club09.png", "club10.png", "club11.png", "club12.png", "club13.png", "club14.png", "club15.png", "club16.png", "club17.png", "club18.png", "club19.png", "club20.png", "Xclub01.png", "Xclub02.png", "Xclub03.png", "Xclub04.png", "Xclub05.png", "Xclub06.png", "Xclub07.png", "Xclub08.png", "Xclub09.png", "Xclub10.png", "Xclub11.png", "Xclub12.png", "Xclub13.png", "Xclub14.png", "Xclub15.png", "Xclub16.png", "Xclub17.png", "Xclub18.png", "Xclub19.png", "Xclub20.png"];

var length = allCards.length;
var btn_click = new Audio('css/sounds/btn.wav');
var oneVisible = false;
var firstNumber;
var turnsCounter = 0;
var pairsCounter = 0;
var pairsCounterTwo = 0;
var lock = false;
var twoPlayers = false;
var c = [];

/*** FUNCTIONS ***/

function startGame() {
    $('.start').addClass('hidden');
    $('.container').removeClass('hidden');  
    sortCards();
}

function sortCards() {
    allCards.sort(function(a, b){ return 0.5 - Math.random()});
}


for (var i = 0; i < length; i++) {
    (function(i) {
        c[i] = document.getElementById('card' + i);
        c[i].addEventListener('click', function() {
            revealCard(i);
        });
    }(i));
};

function revealCard(i) {
    if (twoPlayers === false) {
        if(lock === false) {    
            lock = true;
            $('#card' + i).css('background-image', 'url(css/img/' + allCards[i] + ')');
            $('#card' + i).addClass('cardActive');
            $('#card' + i).removeClass('card');
            btn_click.play();

            if (oneVisible === false) {
                oneVisible = true;
                firstNumber = i;
                lock = false;
            } else {
                oneVisible = false;
                if (('X' + allCards[i]) === allCards[firstNumber] || allCards[i] == ('X' + allCards[firstNumber])) {
                    setTimeout(function() { hide(i, firstNumber) }, 500);
                    pairsCounter++;
                    $('#score1').html('Matched pairs: ' + pairsCounter);
                } else {
                    setTimeout(function() { restore(i, firstNumber) }, 1000);
                }
                turnsCounter++;
                $('#turns').html('Turns counter: ' + turnsCounter);
        }};
    } else {
        if(lock === false) { 
            lock = true;
            $('#card' + i).css('background-image', 'url(css/img/' + allCards[i] + ')');
            $('#card' + i).addClass('cardActive');
            $('#card' + i).removeClass('card');
            btn_click.play();

            if (oneVisible == false) {
                oneVisible = true;
                firstNumber = i;
                lock = false;
            } else {
                oneVisible = false;
                if (('X' + allCards[i]) === allCards[firstNumber] || allCards[i] === ('X' + allCards[firstNumber])) {
                    setTimeout(function() { hide(i, firstNumber) }, 500);
                    if ($('#player1').hasClass('activePlayer')) {
                        pairsCounter++;
                        $('#score1').html('Matched pairs: ' + pairsCounter);
                    } else {
                        pairsCounterTwo++;
                        $('#score2').html('Matched pairs: ' + pairsCounterTwo);
                        };
                } else {
                    setTimeout(function() { restore(i, firstNumber) }, 1000);
                    if ($('#player1').hasClass('activePlayer')) {
                        $('#player1').removeClass('activePlayer');
                        $('#player2').addClass('activePlayer');
                    } else {
                        $('#player2').removeClass('activePlayer');
                        $('#player1').addClass('activePlayer');
                    }
                }
                turnsCounter++;
                $('#turns').html('Turns counter: ' + turnsCounter);
        }}
    }; 
};

function hide(a, b) {
    $('#card' + a).css('visibility', 'hidden');
    $('#card' + b).css('visibility', 'hidden');
    restore(a, b);
    lock = false;
    
    if (twoPlayers === false) {
        if ((pairsCounter) === 20) {
            $('.container').addClass('hidden');
            $('.end').removeClass('hidden');
            $('#score').html(turnsCounter + ' rounds');
    }} else {
        if ((pairsCounter + pairsCounterTwo) === 20 && (pairsCounter > pairsCounterTwo)) {
            $('.container').addClass('hidden');
            $('.end').removeClass('hidden');
            $('#score').html(pairsCounter + ' pairs matched in ' + turnsCounter + ' rounds');
            $('#text').html('Congratualtions Player 1! Your score is:')
        } else if ((pairsCounter + pairsCounterTwo) === 20 && (pairsCounterTwo > pairsCounter)) {
            $('.container').addClass('hidden');
            $('.end').removeClass('hidden');
            $('#score').html(pairsCounterTwo + ' pairs matched in ' + turnsCounter + ' rounds');
            $('#text').html('Congratualtions Player 2! Your score is:')
        } else if ((pairsCounter + pairsCounterTwo) === 20 && (pairsCounterTwo == pairsCounter)) {
            $('.container').addClass('hidden');
            $('.end').removeClass('hidden');
            $('#score').html(pairsCounterTwo + ' pairs matched in ' + turnsCounter + ' rounds');
            $('#text').html('It is a draw! Your score is:');
        }    
}};

function restore(a, b) {
    $('#card' + a).css('background-image', 'url(css/img/cover.png)');
    $('#card' + a).addClass('card');
    $('#card' + a).removeClass('cardActive');    
    $('#card' + b).css('background-image', 'url(css/img/cover.png)');
    $('#card' + b).addClass('card');
    $('#card' + b).removeClass('cardActive');
    lock = false;
};

function restart() {
    $('.card').css('visibility', 'visible');
    turnsCounter = 0;
    pairsCounter = 0;
    pairsCounterTwo = 0;
    $('#score1').html('Matched pairs: ' + pairsCounter);
    $('#score2').html('Matched pairs: ' + pairsCounterTwo);
    $('#turns').html('Turns counter: ' + turnsCounter);
    twoPlayers = false;
    $('.start').removeClass('hidden');
    $('.end').addClass('hidden');
    $('.cardActive').css('background-image', 'url(css/img/cover.png)');
    $('.cardActive').addClass('card');
    $('.cardActive').removeClass('cardActive');
    $('#player2').addClass('hiddenAside');
    $('#player1').removeClass('activePlayer');
    $('#player2').removeClass('activePlayer');
    lock = false;
    oneVisible = false;
};


/*** EVENT HANDLERS ***/

$('#P1').click(function () {
    startGame();
});

$('#P2').click(function () {
    startGame();  
    $('.player').removeClass('hiddenAside');
    $('#player1').addClass('activePlayer');
    twoPlayers = true;
});

$('#again').click(function() {
    restart();
});

$('.home').click(function() {
    $('.container').addClass('hidden'); 
    restart();
});

