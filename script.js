function initialisation(){
	
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
			td.setAttribute("onClick","ajout_jeton("+j+")");
			nb_colonne += 1;
			tr.appendChild(td);
			
		}
		nb_ligne += 1;
	}
} 


function Grille(){
	
	this.tout = [];
	for(i = 0; i < 6; i++){
		this.tout.push([]);
		for(j = 0; j < 7; j++){
			this.tout[i].push(new Bloc(i,j));
		}
	}
}
function Bloc(i, j) {
	this.i = i;
	this.j = j;
	this.valeur = ""
}
tableau = new Grille();


var compteurtour = 0;
function ajout_jeton(j){
	for(i = 5; i>= 0; i--){
		if(tableau.tout[i][j].valeur === "" && compteurtour == 0){
			var jeton = document.createTextNode("X");
			tableau.tout[i][j].valeur = "X";
			var ciblage = document.getElementById(""+i +j);
			ciblage.textContent=jeton.data;
			compteurtour = 1;
			break;
		}
		else if(tableau.tout[i][j].valeur === "" && compteurtour == 1){
			var jeton = document.createTextNode("O");
			tableau.tout[i][j].valeur = "O";
			var ciblage = document.getElementById(""+i +j);
			ciblage.textContent=jeton.data;
			compteurtour = 0;
			break;
			
		}
	}	
	
}


