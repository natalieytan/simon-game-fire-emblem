
var audioFile = {
anna : "anna.wav",
sharena : "sharena.wav",
alfonse : "alfonse.wav",
virion : "virion.mp3"
};

var audioDamage = {
    anna : "annadamage.mp3",
    sharena : "sharenadamage.mp3",
    alfonse : "alfonsedamage.mp3",
    virion : "viriondamage.mp3"
};

var x = '';
var i = '';
var goal = 20;

var playingArray = null;


var namesArray = ["anna", "sharena", "alfonse", "virion"];
var randomArray = [];
var playerArray = [];

const pads = document.querySelectorAll('.pad');
var strict = false;
var on = false;


$("#switch").click(onOff);

// starts AND resets the Game
function startGame() {
    playerArray = [];
    randomArray = [];
    computerRandom();
    playRandomArray();
}

// Computer generates Random Hero
function computerRandom() {
    randomArray.push(namesArray[Math.floor(Math.random()*pads.length)]);
    console.log(randomArray);
}

// Computer plays Random Array and changes background 
function playRandomArray() {
    i = 0;
      playingArray = setInterval(playSoundBackground, 1500);    
    }
function playSoundBackground() {
    displayCount();
    $("#instructions").text("Pay attention!");
        x = randomArray[i];
        changeBackground();
        playSound();
        if (i < randomArray.length -1)    {
            i++;
        } else { 
            unlockPads();
            clearInterval(playingArray);
        yourTurnDelay();}
        }


// Checks if player choice is same is computer choice
function checkCorrect() {
 if (playerArray[playerArray.length-1] === randomArray[playerArray.length-1]) {
    playSound(x);
        } else {
            errorSound(x);
            displayError();
            setTimeout(displayCount, 500);
            if (strict) {
                $("#instructions").text("Game Over! Click start for a new sequence.");
                reset();
            } else {
                $("#instructions").text("Wrong! Try again from the beginning.");
            playerArray = [];}
        }
    }

// Checks if player has got final guess then locks pads and generates new
function checkLength() {
    if (playerArray.length === goal) {
        $("#instructions").text("You Win!");;
    } else if (playerArray.length === randomArray.length) {
        $("#instructions").text("Well done! Let's add one more.");
        lockPads();
        computerRandom();
        playerArray = [];
        setTimeout (playRandomArray, 500);
    }
    
}

// When pad is clicked;
function clickPad(paddy){
    $("#instructions").text("Your turn");
x = paddy.target.id;
setInterval (changeBackground(), 1000);   
playerArray.push(x);
console.log(playerArray);
checkCorrect();
checkLength();
}


// Code to play Sound
function playSound() {
var audio =  new Audio (audioFile[x]);
audio.play();
}

// Code to change pad backgrounds
function changeBackground() {
    $("#"+x).addClass("active-"+x);
    setTimeout(function(){
        $("#"+x).removeClass("active-"+x);
      }, 500);

}

function yourTurnDelay() {
    setTimeout(yourTurn, 1500)
}


function yourTurn() {
    $("#instructions").text("Your Turn!");
}
function displayCount() {
    $("#count").text(randomArray.length);
}

function displayError() {
$("#count").text("!!");
}
function errorSound() {
    var audioErr =  new Audio (audioDamage[x]);
    audioErr.play();
    }



// Strict Button
function makeStrict() {
    strict = !strict;
    if(strict) {
        $(".strictlight").addClass("strictactive");
    } else {
    $(".strictlight").removeClass("strictactive");
    }
}

// On Off Switch
function onOff() {
    on = !on;
    if(on) {
        $(".switchbutton").addClass("switchactive");
        $("#count").addClass("led-on");
        $("#instructions").text("Game turned on! Click start for new sequence!");
        unlockButtons();
        // code needed to Activate Count LED
    } else {
        clearInterval(playingArray);
        $("#instructions").text("Game is off. Turn on the game to play!");
        $(".switchbutton").removeClass("switchactive");
        $(".strictlight").removeClass("strictactive");
        $("#count").removeClass("led-on");
        $("#count").text("--");
        lockButtons();
        lockPads();
        playerAray = [];
        randomArray = [];
        //code needed to Deactivate Count LED
    }
}



// unlocksButtons
function unlockButtons() {
    document.getElementById("start").addEventListener('click', startGame, false);
    document.getElementById("strict").addEventListener('click', makeStrict, false);
}

//locks Buttons
function lockButtons() {
    document.getElementById("start").removeEventListener('click', startGame, false);
    document.getElementById("strict").removeEventListener('click', makeStrict, false);
}

// unlocks the Pads
function unlockPads() {
    for (var i=0; i <pads.length; i++) {
        pads[i].addEventListener('click', clickPad, false);
        }
}

// locks the Pads
function lockPads() {
    for (var i=0; i <pads.length; i++) {
        pads[i].removeEventListener('click', clickPad, false);
        } 
}