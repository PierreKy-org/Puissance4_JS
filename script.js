/* function initialisation(){
	
	var tableau = document.createElement("table");
	document.body.appendChild(tableau);
	
	var nb_ligne = 0;
	for(i = 0; i < 6; i++){
		var tr = document.createElement("tr");
		tr.id = "ligne" + nb_ligne;
		tableau.appendChild(tr);
		var nb_colonne = 0;
		for(j = 0; j < 7; j++){
			var td = document.createElement("td");
			td.id = "" + nb_ligne + nb_colonne;
			td.setAttribute("onClick","ajout_jeton()");
			nb_colonne += 1;
			tr.appendChild(td);
			
		}
		nb_ligne += 1;
	}
} */
function Grille(){
	
	this.tout = [];
	for(i = 0; i < 6; i++){
		this.tout.push([]);
		for(j = 0; j < 7; j++){
			this.tout[i].push(new Bloc(i,j));
			console.log("Ajouter")
		}
	}
}
function Bloc(i, j) {
	this.i = i;
	this.j = j;
	this.cell =function(){
		console.log(this.i, this.j);
	}
}
tableau = new Grille();

function cell(i,j){
	
}


function ajout_jeton(){
	var jeton = document.createTextNode("X");
	var test = document.getElementById(""+0+0);
	test.textContent=jeton.data;
}
