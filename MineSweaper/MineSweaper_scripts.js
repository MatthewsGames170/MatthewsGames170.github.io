/*
	 E R R O R S and T H I N G S   T O   F I X 
	 
	 # 	Make area around you empty when you first click on the game
	 #  Make there more levels (Easy 10x10, Medium 25x25 ?, Hard (50z50))  - still with ratio of 1 mine per 8 tiles
	 #  Game ending is not quite right - does it actually end?
*/
/*
NOTES ON ERRORS / THINGS TO ADD

# 	Make area around you empty when you first click on the game
	- on first click, hide mines - but pass though a number (where you clicked)  that is a location that a mine cannot be, or be next to

#  Game ending is not quite right - i think	
	- ultimatly,  more testing neeed to resolve teh actaul issue, but the issue is likly that once the player has removed all but a few of the tiles
	
#  Make there more levels (Easy 10x10, Medium 25x25 ?, Hard (50z50))  - still with ratio of 1 mine per 8 tiles	

*/
var shownTiles = [];
{
/*		This is the tiles that are shown to the player;
		c = covered
		0 = open / empty
		f = flagged
		
		1 = 1 mine nearby
		2 = 2 mines nearby
		3 = 3 mines nearby
		4 = 4 mines nearby
		5 = 5 mines nearby
		6 = 6 mines nearby
		7 = 7 mines nearby
		8 = 8 mines nearby

*/

//        			  0 1 2 3 4 5 6 7 8 9
	shownTiles[1]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[2]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[3]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[4]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[5]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[6]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[7]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[8]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[9]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[10] = ["c","c","c","c","c","c","c","c","c","c"];

}

var actTiles = [];
{
/*		This is the values that the tiles actually have

		c = covered - irrelevant
		0 = empty
		f = flagged
		m = mine
		
		1 = 1 mine nearby
		2 = 2 mines nearby
		3 = 3 mines nearby
		4 = 4 mines nearby
		5 = 5 mines nearby
		6 = 6 mines nearby
		7 = 7 mines nearby
		8 = 8 mines nearby
*/

	actTiles[1]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[2]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[3]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[4]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[5]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[6]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[7]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[8]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[9]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[10] = [0,0,0,0,0,0,0,0,0,0];


}

function mouseRight(){}

function restart(){
	//restart the game - stop all timers
	console.log("New Game");
	
	setUpDefaults();
	clearTimeout(T);
	loadCoveredMap();
	//hideMines();	
	updateDisplay();
	document.getElementById("pop").style.display = "none";

}


function setUpDefaults(){
//although called, console.log lines do not appear....
	shownTiles[1]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[2]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[3]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[4]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[5]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[6]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[7]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[8]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[9]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[10] = ["c","c","c","c","c","c","c","c","c","c"];

	actTiles[1]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[2]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[3]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[4]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[5]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[6]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[7]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[8]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[9]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[10] = [0,0,0,0,0,0,0,0,0,0];

	ingamePlay = false;
	alreadyClicked = false;
	timeDone = 0;
	flagging = false;	
	keyState = 0;	
	NoMines = 13;
	flagsLeft = NoMines-1;	
	GameWidth = 10;	
	GameHeight = 10;	
	tilesLeft = GameWidth*GameHeight;
	console.log("Defaults set up\n\ningamePlay = " + ingamePlay + "\nalreadyClicked = " + alreadyClicked +"\ntimeDone = "+timeDone+"\nflagging = "+flagging+"\nkeyState = "+keyState+"\nNoMines = "+NoMines+"\nflagsLeft = "+flagsLeft+"\nGameWidth = "+GameWidth+"\nGameHeight = "+GameHeight+"\ntilesLeft = "+tilesLeft);
	
	document.getElementById("audio_1").controls = false;
}

