var isColorChosen = false;
var isDifficultyChosen = false;
var difficulty = 1;
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var humanPlayer = "P";
var computerPlayer = "C";
var iter = 0;
var round = 0;
var computerColor = "white";
var humanColor = "#333";

function move(element, player, color) {
  if(board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).css("background-color", color);
    board[element.id] = player;

    if (isGameOver(board, player)) {
      setTimeout(function() {
        alert("YOU WIN");
        reset();
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function() {
        alert("TIE");
        reset();
      }, 500);
      return;
    } else {
      round++;
      var index = minimax(board, computerPlayer).index;
      var selector = "#" + index;
      $(selector).css("background-color", computerColor);
      board[index] = computerPlayer;
      if (isGameOver(board, computerPlayer)) {
        setTimeout(function() {
          alert("YOU LOSE");
          reset();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function() {
          alert("tie");
          reset();
        }, 500);
        return;
      }
    }
  }
}

function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").css("background-color", "transparent");
}

function minimax(reboard, player) {
  iter++;
  let array = getAvailableSpots(reboard);
  if (isGameOver(reboard, humanPlayer)) {
    return {
      score: -10
    };
  } else if (isGameOver(reboard, computerPlayer)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == computerPlayer) {
      var g = minimax(reboard, humanPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, computerPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === computerPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  if (player == computerPlayer) {
    if (Math.random() <= difficulty) {
    return moves[bestMove];
  }
    else {
      return moves[Math.floor(Math.random() * moves.length)];
  }}
  else {
    return moves[bestMove];}
}

function getAvailableSpots(reboard) {
  return reboard.filter(s => s != "P" && s != "C");
}

// winning combinations
function isGameOver(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}

$(".whiteCell").click(function() {
  computerColor = "#333";
  humanColor = "white";
  isColorChosen = true;
  if (isDifficultyChosen == true) {
    $("td").css("visibility", "visible");
    $(".twoModes, .chooseColorHeader").css("visibility", "hidden");
  }
  else {
     alert("Please select difficuty");
  }
});

$(".blackCell").click(function() {
  isColorChosen = true;
  if (isDifficultyChosen == true) {
    $(".twoModes, .chooseColorHeader").css("visibility", "hidden");
    $("td").css("visibility", "visible");}
  else {
     alert("Please select difficuty");
  }
});

$("td").click(function() {
    move(this, humanPlayer, humanColor);
    console.log("clicked");
    console.log(difficulty);
});

$(function() {
  $(".dial").knob();
});

$(".dial").knob({
  'release' : function () {
    difficulty = $("input").attr("value") * 0.01;
    if (isColorChosen == true) {
      $("td").css("visibility", "visible");
      $(".twoModes, .chooseColorHeader").css("visibility", "hidden");
      $("input, .chooseDifficultyHeader, .dial, canvas").css("visibility", "hidden");
    }
    else {
     alert("Please select colour");
  }
      }
  });