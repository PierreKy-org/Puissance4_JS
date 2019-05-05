tableau = new Grille();
function restaure(){
	tour = storage.getItem("compteurtour");
	compteurtour = parseInt(tour, 10);
	document.body.innerHTML = "";
	pseudo1 = storage.getItem("pseudo1");
	pseudo2 = storage.getItem("pseudo2");
	initialisation();
	compteurtour = parseInt(tour, 10);
	for(i = 0; i < 6; i++){
		for(j = 0; j < 7; j++){
			valeur = storage.getItem(""+ i + j);
			tableau.tout[i][j].valeur = valeur;
			bloc = document.getElementById("" + i + j);
			bloc.textContent = valeur;
			if(bloc.textContent === "O"){
				bloc.setAttribute('class', 'jaune');
				bloc.textContent = "";
			}
			if(bloc.textContent === "X"){
				bloc.setAttribute('class', 'rouge');
				bloc.textContent = "";
			}
		}
	}
	
	
}
var pseudo1;
var pseudo2;
var storage = localStorage;
if(storage.highscore){
	var highscore = JSON.parse(storage.highscore);
}
else{
	var highscore = {
	}
}
function verifPseudo(pseudo1, pseudo2){
	if (pseudo1 == pseudo2) {alert("Les 2 pseudos sont identiques, veuillez recommencer"), document.location.reload(True)}
    if ((pseudo1 == "") || (pseudo2 == "")) {alert("Un pseudo n'a pas été rempli, veuillez recommencer"),document.location.reload(True)}
}

function renvoiscore(){
	if(highscore[document.getElementById("score").value]){
		balise = document.getElementById("retour");
		balise.textContent = highscore[document.getElementById("score").value].pseudo + " a fait un score de " + highscore[document.getElementById("score").value].score;
	}
}

function ajoutpseudo(){
	pseudo1 = document.getElementById("pseudo1").value;
	pseudo2 = document.getElementById("pseudo2").value;
	verifPseudo(pseudo1,pseudo2)
	joueur1 = new Joueur(pseudo1, 0);
	joueur2 = new Joueur(pseudo2, 0);
	initialisation();
}