function setUpEasy(){
	// 5x5
	shownTiles[1]  = ["c","c","c","c","c"];
	shownTiles[2]  = ["c","c","c","c","c"];
	shownTiles[3]  = ["c","c","c","c","c"];
	shownTiles[4]  = ["c","c","c","c","c"];
	shownTiles[5]  = ["c","c","c","c","c"];

	actTiles[1]  = [0,0,0,0,0];
	actTiles[2]  = [0,0,0,0,0];
	actTiles[3]  = [0,0,0,0,0];
	actTiles[4]  = [0,0,0,0,0];
	actTiles[5]  = [0,0,0,0,0];


	tilesLeft = 100;
	ingamePlay = false;
	alreadyClicked = false;
	timeDone = 0;
	flagging = false;	
	keyState = 0;	
	NoMines = 4;
	flagsLeft = NoMines;	
	GameWidth = 5;	
	GameHeight = 5;	

}

function setUpMed(){
	//18 x 15
	shownTiles[1]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[2]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[3]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[4]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[5]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[6]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[7]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[8]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[9]  = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[10] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[11] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[12] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[13] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[14] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[15] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[16] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[17] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];
	shownTiles[18] = ["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"];

	actTiles[1]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[2]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[3]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[4]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[5]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[6]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[7]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[8]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[9]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[10] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[11] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[12] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[13] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[14] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[15] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[16] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[17] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	actTiles[18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	tilesLeft = 100;
	ingamePlay = false;
	alreadyClicked = false;
	timeDone = 0;
	flagging = false;	
	keyState = 0;	
	flagsLeft = NoMines;	
	GameWidth = 18;	
	GameHeight = 15;
	
	NoMines = floor((GameWidth * GameHeight) / 8);
}

function setUpHard(){
	
	shownTiles[1]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[2]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[3]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[4]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[5]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[6]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[7]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[8]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[9]  = ["c","c","c","c","c","c","c","c","c","c"];
	shownTiles[10] = ["c","c","c","c","c","c","c","c","c","c"];

	actTiles[1]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[2]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[3]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[4]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[5]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[6]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[7]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[8]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[9]  = [0,0,0,0,0,0,0,0,0,0];
	actTiles[10] = [0,0,0,0,0,0,0,0,0,0];

	tilesLeft = 100;
	ingamePlay = false;
	alreadyClicked = false;
	timeDone = 0;
	flagging = false;	
	keyState = 0;	
	NoMines = 13;
	flagsLeft = NoMines;	
	GameWidth = 10;	
	GameHeight = 10;	

}

function activateAdmin(){
	
	if(admin == false){
		var P = prompt("Entering Admin Mode\n\nPlease enter The Password");
		if(P == "saw_"){
			if(confirm("Are you sure you want Admin Privilages?")){
				admin = true;
				console.log("Admin Controls Enabled");
			}
		}else{
			console.log("Are you trying to cheat?");
		}
	}else{
		console.log("Admin Controls Disabled");
		admin = false;		
	}
	
	
}


