$(document).ready(function(){
	if((typeof players === "undefined" || typeof maps === "undefined" || typeof teams === "undefined" || typeof characters === "undefined")
			|| (players.length < 1 || maps.length < 1 || teams.length < 1 || characters.length < 1) ){
			// Doc has not been init before
			initGlobalVariables();
			includeHTML();
			intitalizeEvent();
	}
});

function getCharacter(characterID){
  var character = [];
  for(var i = 0; i < characters.length; i++){
    if(characterID === characters[i].id){
      character = characters[i];
    }
  }
  return character;
}
