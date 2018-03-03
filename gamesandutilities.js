//detect if touch screen
function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

var $tttOpen = false;
var $simonOpen = false;
var $calcOpen = false;
var $gameSelectMenu = true;


function resetEverything(){
    $(".GameIcon").removeClass("IconHighlight");
    
    //reset tic tac toe
    console.log("resetting tic tac toe");
    $tttOpen = false;
    $("#ttt-game-container").css("display", "none");
    document.getElementById("ttt-game-select-container").style.display = "inline"; 
    document.getElementById("character-container").style.visibility = "hidden";
    gameReset();
    
    //reset simon
    console.log("resetting simon");
    $simonOpen = false;
    $("#simon-game-container").css("display", "none");
    document.getElementById("count-text").innerHTML = "";
    simonDisableClick = true;

    //reset calculator
    console.log("resetting calculator");
    $calcOpen = false;
    $("#calculator").css("display", "none");
    clearCalculator();
}

$(document).ready(function(){
  console.log("yo");

  //adds HasHover class to body to allow for hovering over elements
  if (!hasTouch()) {
    console.log("Not a touch screen, adding hover class!");
      $("body").addClass("HasHover");
  }
  
  //xxxxxx button clicks xxxxxxx
  $(".GameSelectButton").mousedown(function() {
    $(this).css({"box-shadow": "0px 0px 0px 0px black", "top": "5px"});
  });
  
  $(".GameSelectButton").mouseup(function() {
    $(this).css({"box-shadow": "5px 5px 5px 0px black", "top": "0px"});
  });  
  
  $(".GameSelectButton").click(function() {
    $(".GameSelectButton").css("display", "none");
    $("#menu-select-container").css({"top": 0});
    $("#icon-container").css("display", "flex");
    $(".GameIcon").css({"width": "30px", "height": "30px"});
    $gameSelectMenu = false;
  });

  //initial icon click on startup
  $(".GameIcon").click(function(){
    if ($gameSelectMenu){
      $(".GameSelectButton").css("display", "none");
      $("#menu-select-container").css({"top": 0});
      $(".GameIcon").css({"width": "30px", "height": "30px"});  
      $gameSelectMenu = false;
    };
  });
  
  //xxxxxxxxxx tic tac toe button click
  $("#ttt-button").click(function() {
    $("#ttt-game-container").css("display", "block");
    $("#ttt-icon").addClass("IconHighlight");
    $tttOpen = true;
    $simonOpen = false;
    $calcOpen = false;
  });

  //xxxxxxxxxx tic tac toe icon click
  $("#ttt-icon").click(function() {
    resetEverything();
    $("#ttt-game-container").css("display", "block");
    $("#ttt-icon").addClass("IconHighlight");
    $tttOpen = true;
  });

  
  //xxxxxxxxxx Simon button click
  $("#simon-button").click(function() {
    $("#simon-game-container").css("display", "block");
    $("#simon-icon").addClass("IconHighlight");
    $tttOpen = false;
    $simonOpen = true;
    $calcOpen = false;
  });

  //xxxxxxxxxx Simon icon click
  $("#simon-icon").click(function() {
    resetEverything();
    $("#simon-game-container").css("display", "block");
    $("#simon-icon").addClass("IconHighlight");
    $simonOpen = true;
  });

  
  //xxxxxxxxxx Calc button click
  $("#calculator-button").click(function() {
    $("#calculator").css("display", "block");
    $("#calc-icon").addClass("IconHighlight");
    $tttOpen = false;
    $simonOpen = false;
    $calcOpen = true; 
  });

  //xxxxxxxxxx Calc icon click
  $("#calc-icon").click(function() {
    resetEverything();
    $("#calculator").css("display", "block");
    $("#calc-icon").addClass("IconHighlight");
    $calcOpen = true; 
  });
 


  //for button hovers xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  $(".GameIcon").mouseover(function(){
    if ($("body").hasClass("HasHover") && $gameSelectMenu==false){
      console.log("Body has hover class, allowing hover!");
      $(this).effect("shake", {distance: 5}, 250);
    };    
  })

});

//xxxxxxxxxxxxx JS for tic tac toe xxxxxxxxxxx
var gameTitleTimer;
var beginTimer;
var cpuTimer;

var playerOneMark;
var playerTwoMark;
var cpuMark;
var singlePlayer = false;
var twoPlayer = false;
var playerOneTurn = false;
var playerTwoTurn = false;
var tttDisableClick = false;

//var result = "";
var markCount = 0;

var zoneArr = ["zone-one", "zone-two", "zone-three", "zone-four", "zone-five", "zone-six", "zone-seven", "zone-eight", "zone-nine"];