//plotting functions
function unopen(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("unopened");
}
function clear(x,y){
//the area is clear of mines and it has been veiwed
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("clear");
	document.getElementById(id).innerHTML = "";
}
function flag(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("flagged");
}
function mineAt(x,y){
	var id = CreateID(x+1,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("mine");
}
function one(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("one");
	document.getElementById(id).innerHTML = "1";
}
function two(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("two");
	document.getElementById(id).innerHTML = "2";	
}
function three(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("three");
	document.getElementById(id).innerHTML = "3";
}
function four(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("four");
	document.getElementById(id).innerHTML = "4";
}
function five(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("five");
	document.getElementById(id).innerHTML = "5";
}
function six(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("six");
	document.getElementById(id).innerHTML = "6";
}
function seven(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("seven");
	document.getElementById(id).innerHTML = "7";
}
function eight(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("clear","unopened","flagged","mine","one","two","three","four","five","six","seven","eight");
	document.getElementById(id).classList.add("eight");
	document.getElementById(id).innerHTML = "8";
}

function CreateID(x,y){
	var ID = "btn";
	ID = ID.concat(y);
	ID = ID.concat("_");
	ID = ID.concat(x);

return ID;
}

/*    AUDIO CONTROLS   

	



*/
function switchSound(n){
	if(n>-0.00000001 && n<audioList.length){
		document.getElementById("audio_1").src  = audioList[n][0];
	}else{
		console.log("Container " + n + " does not exist");
	}
}
var audioList = [];
	//in form of Src,   duration
audioList[0] = ["../Z_Audio/mine_detonate.mp3",4];
audioList[1] = ["../Z_Audio/mine_digging.mp3",1];

function playSound(n){
	if(soundInProgress==false){
		djdjjfjajjj=true;
		soundInProgress = true
		switchSound(n);
		document.getElementById("audio_1").play();
		console.log("Audio now playing");
		setTimeout(stopSound,audioList[n][1]*1000);
	}
}
function stopSound(){
	djdjjfjajjj = false;
	document.getElementById("audio_1").pause();		
	console.log("Audio now stopped");
	soundInProgress = false;	
}
var soundInProgress = false;

var djdjjfjajjj = false;
function ddfueif(){
	document.getElementById("audio_1").controls =false;
	if(djdjjfjajjj==false){
		djdjjfjajjj=true;
		document.getElementById("audio_1").play();
		console.log("Audio now playing");
	}else{
		djdjjfjajjj = false;
		document.getElementById("audio_1").pause();		
		console.log("Audio now stopped");
	}
	
}


function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	/*
		*** KEYS USED ***	
	*/
	if(x=="h" || x=="H"){
		document.getElementById("pop").style.display="none";
		x = "";
	}else if(x=="p" || x=="P"){
		ddfueif();
	}else if(x=="a" || x=="A"){
		activateAdmin();

	}else if(x==" "){			
		if(flagging == false ){
			flagging = true;
		}else{
			flagging = false;
		}
	}else if(x=="~" ||  x=="#"){
		DIE();
	}else{
	if(admin == true){
		if (x =="f"||x=="F"){				
			if(flagging == false ){
				flagging = true;
				document.getElementById("flagging").classList.remove("noFlag");
				document.getElementById("flagging").classList.add("flaging");
			}else{
				flagging = false;
				document.getElementById("flagging").classList.remove("flaging");
				document.getElementById("flagging").classList.add("noFlag");				
			}
		}else if(x=="Q"||x=="q"){
			clear(2,2);
		}else if(x=="Z"||x=="z"){
			flag(2,2);	
		}else if(x=="m"){
			N();//N loads
		}else if(x=="v"||x=="V"){
			loadVisibleMap();
		}else if(x=="R"||x=="r"){	
			refresh();
		}else if(x=="h"){		
			hideMines();//hides the mines adn 		
			
		}else if(x=="1"){
			one(2,2);
		}else if(x=="2"){
			two(2,2);	
		}else if(x=="3"){
			three(2,2);
		}else if(x=="4"){
			four(2,2);
		}else if(x=="5"){
			five(2,2);
		}else if(x=="6"){
			six(2,2);
		}else if(x=="7"){
			seven(2,2);
		}else if(x=="8"){
			eight(2,2);		
		}
	}
	}
}

function refresh(){     /*refresh the page (Gets rid of all timers)*/   window.location.reload();	}

function loadVisibleMap(){
	
	for(var Y = 1;Y<11;Y++){
	
		for(var X =1;X<11;X++){
/*		
		c = covered
		0 = open / empty
		f = flagged
		
		1 = 1 mine nearby
		2 = 2 mines nearby
		3 = 3 mines nearby
		4 = 4 mines nearby
		5 = 5 mines nearby
		6 = 6 mines nearby
		7 = 7 mines nearby
		8 = 8 mines nearby

*/
			if(actTiles[Y][X-1] == "c"){
				clear(X,Y);
			}else if(actTiles[Y][X-1] == "0"){
				clear(X,Y);
			}else if(actTiles[Y][X-1] == "f"){
				flag(X,Y);
				
			}else if(actTiles[Y][X-1] == "1"){
				one(X,Y);
			}else if(actTiles[Y][X-1] == "2"){
				two(X,Y);
			}else if(actTiles[Y][X-1] == "3"){
				three(X,Y);
			}else if(actTiles[Y][X-1] == "4"){
				four(X,Y);
			}else if(actTiles[Y][X-1] == "5"){
				five(X,Y);
			}else if(actTiles[Y][X-1] == "6"){
				six(X,Y);
			}else if(actTiles[Y][X-1] == "7"){
				seven(X,Y);
			}else if(actTiles[Y][X-1] == "8"){			
				eight(X,Y);
				
			}else if(actTiles[Y][X-1] == "m"){			
				mineAt(X-1,Y);				
			}else{
			}
		}		
	}
}

