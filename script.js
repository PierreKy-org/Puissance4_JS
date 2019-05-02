var pseudo1;
var pseudo2;
function ajoutpseudo(){
	pseudo1 = document.getElementById("pseudo1").value;
	pseudo2 = document.getElementById("pseudo2").value;
	document.body.innerHTML = "<a href='#' id='lien' onClick='initialisation()'>Clic</a>";
	joueur1 = new Joueur(pseudo1, 0);
	joueur2 = new Joueur(pseudo2, 0);
}

function initialisation(){
	corps = document.body;
	if(document.getElementById('change')){
		change = document.getElementById('change');
		corps.removeChild(change);
	}
	lien = document.getElementById('lien');
	corps.removeChild(lien);
	var para = document.createElement("p");
	para.id = "joueur";
	document.body.appendChild(para);
	changejoueur(pseudo1, pseudo2);
	var tableau = document.createElement("table");
	document.body.appendChild(tableau);
	compteurtour = 0;
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

function Joueur(pseudo, score) {
	this.pseudo = pseudo;
	this.score = score;
}


tableau = new Grille();


var compteurtour = 0;
function changejoueur(pseudo1, pseudo2){
	var para = 	document.getElementById("joueur");
	if(compteurtour == 0){
		para.textContent = "" + pseudo1 +", à toi de jouer !";
	}
	else{
		para.textContent = "" + pseudo2 +", à toi de jouer !";
	}
	
}
function ajout_jeton(j){
	for(i = 5; i>= 0; i--){
		if(tableau.tout[i][j].valeur === "" && compteurtour == 0){
			var jeton = document.createTextNode("X");
			tableau.tout[i][j].valeur = "X";
			var ciblage = document.getElementById(""+i +j);
			ciblage.textContent=jeton.data;
			ciblage.style.backgroundColor = "red";
			liste_verif(i, j, compteurtour)
			compteurtour = 1;
			changejoueur(pseudo1, pseudo2);
			break;
		}
		else if(tableau.tout[i][j].valeur === "" && compteurtour == 1){
			var jeton = document.createTextNode("O");
			tableau.tout[i][j].valeur = "O";
			var ciblage = document.getElementById(""+i +j);
			ciblage.textContent=jeton.data;
			ciblage.style.backgroundColor = "yellow";
			liste_verif(i, j, compteurtour)
			compteurtour = 0;
			changejoueur(pseudo1, pseudo2);
			break;
			
		}
	}	
	
}
function compteur_liste(L, compteurtour){
	compteur = 0;
	precedent = "";
	if(compteurtour === 0){
		for(w = 0; w <L.length; w++){
			if(L[w] === "X"){
				compteur++;
				if(compteur ===4){
					return compteur;
				}
			}
			else{
				compteur = 0;
			}
		}
	}
	else{
		for(w = 0; w <L.length; w++){
			if(L[w] === "O"){
				compteur++;
				if(compteur ===4){
					return compteur;
				}
			}
			else{
				compteur = 0;
			}
		}
	}
}
function menu(){
	document.body.innerHTML = "<form>Pseudo du joueur 1 : <input id='pseudo1' type='text' name='pseudo' /><br />Pseudo du joueur 2 : <input id='pseudo2' type='text' name='pseudo' /><br /><br /><input type='submit' onClick='ajoutpseudo();' />"
}
function fin(){
	
	for(i = 0; i < 6; i++){
		for(j = 0; j < 7; j++){
			document.getElementById(""+i+j).removeAttribute("onclick");
		}
	}
	document.body.innerHTML = "<a href='#' id='lien' onClick='initialisation()'>Rejouer ?</a> <a href='#' id='change' onClick='menu()'>Changer de pseudo ?</a>"
	delete tableau
	tableau = new Grille();
}
function liste_verif(ligne, colonne, compteurtour){
	lArray= Array();
	for(let colonne = 0; colonne < 7; colonne++){
		var lol = document.getElementById(""+ligne+ colonne);
		lArray.push(lol.innerHTML);
		
	}
	if(compteur_liste(lArray, compteurtour) === 4){
		if(compteurtour == 0){
		alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
	
	
	
	cArray = Array();
	for(let ligne = 5; ligne >= 0; ligne--){	
		var lol1 = document.getElementById(""+ligne+ colonne);
		cArray.push(lol1.innerHTML);
		
	}
	if(compteur_liste(cArray, compteurtour) === 4){
		if(compteurtour == 0){
		alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
		
		
		
		
	dgArray = Array();
	let coco = colonne;
	for(let ligne1 = ligne; ligne1 < 6; ligne1++){
		var lol2 = document.getElementById(""+ligne1+ coco);
		dgArray.push(lol2.innerHTML);
		coco++;
		if(coco > 6){
			break;
		}
	}
	if(compteur_liste(dgArray, compteurtour) === 4){
		if(compteurtour == 0){
		alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
	
	ddArray = Array();
	let coco1 = colonne;
		for(let ligne1 = ligne; ligne1 < 6; ligne1++){
			var lol2 = document.getElementById(""+ligne1+ coco1);
			ddArray.push(lol2.innerHTML);
			coco1--;
			if(coco1 < 0){
				break;
			}
		}
	if(compteur_liste(ddArray, compteurtour) === 4){
		if(compteurtour == 0){
		alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
}