var zoneObjArr = {"zone-one": false, "zone-two": false, "zone-three": false, "zone-four": false, "zone-five": false, "zone-six": false, "zone-seven": false, "zone-eight": false, "zone-nine": false};


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//functionsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function cpuMove(){
  console.log("cpu is thinking");
  var zoneOne = zoneObjArr["zone-one"];
  var zoneTwo = zoneObjArr["zone-two"];
  var zoneThree = zoneObjArr["zone-three"];
  var zoneFour = zoneObjArr["zone-four"];
  var zoneFive = zoneObjArr["zone-five"];
  var zoneSix = zoneObjArr["zone-six"];
  var zoneSeven = zoneObjArr["zone-seven"];
  var zoneEight = zoneObjArr["zone-eight"];
  var zoneNine = zoneObjArr["zone-nine"];
  var cpuRepeat = false;
  clearTimeout(cpuTimer);
  
  if (zoneFive == false){
    zoneClick("zone-five");
  }else if (zoneOne == playerOneMark && zoneTwo ==playerOneMark && zoneThree == false){
    zoneClick("zone-three");  
  }else if (zoneOne == playerOneMark && zoneFour == playerOneMark && zoneSeven == false){
    zoneClick("zone-seven");
  }else if (zoneOne == playerOneMark && zoneFive == playerOneMark && zoneNine == false){
    zoneClick("zone-nine");
  }else if (zoneOne == playerOneMark && zoneSeven == playerOneMark && zoneFour == false){
    zoneClick("zone-four");
  }else if (zoneOne == playerOneMark && zoneThree == playerOneMark && zoneTwo == false){
    zoneClick("zone-two");
  }else if (zoneTwo == playerOneMark && zoneThree == playerOneMark && zoneOne == false){
    zoneClick("zone-one");
  }else if (zoneTwo == playerOneMark && zoneFive == playerOneMark && zoneEight == false){
    zoneClick("zone-eight");
  }else if (zoneThree == playerOneMark && zoneFive == playerOneMark && zoneSeven == false){
    zoneClick("zone-seven");
  }else if (zoneThree == playerOneMark && zoneSix == playerOneMark && zoneNine == false){
    zoneClick("zone-nine");
  }else if (zoneThree == playerOneMark && zoneNine == playerOneMark && zoneSix == false){
    zoneClick("zone-six");
  }else if (zoneFour == playerOneMark && zoneSeven == playerOneMark && zoneOne == false){
    zoneClick("zone-one");
  }else if (zoneFour == playerOneMark && zoneFive == playerOneMark && zoneSix == false){
    zoneClick("zone-six"); 
  }else if (zoneFive == playerOneMark && zoneSix == playerOneMark && zoneFour == false){
    zoneClick("zone-four");
  }else if (zoneFive == playerOneMark && zoneSeven == playerOneMark && zoneThree == false){
    zoneClick("zone-three");
  }else if (zoneFive == playerOneMark && zoneEight == playerOneMark && zoneTwo == false){
    zoneClick("zone-two");
  }else if (zoneFive == playerOneMark && zoneNine == playerOneMark && zoneOne == false){
    zoneClick("zone-one");
  }else if (zoneSix == playerOneMark && zoneNine == playerOneMark && zoneThree == false){
    zoneClick("zone-three");
  }else if (zoneSeven == playerOneMark && zoneEight == playerOneMark && zoneNine == false){
    zoneClick("zone-nine");
  }else if (zoneSeven == playerOneMark && zoneNine == playerOneMark && zoneEight == false){
    zoneClick("zone-eight");
  }else if (zoneEight == playerOneMark && zoneNine == playerOneMark && zoneSeven == false){
    zoneClick("zone-seven");
  }else{//pick a random spot
    var randomNumber = Math.floor(Math.random() * 9);
    console.log(randomNumber);
    var tempCpuZone = zoneArr[randomNumber];
    console.log("tempCpuZone: " + tempCpuZone);
    
    //check if zone is empty
    if (zoneObjArr[tempCpuZone] == false){
      zoneClick(tempCpuZone);
    }else{
      cpuMove();
      cpuRepeat = true;
    }
    
  };
  
  if (cpuRepeat == false){
    playerTwoTurn = false;
    playerOneTurn = true;
  };
  
}


function gameReset(){
  
  if ($tttOpen){
    clearTimeout(gameResetTimer);
  };
  
  zoneArr.forEach(function(zone) {
    //console.log(zone);
    document.getElementById(zone).innerHTML = "";
    zoneObjArr[zone] = false;
  });
  
  //document.getElementById("end-game-text").innerHTML = "Play Again?";
  
  document.getElementById("ttt-game-select-container").style.transform = "scale(1, 1)";
  
  document.getElementById("game-title").style.visibility = "visible";  
  document.getElementById("player-select-container").style.visibility = "visible";
  document.getElementById("game-title").style.opacity = "1";  
  document.getElementById("player-select-container").style.opacity = "1";
  document.getElementById("end-container").style.visibility = "hidden";
  
  
  //document.getElementById("end-container").style.opacity = "1";
  
  /*document.getElementById("character-container").style.visibility = "visible";
  document.getElementById("character-container").style.opacity = "1"; */
  
  /*$("#game-select-container").css("transform", "scale(1,.2)")
    $("#character-container").css("opacity", "0");
    $("#begin-container").css("visibility", "visible");
    $("#begin-container").css("opacity", "1");*/
    
  //singlePlayer = false;
  //twoPlayer = false;    
  playerOneMark = "";
  playerTwoMark = "";
  cpuMark = "";
  playerOneTurn = false;
  playerTwoTurn = false;
  markCount = 0;
  tttDisableClick = false;
}