function initialisation(){
	
	document.body.innerHTML = "";
	corps = document.body;
	var sauve = document.createElement("p");
	sauve.textContent= "sauvegarder la partie ?";
	sauve.id = "sauve";
	sauve.setAttribute("onClick", "sauvegarder()");
	corps.appendChild(sauve);
	if(document.getElementById('change')){
		change = document.getElementById('change');
		corps.removeChild(change);
	}
	if(document.getElementById('lien')){
		lien = document.getElementById('lien');
		corps.removeChild(lien);
	}
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
			td.setAttribute("class","vide");
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
			tableau.tout[i][j].valeur = "X";
			var ciblage = document.getElementById(""+i +j);
			ciblage.removeAttribute("class");
			ciblage.setAttribute("class", "rouge");
			liste_verif(i, j, compteurtour)
			compteurtour = 1;
			changejoueur(pseudo1, pseudo2);
			break;
		}
		else if(tableau.tout[i][j].valeur === "" && compteurtour == 1){
			var jeton = document.createTextNode("O");
			tableau.tout[i][j].valeur = "O";
			var ciblage = document.getElementById(""+i +j);
			ciblage.removeAttribute("class");
			ciblage.setAttribute("class", "jaune");
			liste_verif(i, j, compteurtour)
			compteurtour = 0;
			changejoueur(pseudo1, pseudo2);
			break;
			
		}
	}	
	
}
function compteur_liste(L, compteurtour){
	compteur = 0;
	if(compteurtour === 0){
		for(w = 0; w <L.length; w++){
			if(L[w] === "rouge"){
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
			if(L[w] === "jaune"){
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
	document.body.innerHTML = "<p id='fin'><a href='#' id='lien' onClick='initialisation()'>Rejouer </a> ou <a href='#' id='change' onClick='menu()'>Changer de pseudo </a></p>"
	delete tableau
	tableau = new Grille();
}
function liste_verif(ligne, colonne, compteurtour){
	lArray= Array();
	for(let colonne = 0; colonne < 7; colonne++){
		var lol = document.getElementById(""+ligne+ colonne);
		lArray.push(lol.className);
	}
	if(compteur_liste(lArray, compteurtour) === 4){
		if(compteurtour == 0){
			if(j1.score){
				j1.score += 1;
				highscore[pseudo1] = j1;
			}
			else{
				j1.score = 1;
				highscore[pseudo1] = j1;
			storage.setItem("highscore", JSON.stringify(highscore));
			}
			alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			if(j2.score){
				j2.score += 1;
				highscore[pseudo2] = j2;
			}
			else{
				j2.score = 1;
				highscore[pseudo2] = j2;
			}
			storage.setItem("highscore", JSON.stringify(highscore));
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
	
	
	
	cArray = Array();
	for(let ligne = 5; ligne >= 0; ligne--){	
		var lol1 = document.getElementById(""+ligne+ colonne);
		cArray.push(lol1.className);
		
	}
	if(compteur_liste(cArray, compteurtour) === 4){
		if(compteurtour == 0){
			if(j1.score){
				j1.score += 1;
				highscore[pseudo1] = j1;
			}
			else{
				j1.score = 1;
				highscore[pseudo1] = j1;
			}
			storage.setItem("highscore", JSON.stringify(highscore));
			alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			if(j2.score){
				j2.score += 1;
				highscore[pseudo2] = j2;
			}
			else{
				j2.score = 1;
				highscore[pseudo2] = j2;
			}
			storage.setItem("highscore", JSON.stringify(highscore));
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
		
		
		
		
	dgArray = Array();
	let coco = colonne;
	for(let ligne1 = ligne; ligne1 < 6; ligne1++){
		var lol2 = document.getElementById(""+ligne1+ coco);
		dgArray.push(lol2.className);
		coco++;
		if(coco > 6){
			break;
		}
	}
	if(compteur_liste(dgArray, compteurtour) === 4){
		if(compteurtour == 0){
			if(j1.score){
				j1.score += 1;
				highscore[pseudo1] = j1;
			}
			else{
				j1.score = 1;
				highscore[pseudo1] = j1;
			}
			storage.setItem("highscore", JSON.stringify(highscore));
			alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			if(j2.score){
				j2.score += 1;
				highscore[pseudo2] = j2;
			}
			else{
				j2.score = 1;
				highscore[pseudo2] = j2;
			}
			storage.setItem("highscore", JSON.stringify(highscore));
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
	
	ddArray = Array();
	let coco1 = colonne;
		for(let ligne1 = ligne; ligne1 < 6; ligne1++){
			var lol2 = document.getElementById(""+ligne1+ coco1);
			ddArray.push(lol2.className);
			coco1--;
			if(coco1 < 0){
				break;
			}
		}
	if(compteur_liste(ddArray, compteurtour) === 4){
		if(compteurtour == 0){
			if(j1.score){
				j1.score += 1;
				highscore[pseudo1] = j1;
			}
			else{
				j1.score = 1;
				highscore[pseudo1] = j1;
			}
			storage.setItem("highscore", JSON.stringify(highscore));
			alert("Bravo " + pseudo1 +  ", tu as gagné !");
		}
		else{
			if(j2.score){
				j2.score += 1;
				highscore[pseudo2] = j2;
			}
			else{
				j2.score = 1;
				highscore[pseudo2] = j2;
			}
			storage.setItem("highscore", JSON.stringify(highscore));
			alert("Bravo " + pseudo2 +  ", tu as gagné !");
		}
		fin();
	}
}


function sauvegarder(){
	storage.setItem("pseudo1", pseudo1);
	storage.setItem("pseudo2", pseudo2);
	storage.setItem("compteurtour", compteurtour);
	for(i = 0; i < 6; i++){
		for(j = 0; j < 7; j++){
			storage.setItem(""+ i + j, tableau.tout[i][j].valeur);
		}
	}
	sauve = document.getElementById("sauve");
	sauve.textContent = sauve.textContent + " La partie a été sauvegardé !";
}
