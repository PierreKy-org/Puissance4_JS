function initialisation(){
	
	var tableau = document.createElement("table");
	document.body.appendChild(tableau);
	
	var nb_ligne = 0;
	for(i = 0; i < 6; i++){
		var tr = document.createElement("tr");
		tr.id = "ligne" + nb_ligne;
		nb_ligne += 1;
		tableau.appendChild(tr);
		var nb_colonne = 0;
		for(j = 0; j < 7; j++){
			var td = document.createElement("td");
			td.id = "colonne" + nb_colonne;
			td.setAttribute("onClick","ajout_jeton()");
			nb_colonne += 1;
			tr.appendChild(td);
			
		}
	}
}

function ajout_jeton(){
	var jeton = document.createTextNode("X");
	console.log(jeton);
	var test = document.getElementById("colonne1");
	test.textContent=jeton.data;
	
	
	
}
