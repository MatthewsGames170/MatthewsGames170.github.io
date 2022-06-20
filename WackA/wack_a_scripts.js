
function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	if (x =="b"||x=="B"){
		if(playing == false){
			begin();
			playing = true;
		}
	}else if(x=="R"||x=="r"){
		window.location.reload();
	}
}
	
function spawnChr(){
	//what to do each running
	//ie. spawn the character, wait to remove them, then set counter to re spawn them

	//alert("spawn chr is activaating");
	if(contPlay==true){
		R_1 = Math.floor(Math.random() * 16);		
		changeDot(R_1);	
		//set new wait time until mole disappears
		waitTime = Math.floor(Math.random() * 2000) + 700;
		setTimeout(despawnChr,1000);	
	}	
}

function despawnChr(){
	//alert("despawn is deaactiaation");
	
	clearBackground();
	
	//set new wait time until mole appears
	tmOT = Math.floor(Math.random() * 1521) + 700;
	setTimeout(spawnChr,tmOT);		
}

function changeDot(R){
	//for the specified number, change the cosponsoring dot to be full
	//if no image specified, change colour
	
	if(CharacterToHit==""){
				if(R==1) {document.getElementById("btn_1_1").style.backgroundColor = "red";CurrentID = "btn_1_1";
		}else 	if(R==2) {document.getElementById("btn_2_1").style.backgroundColor = "red";CurrentID = "btn_2_1";
		}else 	if(R==3) {document.getElementById("btn_3_1").style.backgroundColor = "red";CurrentID = "btn_3_1";
		}else 	if(R==4) {document.getElementById("btn_4_1").style.backgroundColor = "red";CurrentID = "btn_4_1";
		
		}else 	if(R==5) {document.getElementById("btn_1_2").style.backgroundColor = "red";CurrentID = "btn_1_2";
		}else 	if(R==6) {document.getElementById("btn_2_2").style.backgroundColor = "red";CurrentID = "btn_2_2";
		}else 	if(R==7) {document.getElementById("btn_3_2").style.backgroundColor = "red";CurrentID = "btn_3_2";
		}else 	if(R==8) {document.getElementById("btn_4_2").style.backgroundColor = "red";CurrentID = "btn_4_2";
		
		}else 	if(R==9) {document.getElementById("btn_1_3").style.backgroundColor = "red";CurrentID = "btn_1_3";
		}else 	if(R==10){document.getElementById("btn_2_3").style.backgroundColor = "red";CurrentID = "btn_2_3";
		}else 	if(R==11){document.getElementById("btn_3_3").style.backgroundColor = "red";CurrentID = "btn_3_3";
		}else 	if(R==12){document.getElementById("btn_4_3").style.backgroundColor = "red";CurrentID = "btn_4_3";
		
		}else 	if(R==13){document.getElementById("btn_1_4").style.backgroundColor = "red";CurrentID = "btn_1_4";
		}else 	if(R==14){document.getElementById("btn_2_4").style.backgroundColor = "red";CurrentID = "btn_2_4";
		}else 	if(R==15){document.getElementById("btn_3_4").style.backgroundColor = "red";CurrentID = "btn_3_4";
		}else 	if(R==16){document.getElementById("btn_4_4").style.backgroundColor = "red";CurrentID = "btn_4_4";		
		}
	
	}else{
				if(R==1) {document.getElementById("btn_1_1").backgroundImage = CharacterToHit;
		}else 	if(R==2) {document.getElementById("btn_2_1").backgroundImage = CharacterToHit;
		}else 	if(R==3) {document.getElementById("btn_3_1").backgroundImage = CharacterToHit;
		}else 	if(R==4) {document.getElementById("btn_4_1").backgroundImage = CharacterToHit;
		
		}else 	if(R==5) {document.getElementById("btn_1_2").backgroundImage = CharacterToHit;
		}else 	if(R==6) {document.getElementById("btn_2_2").backgroundImage = CharacterToHit;
		}else 	if(R==7) {document.getElementById("btn_3_2").backgroundImage = CharacterToHit;
		}else 	if(R==8) {document.getElementById("btn_4_2").backgroundImage = CharacterToHit;
		
		}else 	if(R==9) {document.getElementById("btn_1_3").backgroundImage = CharacterToHit;
		}else 	if(R==10){document.getElementById("btn_2_3").backgroundImage = CharacterToHit;
		}else 	if(R==11){document.getElementById("btn_3_3").backgroundImage = CharacterToHit;
		}else 	if(R==12){document.getElementById("btn_4_3").backgroundImage = CharacterToHit;
		
		}else 	if(R==13){document.getElementById("btn_1_4").backgroundImage = CharacterToHit;	
		}else 	if(R==14){document.getElementById("btn_2_4").backgroundImage = CharacterToHit;	
		}else 	if(R==15){document.getElementById("btn_3_4").backgroundImage = CharacterToHit;	
		}else 	if(R==16){document.getElementById("btn_4_4").backgroundImage = CharacterToHit;			
		}
	}
}

function clearBackground(){
	//set every dot to black
	document.getElementById("btn_1_1").style.backgroundColor = "blue";
	document.getElementById("btn_2_1").style.backgroundColor = "blue";
	document.getElementById("btn_3_1").style.backgroundColor = "blue";
	document.getElementById("btn_4_1").style.backgroundColor = "blue";
                                       
	document.getElementById("btn_1_2").style.backgroundColor = "blue";
	document.getElementById("btn_2_2").style.backgroundColor = "blue";
	document.getElementById("btn_3_2").style.backgroundColor = "blue";
	document.getElementById("btn_4_2").style.backgroundColor = "blue";
                            
	document.getElementById("btn_1_3").style.backgroundColor = "blue";
	document.getElementById("btn_2_3").style.backgroundColor = "blue";
	document.getElementById("btn_3_3").style.backgroundColor = "blue";
	document.getElementById("btn_4_3").style.backgroundColor = "blue";
                             
	document.getElementById("btn_1_4").style.backgroundColor = "blue";
	document.getElementById("btn_2_4").style.backgroundColor = "blue";
	document.getElementById("btn_3_4").style.backgroundColor = "blue";
	document.getElementById("btn_4_4").style.backgroundColor = "blue";

}

function begin(){
	//actions to complete when setting up the game
	score = 0;
	displayScore();
	//alert("Click OK to begin!");
	
	//	setTimeout(ForEachRun,waitTime);	
	
	setTimeout(endGame,gameTime);//sets when game will end
	setTimeout(spawnChr,waitTime);//sets the interval to which running will activate  - the time between mole appearing

	
}

function endGame(){
	//actions to do when the timer runs out
	gameTime = 1000000000000000000000000000000;
	waitTime = 1000000000000000000000000000000;
	//alert("Your score was " + score);
	contPlay = false;	
	playing = false;
	var T = document.getElementByID("outArea").innerHTML;
	document.getElementByID("outArea").innerHTML = T + "<p>Your Score was: " + score + "</p>";
}

function Clkd(ID){
	//determine if the object has been clicked
	//if clicked, change score by one, clear the background and change the score displayed
	
	if(ID == CurrentID){
		score = score + 1;
		displayScore();
		clearBackground();
		CurrentID = "";
	}
	
}

function displayScore(){
	document.getElementById("scoreOutput").innerHTML = score;
}

var contPlay = true;
var allowedID = "";
var score = 0;
var CurrentID = "";
var CharacterToHit  = "";
var playing = false;
var gameTime = 30000;//the time that the game will play for
var waitTime = 30;//