function loadCoveredMap(){
	
	for(var Y = 1;Y<11;Y++){
	
		for(var X = 1;X<11;X++){

			if(shownTiles[Y][X-1] == "c"){
				unopen(X,Y);
			}else if(shownTiles[Y][X-1] == "0"){
				clear(X,Y);
			}else if(shownTiles[Y][X-1] == "f"){
				flag(X,Y);
				
			}else if(shownTiles[Y][X-1] == "1"){
				one(X,Y);
			}else if(shownTiles[Y][X-1] == "2"){
				two(X,Y);
			}else if(shownTiles[Y][X-1] == "3"){
				three(X,Y);
			}else if(shownTiles[Y][X-1] == "4"){
				four(X,Y);
			}else if(shownTiles[Y][X-1] == "5"){
				five(X,Y);
			}else if(shownTiles[Y][X-1] == "6"){
				six(X,Y);
			}else if(shownTiles[Y][X-1] == "7"){
				seven(X,Y);
			}else if(shownTiles[Y][X-1] == "8"){			
				eight(X,Y);
				
			}else if(shownTiles[Y][X-1] == "m"){			
				mineAt(X-1,Y);				
			}else{
			}
		}		
	}
}

function Rmine(ID){
	if(alreadyClicked == true){
		var y = 0;
		if(ID.includes("n10_") == true){
			y = 10;	
		}else if(ID.includes("n2_") == true){
			y = 2;
		}else if(ID.includes("n3_") == true){
			y = 3;	
		}else if(ID.includes("n4_") == true){
			y = 4;	
		}else if(ID.includes("n5_") == true){
			y = 5;	
		}else if(ID.includes("n6_") == true){
			y = 6;	
		}else if(ID.includes("n7_") == true){
			y = 7;
		}else if(ID.includes("n8_") == true){
			y = 8;
		}else if(ID.includes("n9_") == true){
			y = 9;
		}else if(ID.includes("n1_") == true){
			y = 1;
		}else{
		}		

		ID = ID.concat(" ");
		var x = 0;
		if(ID.includes("_1 ") == true){
			x = 1;	
		}else if(ID.includes("_2 ") == true){
			x = 2;
		}else if(ID.includes("_3 ") == true){
			x = 3;	
		}else if(ID.includes("_4 ") == true){
			x = 4;	
		}else if(ID.includes("_5 ") == true){
			x = 5;	
		}else if(ID.includes("_6 ") == true){
			x = 6;	
		}else if(ID.includes("_7 ") == true){
			x = 7;
		}else if(ID.includes("_8 ") == true){
			x = 8;
		}else if(ID.includes("_9 ") == true){
			x = 9;
		}else if(ID.includes("_10 ") == true){
			x = 10;
		}else{
		}


		if(shownTiles[y][x-1] == "f"){
			//unflag it
			console.log("Goodbye flag - I hope im right here...");
			unopen(x,y);
			shownTiles[y][x-1] = "c";
			flagsLeft = flagsLeft + 1;
			console.log(flagsLeft + " flags remaining");
			
		}else{
			if(shownTiles[y][x-1] == "c"){
				console.log("Its a flag now");
				flag(x,y);
				shownTiles[y][x-1] = "f";
				flagsLeft = flagsLeft - 1;
				console.log(flagsLeft + " flags remaining");
			}else{
				console.log("You know that there is no mines here, Why waste a flag?");	
			}
		}	
	}	
}