function endGame(result){
  console.log("resetting game");
  console.log(result);
  
  if (result == "draw"){
    document.getElementById("end-game-text").innerHTML = "It's A Draw!";
  }else if (result == playerOneMark){
    document.getElementById("end-game-text").innerHTML = "Player One Wins!";
  }else if (result == playerTwoMark){
    document.getElementById("end-game-text").innerHTML = "Player Two Wins!"
  }else if (result == cpuMark){
    document.getElementById("end-game-text").innerHTML = "CPU Wins!";
  }
  
  document.getElementById("end-container").style.visibility = "visible";
  //document.getElementById("end-container").style.opacity = "0";
  //document.getElementById("end-container").style.display = "inline";
  
  document.getElementById("ttt-game-select-container").style.display = "inline"; 
  /*document.getElementById("end-container").style.opacity = ".5";*/
  gameResetTimer = setTimeout(gameReset, 1750);
}


function determineWinner(markCount){
  var zoneOne = zoneObjArr["zone-one"];
  var zoneTwo = zoneObjArr["zone-two"];
  var zoneThree = zoneObjArr["zone-three"];
  var zoneFour = zoneObjArr["zone-four"];
  var zoneFive = zoneObjArr["zone-five"];
  var zoneSix = zoneObjArr["zone-six"];
  var zoneSeven = zoneObjArr["zone-seven"];
  var zoneEight = zoneObjArr["zone-eight"];
  var zoneNine = zoneObjArr["zone-nine"];
  var winningMark = "";
 
  if ((zoneOne==zoneTwo) && (zoneOne == zoneThree) && (zoneOne != false)){
    winningMark = zoneOne;
    console.log("winner1 is " + winningMark);
  }else if ((zoneOne == zoneFour) && (zoneOne == zoneSeven) && (zoneOne != false)){
    winningMark = zoneOne;
    console.log("winner2 is " + winningMark);
  }else if ((zoneOne == zoneFive) && (zoneOne == zoneNine) && (zoneOne != false)){
    winningMark = zoneOne;
    console.log("winner3 is " + winningMark);
  }else if ((zoneTwo == zoneFive) && (zoneTwo == zoneEight) && (zoneTwo != false)){
    winningMark = zoneTwo;
    console.log("winner4 is " + winningMark);
  }else if ((zoneThree == zoneFive) && (zoneThree == zoneSeven) && (zoneThree != false)){
    winningMark = zoneThree;
    console.log("winner5 is " + winningMark);
  }else if ((zoneThree == zoneSix) && (zoneThree == zoneNine) && (zoneThree != false)){
    winningMark = zoneThree;
    console.log("winner6 is " + winningMark);
  }else if ((zoneFour == zoneFive) && (zoneFour == zoneSix) && (zoneFour != false)){
    winningMark = zoneFour;
    console.log("winner7 is " + winningMark);
  }else if ((zoneSeven == zoneEight) && (zoneSeven == zoneNine) && (zoneSeven != false)){
    winningMark = zoneSeven;
    console.log("winner8 is " + winningMark);
  }else if (markCount == 9){
    console.log("Its a draw: No winner");
    winningMark = "draw";
  }else{
    console.log("do nothing");
    winningMark = "";
    
    if (singlePlayer && playerTwoTurn){
      console.log("cpu's turn!");
      tttDisableClick = true;
      cpuTimer = setTimeout(cpuMove, 1000);
    };
    
  };
  
  var result = winningMark;
  
  if (result != ""){
    endGame(result);  
    document.getElementById("turn-indicator-container").style.visibility = "hidden";
    document.getElementById("player-one-indicator").classList.add("player-turn");
    document.getElementById("player-two-indicator").classList.remove("player-turn");
  };
}

