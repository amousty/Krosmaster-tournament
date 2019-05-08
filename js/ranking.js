$(document).ready(function(){
	if((typeof players === "undefined" || typeof maps === "undefined" || typeof teams === "undefined" || typeof characters === "undefined")
			|| (players.length < 1 || maps.length < 1 || teams.length < 1 || characters.length < 1) ){
			// Doc has not been init before
			initGlobalVariables();
			includeHTML();
			intitalizeEvent();
	}
	loadPlayers();
});


function loadPlayers(){
			// Class by point
			sortResults(players, "points", false);
			buildPlayersTable();
}

function buildPlayersTable(){
	for(var i = 0; i < players.length; i++){
				var id = "";
        var name = players[i]["name"];
        var teamID = players[i].team !== "" ? players[i].team : pickAValue(teams, "T", true);
				var points 	= players[i]["points"];
				var tooltipTeam = buildTooltipTeam(teamID); // Get team text
				//var tr = $('<tr data-toggle="tooltip" data-placement="right" title="' + tooltipTeam +'">');
				var tr = $('<tr data-toggle="collapse" data-target="#team_' + (i + 1) + '" class="clickable">');

				switch (i){
					case 0:
						id = (i+1) + " <i class='fas fa-trophy' style='color:#FCDD00'></i>";
						break;
					case 1:
						id = (i+1) + " <i class='fas fa-trophy' style='color:#c0c0c0'></i>";
						break;
					case 2:
						id = (i+1) + " <i class='fas fa-trophy' style='color:#cd7f32'></i>";
						break;
					default :
						id = (i+1);
						break;
				}

        tr.append('<td>' + id + '</td>');
        tr.append($('<td>').text(name));
        tr.append($('<td>').text(teams[teamID-1].name + " (" + teamID + ")")); // Append the tooltip
				tr.append($('<td>').text(points));
				$('#playersTableTBody').append(tr);
				$('#playersTableTBody').append(generateTeamTable(i+1, teamID, teams));
	}
}

function buildTooltipTeam(teamID){
	var teamName = "";
	var lineBreak = "&#013;";

	// Get team based on team id.
	var teamComposition = [];
	for(var i = 0; i < teams.length; i++){
		if(teamID === teams[i].id){
			teamComposition = teams[i].composition;
		}
	}

	teamName += "<ul class='list-group list-group-flush'>";
	for(var i = 0; i < teamComposition.length; i++){
		var character = [];
		for(var i = 0; i < characters.length; i++){
			for(var j = 0; j < teamComposition.length; j++){
				if(teamComposition[j].id === characters[i].id){
					character = characters[i];
					teamName +=
						"<li class='list-group-item " + character.type + "'>" +

						"<span class='badge badge-primary badge-pill'>" +
						"<i class='fas fa-bolt'></i> " +  character.init +
						"</span>" + " " +

						"<span class='badge badge-secondary badge-pill'>" +
						"<i class='fas fa-sort-numeric-up'></i> " + character.level +
						"</span>" + " " +

						"<span class='badge badge-danger badge-pill'>" +
						"<i class='fas fa-heart' ></i> " + character.hp +
						"</span>" + " " +

						character.name +
						"</li>";
				}
			}
		}


	}
	teamName += "</ul>";
	return teamName;
}

function generateTeamTable(id, tn, teams){
	var table = "<tr>";
	//table += "<td colspan='2' class='hiddenRow'></td>";
	table += "<td colspan='4' class='hiddenRow'>";
	table += "<div id='team_" + id + "' class='collapse'>";
	table += buildTooltipTeam(tn);
	table += "</div>";
	table += "</td>";
	//table += "<td colspan='1' class='hiddenRow'></td>";
	table += "</tr>";
	return table;
}