function mine(ID){
	
//Maxium X Y position this function can have is 30, 22
	
	//what to do when the button has been clicked - gives the ID
	//playSound(1); - dont want it there - stops explosion from happening
	var bb = flagging;
	var y = 0;
	if(ID.includes("n10_") == true){
		y = 10;	
	}else if(ID.includes("n2_") == true){
		y = 2;
	}else if(ID.includes("n3_") == true){
		y = 3;	
	}else if(ID.includes("n4_") == true){
		y = 4;	
	}else if(ID.includes("n5_") == true){
		y = 5;	
	}else if(ID.includes("n6_") == true){
		y = 6;	
	}else if(ID.includes("n7_") == true){
		y = 7;
	}else if(ID.includes("n8_") == true){
		y = 8;
	}else if(ID.includes("n9_") == true){
		y = 9;
	}else if(ID.includes("n1_") == true){
		y = 1;
	}else if(ID.includes("n11_") == true){
		y = 11;
	}else if(ID.includes("n12_") == true){
		y = 12;
	}else if(ID.includes("n13_") == true){
		y = 13;
	}else if(ID.includes("n14_") == true){
		y = 14;
	}else if(ID.includes("n15_") == true){
		y = 15;
	}else if(ID.includes("n16_") == true){
		y = 16;
	}else if(ID.includes("n17_") == true){
		y = 17;
	}else if(ID.includes("n18_") == true){
		y = 18;
	}else if(ID.includes("n19_") == true){
		y = 19;
	}else if(ID.includes("n20_") == true){
		y = 20;
	}else if(ID.includes("n21_") == true){
		y = 21;
	}else if(ID.includes("n22_") == true){
		y = 22;		
	}else{
	}		

	ID = ID.concat(" ");
	var x = 0;
	if(ID.includes("_1 ") == true){
		x = 1;	
	}else if(ID.includes("_2 ") == true){
		x = 2;
	}else if(ID.includes("_3 ") == true){
		x = 3;	
	}else if(ID.includes("_4 ") == true){
		x = 4;	
	}else if(ID.includes("_5 ") == true){
		x = 5;	
	}else if(ID.includes("_6 ") == true){
		x = 6;	
	}else if(ID.includes("_7 ") == true){
		x = 7;
	}else if(ID.includes("_8 ") == true){
		x = 8;
	}else if(ID.includes("_9 ") == true){
		x = 9;
	}else if(ID.includes("_10 ") == true){
		x = 10;

	}else if(ID.includes("_11 ") == true){
		x = 11;
	}else if(ID.includes("_12 ") == true){
		x = 12;
	}else if(ID.includes("_13 ") == true){
		x = 13;
	}else if(ID.includes("_14 ") == true){
		x = 14;
	}else if(ID.includes("_15 ") == true){
		x = 15;
	}else if(ID.includes("_16 ") == true){
		x = 16;
	}else if(ID.includes("_17 ") == true){
		x = 17;
	}else if(ID.includes("_18 ") == true){
		x = 18;
	}else if(ID.includes("_19 ") == true){
		x = 19;
	}else if(ID.includes("_20 ") == true){
		x = 20;
	}else if(ID.includes("_21 ") == true){
		x = 21;
	}else if(ID.includes("_22 ") == true){
		x = 22;
	}else if(ID.includes("_23 ") == true){
		x = 23;
	}else if(ID.includes("_24 ") == true){
		x = 24;
	}else if(ID.includes("_25 ") == true){
		x = 25;
	}else if(ID.includes("_26 ") == true){
		x = 26;
	}else if(ID.includes("_27 ") == true){
		x = 27;
	}else if(ID.includes("_28 ") == true){
		x = 28;
	}else if(ID.includes("_29 ") == true){
		x = 29;	
	}else if(ID.includes("_30 ") == true){
		x = 30;			
	}else{
	}
	
	if(flagging == true && alreadyClicked == true){
		if(shownTiles[y][x-1] == "f"){
			//unflag it
			console.log("Goodbye flag - I hope im right here...");
			unopen(x,y);
			shownTiles[y][x-1] = "c";
			flagsLeft = flagsLeft + 1;
			console.log(flagsLeft + " flags remaining");
			
		}else{
			if(shownTiles[y][x-1] == "c"){
				console.log("Its a flag now");
				flag(x,y);
				shownTiles[y][x-1] = "f";
				flagsLeft = flagsLeft - 1;
				console.log(flagsLeft + " flags remaining");
			}else{
				console.log("You know that there is no mines here, Why waste a flag?");	
			}
		}	
	}else{	
		if(alreadyClicked == false){
			//states that the user has clicked 
			alreadyClicked = true;
			firstClick(x,y);
			ingamePlay = true;
			setTimeout(timer,1000);
		}
		
		if(bb == true){
			if(actTiles[y][x-1] == "f"){
				//unflag it
				unopen(x,y);
			}else{
				flag(x,y);
			}		
		}else{
			globalCount = 0;
			casdadeReveil(x-1,y);
		}
	}
}

