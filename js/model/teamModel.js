$(document).ready(function(){
	if((typeof players === "undefined" || typeof maps === "undefined" || typeof teams === "undefined" || typeof characters === "undefined")
			|| (players.length < 1 || maps.length < 1 || teams.length < 1 || characters.length < 1) ){
			// Doc has not been init before
			initGlobalVariables();
			includeHTML();
			intitalizeEvent();
	}
});

function getTeam(teamID){
  var team = [];
  for(var i = 0; i < teams.length; i++){
    if(teamID === teams[i].id){
      team = teams[i];
    }
  }
  return team;
}
