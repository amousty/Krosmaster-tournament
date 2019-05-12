$(document).ready(function(){
	if((typeof players === "undefined" || typeof maps === "undefined" || typeof teams === "undefined" || typeof characters === "undefined")
			|| (players.length < 1 || maps.length < 1 || teams.length < 1 || characters.length < 1) ){
			// Doc has not been init before
			initGlobalVariables();
			includeHTML();
			intitalizeEvent();
	}
	GenerateTeamDisplay();
});

var characterTeamPerPlayer = [];

function generateRandomTeam(){
  var teamLevel = 0;
  var characterTeam = [];
  while(teamLevel != 12){
    var character = getCharacter(getRandomCharacter());

    /*
      Allowed :
        - Only use once a character
        - Level of the team should be 12
        - 8 characters max
    */
    var isAlreadyPicked = false;
    if(teamLevel + character.level < 13){
      /*for(var i = 0; i < characterTeamPerPlayer.length; i++){
        for(var j = 0; j < characterTeamPerPlayer[i].length; j++){
          isAlreadyPicked = (!isAlreadyPicked && characterTeamPerPlayer[i][j].id === character.id) ? false : true;
        }
      }
      if(!isAlreadyPicked){*/
        teamLevel += character.level;
        characterTeam.push(character);
      /*}*/
    }
  }

  if(characterTeam.length > 8){
    //generateRandomTeam();
  }

  characterTeam.sort(function(a, b){
    return b.init - a.init;
  });

  return characterTeam;
}

function GenerateTeamForPlayers(){
  for(var i = 0; i < players.length; i++){
    characterTeamPerPlayer.push(generateRandomTeam());
  }
  return characterTeamPerPlayer;
}

function GenerateTeamDisplay(){
  var characterTeamPerPlayer = GenerateTeamForPlayers();
  var rowClass = "";
  for(var i = 0; i < players.length; i++){
    var teamJumbotron = $('<div id="teamGeneration_' + i + '" class="jumbotron jumbotron-fluid">');

    var jumbotronContainer = $('<div class="container">');

    var playerName = $('<h1 class="display-4">');
    playerName.text(players[i]["name"]);
    jumbotronContainer.append(playerName);

		var teamHTML = buildTeam(characterTeamPerPlayer[i]);
    jumbotronContainer.append(teamHTML);

    teamJumbotron.append(jumbotronContainer);
		$('#teamGeneration').append(teamJumbotron);
	}
}

function buildTeam(team){
  	var teamHTML = "";
  	var lineBreak = "&#013;";

  	// Get team based on team id.

		for(var j = 0; j < team.length; j++){
      character = team[j];
  		teamHTML +=
  			" <p class='lead'>" +

  			"<span class='badge badge-primary badge-pill'>" +
  			"<i class='fas fa-bolt'></i> " +  character.init +
  			"</span>" + " " +

  			"<span class='badge badge-secondary badge-pill'>" +
  			"<i class='fas fa-sort-numeric-up'></i> " + character.level +
  			"</span>" + " " +

  			"<span class='badge badge-danger badge-pill'>" +
  			"<i class='fas fa-heart' ></i> " + character.hp +
  			"</span>" + " "
        + character.name +
  			"</p>";
			}
  	return teamHTML;
  }