function casdadeReveil(x,y){
	globalCount = globalCount + 1;

	let gfds = ["1","2","3","4","5","6","7","8","f","m","0",1,2,3,4,5,6,7,8,9];

	if(actTiles[y][x] == "m"){
		DIE();
		mineAt(x,y);		
	}else if(shownTiles[y][x] != "c"){

		if(actTiles[y][x] == "m"){
			DIE();
			mineAt(x,y);
		}else if(actTiles[y][x] == "f"){
		}else{console.log("Error. The one that has cuased the most errors ever");}
	}else{
		uncover(x,y);
		playSound(1);
		if(gfds.includes(actTiles[y][x]) == true){

		}else if(shownTiles[y][x] == "f"){
		
		}else{
			//unplot the surrounding tiles...
			if(y-1 > 0 &&  x-1 > -1){
				if(shownTiles[y-1][x-1] == "c"){
					casdadeReveil(x-1,y-1);
					
				}else{
				}
			}else{				
			}
			if(y-1 > 0){
				if(shownTiles[y-1][x-0] == "c"){
					casdadeReveil(x-0,y-1);
				
				}
			}
			if(y-1 > 0 &&  x+1 < 11){
				if(shownTiles[y-1][x+1] == "c"){
					casdadeReveil(x+1,y-1);
				}
			}
			if(x-1 > -1){
				if(shownTiles[y-0][x-1] == "c"){
					casdadeReveil(x-1,y-0);
				}			
			}
			if(x+1 < 11){
				if(shownTiles[y-0][x+1] == "c"){
					casdadeReveil(x+1,y-0);
				}			
			}
			if(y+1 < 11  &&  x-1 > -1){
				if(shownTiles[y+1][x-1] == "c"){
					casdadeReveil(x-1,y+1);	
				}				
			}
			if(y+1 < 11 ){
				if(shownTiles[y+1][x-0] == "c"){
					casdadeReveil(x-0,y+1);
				}			
			}	
			
			if(y+1 < 11 &&  x+1 < 11){
				if(shownTiles[y+1][x+1] == "c"){
					casdadeReveil(x+1,y+1);
				}			
			}
			
		}
	}
}

