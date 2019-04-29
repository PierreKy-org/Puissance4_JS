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
			td.setAttribute("onClick","ajout_jeton("+i+","+j+")");
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
	this.cell =function(){
		console.log(this.i, this.j);
	}
}
tableau = new Grille();


var compteurtour = 0;
function ajout_jeton(i){
	if(compteurtour === 0 && tableau.tout[i][j].valeur === ""){
		var jeton = document.createTextNode("X");
		tableau.tout[i][j].valeur = "X";
		compteurtour = 1;
	}
	else if(compteurtour === 1 && tableau.tout[i][j].valeur === ""){
		var jeton = document.createTextNode("O");
		tableau.tout[i][j].valeur = "O";
		compteurtour = 0;
	}
	var ciblage = document.getElementById(""+i +j);
	ciblage.textContent=jeton.data;
}


function down(i,j){
	if(tableau.tout[i][j].valeur === ""){
		
	
	}
	
	
}