function zoneClick(zone){
  console.log("zone: " + zone);
  
  if (zoneObjArr[zone] == false){
    if (playerOneTurn){
      var tempPlayerMark = playerOneMark;
      playerOneTurn = false;
      playerTwoTurn = true;
      
      //add and remove class for player turn indicator
      document.getElementById("player-one-indicator").classList.remove("player-turn");
      document.getElementById("player-two-indicator").classList.add("player-turn");
      
      /*if (singlePlayer){
        console.log("cpu's turn!");
        cpuTimer = setTimeout(cpuMove, 1000);
      };*/
      
    }else{
      if (singlePlayer){
        var tempPlayerMark = cpuMark; 
        tttDisableClick = false;
      }else{
        var tempPlayerMark = playerTwoMark;
      }
      
      playerTwoTurn = false;
      playerOneTurn = true;
      
      //add or remove class for player turn indicator
      document.getElementById("player-two-indicator").classList.remove("player-turn");
      document.getElementById("player-one-indicator").classList.add("player-turn");
    };
    
    zoneObjArr[zone] = tempPlayerMark;
    var tempDiv = document.createElement("div");
    tempDiv.classList.add("mark", tempPlayerMark)
    var tempMark = document.createTextNode(tempPlayerMark);
    tempDiv.appendChild(tempMark);
    document.getElementById(zone).appendChild(tempDiv);
    
    markCount++;
    
    determineWinner(markCount);
    
  };
  
}


function optionTimer(){
  console.log("timer disabled!");
  clearTimeout(gameTitleTimer);
  document.getElementById("game-title").style.visibility = "hidden";
  document.getElementById("player-select-container").style.visibility = "hidden";
};

function removeBegin(){
  clearTimeout(beginTimer);
  //document.getElementById("begin-container").style.display = "none";
  document.getElementById("begin-container").style.visibility = "hidden";
  document.getElementById("begin-container").style.opacity = "0";
  //document.getElementById("game-select-container").style.visibility = "hidden";
  document.getElementById("ttt-game-select-container").style.transform = "scale(0, 0)";
  document.getElementById("ttt-game-select-container").style.display = "none";
  
  document.getElementById("turn-indicator-container").style.visibility = "visible";
  
}


function playerSelect(){
  //document.getElementById("game-select-container").style.width = "0";
  
  gameTitleTimer = setTimeout(optionTimer, 1000);
  document.getElementById("game-title").style.opacity = "0";  
  document.getElementById("player-select-container").style.opacity = "0";
  
  document.getElementById("character-container").style.display = "flex";
  document.getElementById("character-container").style.visibility = "visible";
  document.getElementById("character-container").style.opacity = "1"; 
}  

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxx Jquery xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$(document).ready(function(){
  //Select single or two player 
  $(".player-option").hover(
  function(){
    if ($("body").hasClass("HasHover")){
        console.log("Body has hover class, allowing hover!");
        $(this).css("border", "1px solid white");
    };
  }, function(){
    $(this).css("border", "none");
  });
  
  $("#single-player").click(function(){
    console.log("Single player selected!");
    singlePlayer = true;
    twoPlayer = false;
    $("#player-two-indicator").text("CPU");
    playerSelect();
  });
  
  $("#two-player").click(function(){
    console.log("Two player selected");
    twoPlayer = true;
    singlePlayer = false;
    $("#player-two-indicator").text("P2");
    playerSelect();
  });
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
  //Select X or O
  $(".character").mouseover(function(){
    $(this).effect("shake", {distance: 5} );
  });
  
  $("#x-character").click(function(){
    playerOneMark = "X";
    console.log("Player one is X");
    
    if (singlePlayer){
      cpuMark = "O";
      console.log("Cpu is O")
    }else{
      playerTwoMark = "O";
      console.log("Player two is O");
    }
    
  });
  
  $("#o-character").click(function(){
    playerOneMark = "O";
    console.log("Player one is O");
    
    if (singlePlayer){
      cpuMark = "X";
      console.log("cpu is X");
    }else{
      playerTwoMark = "X";
      console.log("Player two is X");
    }
    
  });
  
  $(".character").click(function(){
    $("#ttt-game-select-container").css("transform", "scale(1,.2)")
    $("#character-container").css("opacity", "0");
    //$("#begin-container").css("display", "inline");
    $("#begin-container").css("visibility", "visible");
    $("#begin-container").css("opacity", "1");
    beginTimer = setTimeout(removeBegin, 2000);
    playerOneTurn = true;
  });
  
 //zone clicks 
  $(".zone").click(function(){
    var tempZone = $(this).attr("id");
    console.log(tempZone);
    
    if (tttDisableClick){
      console.log("click disabled");
    }else{
      zoneClick(tempZone); 
    }
     
  });
 
  
});

// xxxxxxxxxxxxxxxxxx JS for Simon xxxxxxxxxxxxxxxxxxxxxxx
var soundOne = new Audio("./sounds/simonSound1.mp3"); 
var soundTwo = new Audio("./sounds/simonSound2.mp3");
var soundThree = new Audio("./sounds/simonSound3.mp3"); 
var soundFour = new Audio("./sounds/simonSound4.mp3");
var soundBuzzer = new Audio("./sounds/beep-10.mp3");
var soundDing = new Audio("./sounds/coin.wav");
var soundWin = new Audio ("./sounds/tada.mp3");

