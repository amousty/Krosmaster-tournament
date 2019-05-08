$(document).ready(function(){
	if((typeof players === "undefined" || typeof maps === "undefined" || typeof teams === "undefined" || typeof characters === "undefined")
			|| (players.length < 1 || maps.length < 1 || teams.length < 1 || characters.length < 1) ){
			// Doc has not been init before
			initGlobalVariables();
			includeHTML();
			intitalizeEvent();
	}
	loadDashboardData();
});


function loadDashboardData(){
			// Class by point
			//sortResults(players, "points", false);
			//buildPlayersTable();
			$('#totPlayer').text(players.length);
			$('#matchCount').text(Math.floor(players.length/2));
			var s1Tot = 0;
			var s2Tot = 0;
			var s3Tot = 0;
			var s4Tot = 0;
			var s5Tot = 0;
			var s6Tot = 0;
			var s1= 0;
			var s2 = 0;
			var s3 = 0;
			var s4 = 0;
			var s5 = 0;
			var s6 = 0;

			for(var k = 0; k < characters.length; k++){
					switch(characters[k].season){
						case 1 :
							s1Tot++;
							break;
						case 2 :
							s2Tot++;
							break;
						case 3 :
							s3Tot++;
							break;
						case 4 :
							s4Tot++;
							break;
						case 5 :
							s5Tot++;
							break;
						case 6 :
							s6Tot++;
							break;
					}
			}

			for(var t = 0; t < teams.length; t++){
				if(teamPlayed.includes(teams[t].id)){
					for(var co = 0; co < teams[t].composition.length; co++){
						for(var k = 0; k < characters.length; k++){
							if(characters[k].id === teams[t].composition[co].id){
								switch(characters[k].season){
									case 1 :
										s1++;
										break;
									case 2 :
										s2++;
										break;
									case 3 :
										s3++;
										break;
									case 4 :
										s4++;
										break;
									case 5 :
										s5++;
										break;
									case 6 :
										s6++;
										break;
								}
								break;
							}
						} // k
					} // co
				}
			} // t


			//$('#s2Tot').text(s2Tot);
			$('#s3Tot').text(s3Tot);
			$('#s4Tot').text(s4Tot);
			$('#s5Tot').text(s5Tot);
			$('#s6Tot').text(s6Tot);
			//$('#s2Count').text(s2);
			$('#s3Count').text(s3);
			$('#s4Count').text(s4);
			$('#s5Count').text(s5);
			$('#s6Count').text(s6);

			var charTot = s1Tot + s2Tot + s3Tot + s4Tot + s5Tot + s6Tot;
			var charCount = s1 + s2 + s3 + s4 + s5 + s6;
			$('#charCount').text(charCount);
			$('#charTot').text(charTot);
}

function buildPlayersTable(){
	for(var i = 0; i < players.length; i++){
				var id = "";
        var name = players[i]["name"];
        var teamNumber = players[i].team !== "" ? players[i].team : pickAValue(teams, "T", true);
				var points 	= players[i]["points"];
				var tooltipTeam = buildTooltipTeam(teamNumber, teams, characters); // Get team text
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
        tr.append($('<td>').text(teams[teamNumber-1].name + " (" + teamNumber + ")")); // Append the tooltip
				tr.append($('<td>').text(points));
				$('#playersTable').append(tr);
				$('#playersTable').append(generateTeamTable(i+1, teamNumber, teams));
	}
}

function buildTooltipTeam(tn){
	var teamName = "";
	var lineBreak = "&#013;";
	var idCharcterList = teams[tn-1].composition;
	teamName += "<ul class='list-group list-group-flush'>";
	for(var i = 0; i < idCharcterList.length; i++){
		teamName +=
			"<li class='list-group-item " + characters[idCharcterList[i].id].type + "'>" +

			"<span class='badge badge-primary badge-pill'>" +
			"<i class='fas fa-bolt'></i> " +  characters[idCharcterList[i].id].init +
			"</span>" + " " +

			"<span class='badge badge-secondary badge-pill'>" +
			"<i class='fas fa-sort-numeric-up'></i> " + 	characters[idCharcterList[i].id].level +
			"</span>" + " " +

			"<span class='badge badge-danger badge-pill'>" +
			"<i class='fas fa-heart' ></i> " + 	characters[idCharcterList[i].id].hp +
			"</span>" + " " +

			characters[idCharcterList[i].id].name +
			"</li>";
	}
	teamName += "</ul>";
	return teamName;
}

function generateTeamTable(id, tn, teams){
	var table = "<tr>";
	//table += "<td colspan='2' class='hiddenRow'></td>";
	table += "<td colspan='4' class='hiddenRow'>";
	table += "<div id='team_" + id + "' class='collapse'>";
	table += buildTooltipTeam(tn, teams);
	table += "</div>";
	table += "</td>";
	//table += "<td colspan='1' class='hiddenRow'></td>";
	table += "</tr>";
	return table;
}