//uncover should set shown tiles varible to actual tile varible
function uncover(x,y){
	if(actTiles[y][x] == 0){
		shownTiles[y][x] = 0;
		clear(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
		
	}else if(actTiles[y][x] == "m"){	
		
	}else if(actTiles[y][x] == 1){
		shownTiles[y][x] = 1;
		one(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
		
	}else if(actTiles[y][x] == 2){
		shownTiles[y][x] = 2;
		two(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);	
		
	}else if(actTiles[y][x] == 3){
		shownTiles[y][x] = 3;
		three(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
		
	}else if(actTiles[y][x] == 4){
		shownTiles[y][x] = 4;
		four(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
			
	}else if(actTiles[y][x] == 5){
		shownTiles[y][x] = 5;
		five(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
		
	}else if(actTiles[y][x] == 6){
		shownTiles[y][x] = 6;
		six(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
		
	}else if(actTiles[y][x] == 7){
		shownTiles[y][x] = 7;
		seven(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
		
	}else if(actTiles[y][x] == 8){
		shownTiles[y][x] = 8;
		eight(x+1,y);
		tilesLeft = tilesLeft - 1;
		console.log("TilesLeft = "+ tilesLeft);
	}
}

function firstClick(x,y){
	hideMines(x,y);
	
}

function hideMines(nx,ny){

	/*
	Find position of the specifide No mine place
	
	
	*/
	
	console.log("Hiding Mines...");

	let BadPlace = nx + ((ny - 1) * GameHeight);
	
	
	
	//console.log("BadPlace is " + nx + ", " + ny + "\n At position " + BadPlace);	
	
	let L = generateList(NoMines, BadPlace);
	var item = 0;
	var ny = 0
	for(var V = 0;V<L.length;V++){
		item = L[V];
		ny = 1;
		while(item > GameWidth){
			item = item - GameWidth;
			ny = ny + 1;
		}
		//mine at (item,ny);
		actTiles[ny][item-1] = "m";
	}
	
	countAround();
	
}

function generateList(length,NP){
	var L = [];
	var N = [];
	let clearZone = [];
	/*
		set clearZone to the areas around
	
	*/
	for(var c = 1;c<100;c++){
		N.push(c);
	}	
	
	clearZone.push(NP-1-GameWidth);	//  	x -1 	y-1	
	clearZone.push(NP-1);			//  	x -1 	y
	clearZone.push(NP-1+GameWidth);	//  	x -1 	y+1

	clearZone.push(NP-GameWidth);	//  	x		y-1
	clearZone.push(NP);				//  	x 		y	
	clearZone.push(NP+GameWidth);	//  	x  		y+1	

	clearZone.push(NP+1-GameWidth);	//  	x +1 	y-1
	clearZone.push(NP+1);			//  	x +1 	y	
	clearZone.push(NP+1+GameWidth);	//  	x +1 	y+1	


	
	var R = 0;
	for(var C = 0;C<length;C++){
		//pick random item of list
		R = Math.floor(Math.random() * N.length);
		
		if(L.includes(R)==true || clearZone.includes(R)==true){
			var qquseucnsurnwudi3id2isakjfn3ufiuehw = R;
			
			while(L.includes(R)==true || clearZone.includes(R)==true){
				R = Math.floor(Math.random() * N.length);
			}
			L.push(R);
		}else{
			L.push(R);
		}
	}
	//console.log("THe list is:\n" + L);
	flagsLeft = L.length;
	return L;
}

function countAround(){
	
	for(var my = 1;my<11;my++){
		for(var mx = 0;mx<10;mx++){
			
			if(actTiles[my][mx] == "m"){
				//if the tile is a mine, add '1' to all surrounding tiles
				
				//x + 1
				if(my + 1 < 11 && mx + 1 < 11){
					if(actTiles[my+1][mx+1] != "m"){
						actTiles[my+1][mx+1] = actTiles[my+1][mx+1] + 1;
					}
				}	
				if(mx+1 < 11){
					if(actTiles[my][mx+1] != "m"){
						actTiles[my][mx+1] = actTiles[my][mx+1] + 1;
					}
				}
				if(my - 1 > 0 && mx + 1 < 11){	
					if(actTiles[my-1][mx+1] != "m"){
						actTiles[my-1][mx+1] = actTiles[my-1][mx+1] + 1;
					}
				}
				
				//x -0
				if(my + 1 < 11){
					if(actTiles[my+1][mx] != "m"){
						actTiles[my+1][mx] = actTiles[my+1][mx] + 1;
					}
				}	
				if(my - 1 >0){
					if(actTiles[my-1][mx] != "m"){
						actTiles[my-1][mx] = actTiles[my-1][mx] + 1;
					}
				}
				
				//x - 1			-- not exactly working
				if(my + 1 < 11 && mx-1 >-1){	
					if(actTiles[my+1][mx-1] != "m"){
						actTiles[my+1][mx-1] = actTiles[my+1][mx-1] + 1;
					}
				}	
				if(mx - 1 > -1){	
					if(actTiles[my][mx-1] != "m"){
						actTiles[my][mx-1] = actTiles[my][mx-1] + 1;
					}
				}	
				if(my - 1 > 0 && mx - 1 > -1){	
					if(actTiles[my-1][mx-1] != "m"){
						actTiles[my-1][mx-1] = actTiles[my-1][mx-1] + 1;
					}
				}	
			}
		}	
	}
}

function DIE(){
	ingamePlay = false;
	console.log("\nYou Died...\n");
	//console.log("\n  \n  ");
	loadVisibleMap();
	CanPlayAgain = false;
	playSound(0);
	setTimeout(dghah4js7824ngnw,4400);
}
function dghah4js7824ngnw(){showMessage("You Died");CanPlayAgain=true;}

function startGame(){
	setUpDefaults();
	//hideMines();
}

function timer(){
	//a global counter that count how long you 
	//  have been playing for in seconds
	timeDone = timeDone + 1;
	updateDisplay();
	if(ingamePlay == true){
		T = setTimeout(timer,1000);
	}
}

function updateDisplay(){
	document.getElementById("mode").innerHTML = "<b>MODE:  " + mode + "</b>";
	document.getElementById("timer").innerHTML = "<b>" + timeDone + "</b>";
/*
		Put in here the coed for detecting when the agme has finished

*/	
	if(tilesLeft == NoMines){
		stuff_to_do_once_finished();//when game is over, do this.		
	}

}

function showMessage(title){
	document.getElementById("popTitle").innerHTML = title;
	document.getElementById("pop").style.display = "block";
}



function stuff_to_do_once_finished(){
	/*If the number of flags left = 0*/
	
	var OHS = localStorage.getItem("highscoreMines");
	if(timeDone < OHS){/*Should there be a new Highscore set?   */
		localStorage.setItem("highscoreMines", timeDone); 		
	}
	/*End the game*/
	showMessage("Click to Play Again");
	ingamePlay = false;	
}

function e(){
	document.getElementById("Mode").innerHTML = "<b>Mode: Easy</b>";
	mode = "easy";
	document.getElementById("ddDifOptions").style.display = "none";

}

function d(){
	document.getElementById("Mode").innerHTML = "<b>Mode: Default</b>";
	mode = "default";	
	document.getElementById("ddDifOptions").style.display = "none";

}

function m(){
	document.getElementById("Mode").innerHTML = "<b>Mode: Medium</b>";
	mode = "medium";
	document.getElementById("ddDifOptions").style.display = "none";
	
}

function h(){
	document.getElementById("Mode").innerHTML = "<b>Mode: Hard</b>";
	mode = "hard";
	document.getElementById("ddDifOptions").style.display = "none";
	
}

function modeChange(){
	
	
}


function openOptions(){
	if(optionsOpen == false){
		document.getElementById("ddDifOptions").style.display = "block";
		optionsOpen = true;
	}else{
		document.getElementById("ddDifOptions").style.display = "none";
		optionsOpen = false;		
	}
}

var mode = "default";

var optionsOpen = false;
var ingamePlay = false;
var alreadyClicked = false;
var admin = true;
var flagging = false;

var maxiumCalls = 100;
var globalCount = 0;
var GameWidth = 10;
var GameHeight = 10;
var timeDone = 0;
var tilesLeft = 100;
var keyState = 0;
var T = 0;

var NoMines = undefined;
var flagsLeft = NoMines;


//about 12 mines per 10x10 map
//ratio is 1 in 8 tiles are mines