var soundArr = [soundOne, soundTwo, soundThree, soundFour];

var buttonArr = ["red-button", "blue-button", "yellow-button", "green-button"];

var patternArr = [];
var patternIndex = 0;

var simonDisableClick = true;
var disableStart = false;
var strictMode = false;
var playerPatternCount = 0;
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function playerClick(button){
  //console.log(button + " was clicked");
  var buttonIndex = buttonArr.indexOf(button);
  //console.log(buttonIndex);
  
  if (patternArr[playerPatternCount] == buttonIndex){
    //console.log("matched!");
    
    if (playerPatternCount == patternArr.length - 1){
      //console.log("Good job");
      
      if (patternArr.length == 20){
        //console.log("YOU WIN!!!!!!");
        soundWin.play();
        document.getElementById("count-text").innerHTML = "!!!";
        simonDisableClick = true;
      }else{
        soundDing.play();
        setTimeout(setPattern, 1500);
      };
    }else{
      soundArr[buttonIndex].play();
      playerPatternCount++;
    };
    
  }else{
    //console.log("WRONG! TRY AGAIN!!");
    document.getElementById("count-text").innerHTML="!"
    soundBuzzer.play();
    //playerPatternCount = 0;
    if (strictMode){
      patternArr = [];
      setTimeout(function(){setPattern();}, 1500);
      //setPattern();
    }else{
      patternIndex = 0;
      setTimeout(function(){playPattern();}, 1500);
    }
    
  };
}

function playPattern(){
  disableStart = true;
  simonDisableClick = true;
  var temp = patternArr[patternIndex];
  //console.log("CPU selected " + temp);
  soundArr[temp].play();
  document.getElementById(buttonArr[temp]).style.filter="brightness(100%)";
  
  patternIndex ++;
  
  if (patternIndex<patternArr.length){
    setTimeout(playPattern, 1000);
  }else{
    disableStart = false;
    //console.log("xxx disblae start is: " + disableStart);
    simonDisableClick = false;
    playerPatternCount = 0;
    document.getElementById("count-text").innerHTML=patternArr.length;
  }
  
  setTimeout(function(){
    document.getElementById(buttonArr[temp]).style.filter="brightness(80%)";
  }, 500);
}


function setPattern(){
  disableStart = true;
  //console.log("1st disable start: " + disableStart);
  var randomIndex = Math.floor(Math.random() * 4);
  //console.log(randomIndex);
  patternArr.push(randomIndex);
  //console.log(patternArr);
  
  patternIndex = 0;
  playPattern();  
}


function startupLights(){
  var red = "red-button";
  var blue = "blue-button";
  var yellow = "yellow-button";
  var green = "green-button";

  document.getElementById("count-text").innerHTML = "- -";
  
  document.getElementById(red).style.filter="brightness(100%)";
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(80%)";
    document.getElementById(blue).style.filter="brightness(100%)";
  }, 250);
  
  setTimeout(function(){
    document.getElementById(blue).style.filter="brightness(80%)";
    document.getElementById(yellow).style.filter="brightness(100%)";
  }, 500);
  
  setTimeout(function(){
    document.getElementById(yellow).style.filter="brightness(80%)";
    document.getElementById(green).style.filter="brightness(100%)";
  }, 750);
  
  setTimeout(function(){
    document.getElementById(green).style.filter="brightness(80%)";
    document.getElementById(red).style.filter="brightness(100%)";
  }, 1000);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(80%)";
    document.getElementById(green).style.filter="brightness(100%)";
  }, 1250);
  
  setTimeout(function(){
    document.getElementById(green).style.filter="brightness(80%)";
    document.getElementById(yellow).style.filter="brightness(100%)";
  }, 1500);
  
  setTimeout(function(){
    document.getElementById(yellow).style.filter="brightness(80%)";
    document.getElementById(blue).style.filter="brightness(100%)";
  }, 1750);
  
  setTimeout(function(){
    document.getElementById(blue).style.filter="brightness(80%)";
    document.getElementById(red).style.filter="brightness(100%)";
  }, 2000);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(80%)";
  }, 2250);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(100%)";
    document.getElementById(blue).style.filter="brightness(100%)";
    document.getElementById(yellow).style.filter="brightness(100%)";
    document.getElementById(green).style.filter="brightness(100%)";
  }, 2500);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(80%)";
    document.getElementById(blue).style.filter="brightness(80%)";
    document.getElementById(yellow).style.filter="brightness(80%)";
    document.getElementById(green).style.filter="brightness(80%)";
  }, 2750);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(100%)";
    document.getElementById(blue).style.filter="brightness(100%)";
    document.getElementById(yellow).style.filter="brightness(100%)";
    document.getElementById(green).style.filter="brightness(100%)";
  }, 3000);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(80%)";
    document.getElementById(blue).style.filter="brightness(80%)";
    document.getElementById(yellow).style.filter="brightness(80%)";
    document.getElementById(green).style.filter="brightness(80%)";
  }, 3250);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(100%)";
    document.getElementById(blue).style.filter="brightness(100%)";
    document.getElementById(yellow).style.filter="brightness(100%)";
    document.getElementById(green).style.filter="brightness(100%)";
  }, 3500);
  
  setTimeout(function(){
    document.getElementById(red).style.filter="brightness(80%)";
    document.getElementById(blue).style.filter="brightness(80%)";
    document.getElementById(yellow).style.filter="brightness(80%)";
    document.getElementById(green).style.filter="brightness(80%)";
  }, 3750);
}


$(document).ready(function(){
  $(".SimonButton").click(function(){
    var buttonId = $(this).attr('id');
    
    if (simonDisableClick == false){
      playerClick(buttonId);
    };
    
  });
  
  $(".SimonButton").mousedown(function(){
    $(this).css({"transform": "translateY(1px)", "filter": "brightness(100%)"});
  });
  
  $(".SimonButton").mouseup(function(){
    $(this).css({"transform": "translateY(-1px)", "filter": "brightness(80%)"});
  });
  
  
  $(".small-button").mousedown(function(){
    $(this).css({"box-shadow": "0 0 1px 1px #888888", "transform": "translateY(1px)"});
  });
  
  $(".small-button").mouseup(function(){
    $(this).css({"box-shadow": "0 2px 2px 2px #888888", "transform": "translateY(-1px)"});
  });
  
  $("#start-button").click(function(){
    if (disableStart == false){
      disableStart = true;
      //console.log("start button clicked");
      patternArr = [];//reset and empty arr; disable for now
      startupLights();
      setTimeout(setPattern, 4250);
    }else{
      console.log("start is disabled!");
    };
  });
  
  $("#strict-button").click(function(){
    if (strictMode){
      document.getElementById("strict-light").style.backgroundColor="black";
      strictMode = false;
    }else{
      document.getElementById("strict-light").style.backgroundColor="#66ff33";
      strictMode = true;
    };
  });
  
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxx JS for Calculator xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//var historyArr = ["4", "-", "2", "+", "9"];
var historyArr = [];
var historyStr = "";
var result = 0;
var tempNumber;
var oldResult;
var keycodeArray = {96: "0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9", 110:".", 13: "=", 111:"/", 106:"*", 109:"-", 107:"+", 46:"AC", 8:"\u21E6", 48: "0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 190:".", 187: "=", 191:"/", 189:"-"};

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function buttonClick(input){
  console.log("input: " + input);
  console.log(typeof input);
  

  if (input === "AC"){
    console.log("Clear button!");
    clearCalculator();
  
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  }else if (historyArr.length === 0){//must start with number (1-9) or decimal
    if (/[1-9]/.test(input) || input === "."){
      console.log("input is a number or a period");
      tempNumber = input;
      historyArr.push(input);
      historyStr = historyArr.join("");
      console.log("history Str: " + historyStr);
      $("#history").append(historyStr);
      console.log("tempnumber: " + tempNumber);
      console.log("histArrTest: " + historyArr);
    }else{
      console.log("must start with number (1-9) or decimal to begin");
    };
  
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  }else if (/\d/.test(input) || input === "."){//input is a number or period
    oldResult = "";//reset old result to prevent "backspacing a result" check from interferring with backspaces
    
    if (input=== "." && /\./.test(tempNumber)){//if a decimal point has already been used, then do nothing
      console.log("decimal already used...ignore input");
    }else{
      tempNumber += input;
    
      if (/\d/.test(historyArr[historyArr.length-1]) || historyArr[historyArr.length-1] === ".") {
        historyArr.pop();
      };
      
      historyArr.push(tempNumber);
    };
   
    historyStr = historyArr.join("");
    console.log(historyArr);
    console.log("history Str: " + historyStr);
    $("#history").append(historyStr);
  
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  }else if (input === "="){//equals sign
    if (/\d$/.test(historyArr[historyArr.length-1])){//previous was a number and ended with a number
      console.log("previous input was a number and will begin calculating!!!");
      console.log("xxxxxxxx previous input: " + historyArr[historyArr.length-1]);
    }else if (/\.$/.test(historyArr[historyArr.length-1])){//previous input ended with a decimal
      if (historyArr.length === 1){//decimal without number and equals accidentally clicked
        console.log("whoops equals hit with decimal"); 
      }else{//decimal entered in error and is removed
        historyArr[historyArr.length-1] = historyArr[historyArr.length-1].replace(/\./, "");
      };
      
    }else{//previous input was an operator
      console.log("previous input was NOT a number or decimal and will be removed");
      historyArr.pop();
    };
    
    historyStr = historyArr.join("");
    console.log("history Str: " + historyStr);
    console.log(historyArr);
    $("#history").append(historyStr);//appends input before calculation
    
    var result = calculate(historyArr);
    
    if (isNaN(result)){
      console.log("result is NAN");
      $("#result").append("Error"); 
      historyArr = [];
      historyStr = "";
      tempNumber = "";
      result = 0;
      oldResult = "";
    }else if ((result.toString()).length > 13){
      console.log("reached character limit!");
      historyArr = [];
      historyStr = "";
      tempNumber = "";
      result = 0;
      oldResult = "";
      $("#result").append("Error");
      $("#history").empty();
      $("#history").append("Character Limit");
    }else{
      $("#result").append(result);
      historyArr = [result.toString()];
      tempNumber = "";
      console.log("tempNumber: " + tempNumber);
      oldResult = result;
    };
  
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  }else if(input === "\u21E6"){//backspace
    console.log("xxxxx test: ");
    console.log(historyArr);
    console.log("Oldresult: " + oldResult);
    
    if (historyArr.length === 0 || historyArr[0] == oldResult){
      console.log("nothing to backspace!");
      //maybe delete this?
    }else{
      console.log("backspacing!");
      var lastInput = historyArr[historyArr.length-1];
      console.log("last input: " + lastInput);
      
      if (lastInput.length === 1){
        console.log("backspacing operator or lone number/decimal");
        historyArr.pop();
        console.log(historyArr);
        if (/\d/.test(historyArr[historyArr.length-1])){//if input before lastInput is not an operator, make continuation of tempNumber possible
          console.log("xx crurent testt");
          console.log(historyArr[historyArr.length-1]);
          tempNumber = historyArr[historyArr.length-1];
        }else{
          tempNumber = "";
        };
        
      }else{
        console.log("backspacing from string of numbers");
        historyArr.pop();
        var backspacedInput = lastInput.substring(0, lastInput.length-1);
        console.log(backspacedInput);
        historyArr.push(backspacedInput);
        tempNumber = backspacedInput; 
      };
      
      console.log("tempnumber: " + tempNumber);
      
    };
    
    historyStr = historyArr.join("");
    $("#history").append(historyStr); 
  
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  }else if (input == "%"){//percentage clicked
    oldResult = "";//reset old result to prevent "backspacing a result" check from interferring with backspaces
    console.log("PERCENTAGE CLICKED!");
    var lastInput = historyArr[historyArr.length-1];
    console.log("lastInput: " + lastInput);
    console.log("tempNumber: " + tempNumber);
    
    if (/\d/.test(lastInput) || /\./.test(lastInput)){//not an operator
      console.log("last input has numbers or decimals and is not an operator");
      
      if (/\.$/.test(lastInput)){//decimal at end and will be removed
        console.log("decimal at end will be removed");
        
        if (lastInput.length == 1){
          console.log("decimal is by itself");
          historyArr[historyArr.length-1] = 0;
        }else{
          var decimalRemoved = historyArr[historyArr.length-1].replace(/\.$/, "");
          historyArr[historyArr.length-1] = ((decimalRemoved * 0.01).toFixed(2)).toString();
          //tempNumber = decimalRemoved;
          console.log("historyArr: " + historyArr);
        };
        
      }else{
        //console.log("old: " + historyArr[historyArr.length-1]);
        historyArr[historyArr.length-1] = ((historyArr[historyArr.length-1] * 0.01).toFixed(2)).toString();
        //console.log("new: " + historyArr[historyArr.length-1]);
      };
      
    }else{//last input is an operator
      console.log("last input is an operator, operator will be removed");
      historyArr.pop();
      historyArr[historyArr.length-1] = (historyArr[historyArr.length-1] *0.01).toString();
      
    };
    
    historyStr = historyArr.join("");
    $("#history").append(historyStr); 
  
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  }else{//input is an operator
    oldResult = "";//reset old result to prevent "backspacing a result" check from interferring with backspaces
    
    if (historyArr[historyArr.length-1] === input){
      console.log("same operator, doing nothing");
    }else if (/\d$/.test(historyArr[historyArr.length-1])){//previous input was a number
      console.log("Previous input was a number and new input is an operator");
      tempNumber = "";
      historyArr.push(input);
    }else if (/\.$/.test(historyArr[historyArr.length-1])){//previouss input ended in a decimal
      console.log("previous input was a decimal");
      
      if (/\d/.test(historyArr[historyArr.length-1])){//if decimal was a mis-click and a number is present
        console.log("decimal was a mis-click");
        historyArr[historyArr.length-1] = historyArr[historyArr.length-1].replace(/\./, "");
        tempNumber = "";
        historyArr.push(input);
      }else{
        console.log("cannot start with a decimal and operator");
      }
      
    }else{//previous input was an operator and will be replaced with the new input
      console.log("previous input was an operator, replacing with new input");
      historyArr.pop();
      historyArr.push(input);
    };
    
    historyStr = historyArr.join("");
    console.log(historyArr);
    console.log("history Str: " + historyStr);
    $("#history").append(historyStr); 
  };
  
  
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function calculate(inputArr){
  var result;
  var tempOperator;
  $("#result").empty();
  
  console.log("input: " + inputArr);
  
  for (var i=0; i<inputArr.length; i+=2){
    var currentNumber = parseFloat(inputArr[i]);
    console.log("currentNumber: " + currentNumber);
    
    if (i === 0){
      result = currentNumber;
      
    }else{
    
      switch (inputArr[i-1]){
        case "+":
          console.log("operator is Plus sign");
          result += currentNumber;
          break;
        case "-":
          console.log("operator is minus sign");
          result -= currentNumber;
          break;
        case "*":
          console.log("operator is multiplication sign");
          result *= currentNumber;
          break;
        case "/":
          console.log("operator is division sign");
          result /= currentNumber;
          break;
        case "%":
          console.log("operator is percentage sign");
          console.log("fix later do nothing");
          break;
      };
      
    };  
    
  };
  console.log("result: " + result);
  console.log("result Length: " + (result.toString()).length);
  
  if (/\./.test(result)){//if result has a decimal
    console.log("result has a decimal");
    var resultDecimal = (result.toString()).match(/\.\d+/g);
    console.log("resultDecimal: " + resultDecimal[0]);
    console.log("resultDecimal length: " + resultDecimal[0].length);
    
    if (resultDecimal[0].length > 3){//used to avoid extra long decimals
      console.log("length is too long");
      result = result.toFixed(2);
    };
  };
  
  return result;
 
};

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function clearCalculator(){
  $("#history").empty();  
  $("#result").empty();
  historyArr = [];
  historyStr = "";
  tempNumber = "";
  result = 0;
  oldResult = "";
  $("#result").append(result);
  
  console.log("working");
  console.log("historyArr: " + historyArr);
  console.log("historyStr: " + historyStr);
  console.log("tempNumber: " + tempNumber);
};


$(document).ready(function(){
  $("#result").append(result);
  $("#history").append(historyStr);
  
  $(".CalcButton").hover(
  function() {
    if ($("body").hasClass("HasHover")){
        console.log("Body has hover class, allowing hover!");
        $( this ).addClass( "hover" );
    };
  }, function() {
    $( this ).removeClass( "hover" );
  });
  
  $(".CalcButton").click(function(){
    if (historyStr.length <=20){
      console.log("good");
      $("#history").empty();
      var $buttonValue = $(this).text();
      buttonClick($buttonValue);
    }else{
      console.log("Over the limit!");
      clearCalculator();
      $("#result").empty();
      $("#result").append("Error");
      $("#history").empty();
      $("#history").append("Character Limit");
    };

  
  });
  
  //For keyboard entry
  /*$(document).keyup(function(e) {
    console.log("Keystroke: " + e.keyCode);
    
    for (var key in keycodeArray){
      if (e.keyCode == key){
        console.log("keystroke is equal to: " + keycodeArray[key]);
        $("#history").empty();
        buttonClick(keycodeArray[key]);
      };
    }; 
    
  });*/

  var $shift = false;
  
  $(document).keyup(function(e) {
    console.log("Keystroke: " + e.keyCode);
    if ($calcOpen){
      if (e.keyCode == 16){
        $shift = false;
        console.log("shift: " + $shift);
      }else{
    
        for (var key in keycodeArray){
          if (e.keyCode == key && $shift){
            var $tempKeyStroke = "";
            switch(e.keyCode){
              case 187:
                console.log("keystroke is equal to: +");
                $tempKeyStroke = "+";
                break;
              case 56:
                console.log("keystroke is equal to: *");
                $tempKeyStroke = "*";
                break;
              case 53:
                console.log("keystroke is equal to: %");
                $tempKeyStroke = "%";
                break;
            };
            
            console.log("test statement after switch");
            
            if (historyStr.length <=20){
              console.log("good");
              $("#history").empty();
              buttonClick($tempKeyStroke);
            }else{
              console.log("Over the limit!");
              clearCalculator();
              $("#result").empty();
              $("#result").append("Error");
              $("#history").empty();
              $("#history").append("Character Limit");
            };

            
            
          }else if(e.keyCode == key){
            console.log("keystroke is equal to: " + keycodeArray[key]);

            if (historyStr.length <=20){
              console.log("good");
              $("#history").empty();
              buttonClick(keycodeArray[key]);
            }else{
              console.log("Over the limit!");
              clearCalculator();
              $("#result").empty();
              $("#result").append("Error");
              $("#history").empty();
              $("#history").append("Character Limit");
            };

            
          };
        };  
      };
    };
    
  });
  
  $(document).keydown(function(e){
    if (e.shiftKey && $calcOpen){
      console.log("shift has been pressed");
      $shift = true;  
      console.log($shift);
    };
  });
  
})


