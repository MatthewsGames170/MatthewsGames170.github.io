/*
	P L A N   F O R   G A M E 
	
	player is ship  going to mouse pointer in screen
		on click, the player 'shoots' directly forward

	player tryies to shoot asteroids - when hit they go bang, if asteroids hit player, player looses life (1 of 3)
	asteroids can only spawn in the top half of the screen and go directly for where the player is (at the moment of thier creation)
		asteroids keep moving forward until they are out of the screen or hit something else. 
	player cannot go in the top 15%? of the play area. 
	
	
	# # # Code Issues # # #

	(0,0) for each object is different. tits at the defualt place for it to be.
		so for the second object it would be the top left corner, but down by the hieght of the first object
		A conversion factor in its set Position property is likly required
	
	The function(s) to run the asteriods may be too complicated...
		The code may need to become more efficent to enable good graphics. 
		When both asteriods and amo are running, amo dos not always appear, but works perfectly when asteriods is not running.
		
	As each item is a image, the background colour is still present - find way to remove it
	
	
	# # # Errors # # #
	
	Asteriods are not moving in the correct way - they often do not head to the left hand side of the screen
		may be due to x=0 line not being where I think x=0 is -> may need asteriods to die on x=-70
	
	could be due to when the asteriodsa start moving, leading to the offset for the amo, or for all astoeriods no longer being correct...? 
	
	
	# # # To Do  # # #
	
	Get asteriods to collide with player
		hence, have player be able to die and live changes, hence, end of game stuff
	
	Get asteriods to collide with amo
		hence, have asteriods be able to die and score changes
	
*/
/*Game running functions*/

function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	/*
		*** KEYS USED ***
		
		UP Arrow 		or W	- 	Player Up
		Down Arrow 		or S	- 	Player Down
		Right Arrow 	or D	-	Move right
		Left Arrow		or A 	-	Move left
		

	*/
	//will likly need ifs to control where the player can go - else they may go far off the screen
	if (x =="ArrowDown"||x=="s"||x=="S"){
		//go backwards
		if(playerY + Pspeed < gameHeight){
			playerY = playerY + Pspeed;
		}
		setPlayer1Position(playerX,playerY);

	}else if(x =="ArrowUp"||x=="w"||x=="W"){
		//go forwards
		movePlayerForward(Pspeed)
	
	}else if(x =="ArrowRight"||x=="d"||x=="D"){
		//rotate
		rotatePlayer(PRspeed);		
	}else if(x =="ArrowLeft"||x=="a"||x=="A"){
		//rotate
		rotatePlayer(-PRspeed);
	}else if(x == " " || x=="Enter"){
		fire();
		//fire wepon
	}else if(x=="z"||x=="Z"){
		if(admin_override_48snf==true){runAmo();}
	}else if(x=="b"||x=="B"){
		//use this to activeate amo
		
	}else if(x=="x"||x=="X"){	
	
	}else if(x=="p"||x=="P"){	
		console.log(" # Players Position\n\nX = "+playerX+"\nY = " + playerY);
	}else if(x=="Q"||x=="q"){
		if(admin_override_48snf==true){setUpAsteriods();}
	}
}


function playGame(){
/*
	Start eh timers and set defaults here.

*/	
	if(inGame == false){
		inGame = true;
		score = 0;
		lives = 5;
		Pspeed = 5;
		PRspeed = 1;
		playerX = 325;
		playerY = 448;
		playerHieght = 170;
		playerWidth = 170;
		playerAngle = 0;
		gameWidth = 600;
		gameHeight = 550;
		lives = 5;
		score = 0;
		playing = true;
		div = 0;
		AsteriodAveSpeed = 25;
		astTickCounter = 0;
		canSpawnNewAsteriods = true;
		tickChance = 100;//the amount of possible entries there are for generating a 'new' asteriod
		waitTime = 50;
		firePlace = false;//the gun that the amo will fire from | false is the left one, true is the right one
		amoSpeed = 8;	
		
		setUpAsteriods();
		runAmo();		
	}else{
		console.log("Game already started");
	}
}

function endGame(){
	document.getElementById("outMessageArea").style.display = "block";
	document.getElementById("outMessageArea").innerHTML = "<h4>You Died</h4><br><p>Press play to play again</p>";
	
	//check high scores
	var HS = localStorage.getItem("spaceHS_1");
	if(HS == undefined){HS = 0;}
	
	if(score > HS){
		HS = score;
	}					//name, value
	localStorage.setItem("spaceHS_1",HS);
}

function updateDisplays(){
	document.getElementById("scoreBox").innerHTML = score;
	document.getElementById("livesBox").innerHTML = lives;
	
	document.getElementById("HighscoreBox").innerHTML = localStorage.getItem("spaceHS_1");
}


/*Varible set up*/

var Pspeed = 5;
var PRspeed = 1;
var playerX = 325;
var playerY = 448;
var playerHieght = 170;
var playerWidth = 170;
var playerAngle = 0;
var gameWidth = 600;//boundaries are also to -75   or -1/2 object width....
var gameHeight = 550;
var lives = 5;
var score = 0;

var playing = true;
var inGame = false;

var div = 0;
var AsteriodAveSpeed = 25;
var astTickCounter = 0;
var canSpawnNewAsteriods = true;
var tickChance = 24;//the amount of possible entries there are for generating a 'new' asteriod
var waitTime = 50;

var firePlace = false;//the gun that the amo will fire from | false is the left one, true is the right one
var amoSpeed = 8;

var admin_override_48snf = false;

var AmoList = [];{
		//     0  1     2        3     4        5 
	//in form [x, y, gradient, width, height, active?]
	AmoList[0] =  [0,0,0,5,20,false];
	AmoList[1] =  [0,0,0,5,20,false];
	AmoList[2] =  [0,0,0,5,20,false];
	AmoList[3] =  [0,0,0,5,20,false];
	AmoList[4] =  [0,0,0,5,20,false];
	AmoList[5] =  [0,0,0,5,20,false];
	AmoList[6] =  [0,0,0,5,20,false];
	AmoList[7] =  [0,0,0,5,20,false];
	AmoList[8] =  [0,0,0,5,20,false];
	AmoList[9] =  [0,0,0,5,20,false];
	AmoList[10] = [0,0,0,5,20,false];
	AmoList[11] = [0,0,0,5,20,false];
}

var Asteriods = [];{
	//         0       1         2        3       4      5        6   
	// Have X place, Y place, Direction, width, Height, active?, speed
	Asteriods[0] =  [0,0,0,235,215,false,AsteriodAveSpeed];
	Asteriods[1] =  [0,0,0,100,100,false,AsteriodAveSpeed*0.95];
	Asteriods[2] =  [0,0,0,175,175,false,AsteriodAveSpeed*1.2];
	Asteriods[3] =  [0,0,0,175,175,false,AsteriodAveSpeed*1.1];
	Asteriods[4] =  [0,0,0,50,50,false,AsteriodAveSpeed*0.8];
	Asteriods[5] =  [0,0,0,25,25,false,AsteriodAveSpeed*0.93];
	//no adjusted yet i think
	Asteriods[6] =  [0,0,0,250,250,false,5];
/*	Asteriods[7] =  [0,0,0,250,250,false,5];
	Asteriods[8] =  [0,0,0,250,250,false,5];
	Asteriods[9] =  [0,0,0,250,250,false,5];
*/
}


/*Player functions*/
function rotatePlayer(x){
//no longer used in this game, but kept here for future use	
	//x = degrees to turn
	playerAngle = playerAngle + x;
	if(playerAngle > 359){
		playerAngle = playerAngle - 360;
	}else if(playerAngle < 0){
		playerAngle = playerAngle + 360;
	}
	document.getElementById("player1").style.transform = "rotate(" + playerAngle + "deg)";
//	console.log("Player angle: " + playerAngle);
}

function movePlayerForward(x){
	//make it for asteroids
	
	
	//I am really pleased with this function
	var O = angle*Math.PI / 180;//theta is in radians
	
	var dy = Math.round(x * Math.sin(O)); 
	var dx = Math.round(x * Math.cos(O));
	//console.log("Moving forward by " + x + " width and angle of "+ angle + "\n\nThis leads to a radians angle of " + O + "\nafter rounding of sin and cos, I get the differenc of " + dy + " in the Y and " + dx + " in the X");
	var playerHeight = 30;
	var playerWidth = 20;
	if(playerY + dy > (playerHeight / 2) && playerY + dy < 475  && playerX + dx > (playerWidth / 2) && playerX + dx < 580){
		playerY = playerY + dy;
		playerX = playerX + dx;		
	}
	setPlayer(playerX,playerY);
}

function setPlayer1Position(x,y){
	document.getElementById("player1").style.top = y;
	document.getElementById("player1").style.left = x;
//	console.log("Player X = " + x  + "\nPlayer Y = " + y);
	//setAmoPlace();
}

function killPlayer(){
	/*
		reduce lives by 1
		reset all asteriods
		check high scores etc
	
	*/
	lives = lives - 1;
	//reset asteriods
	canSpawnNewAsteriods = false;
	for(var c=0;c<Asteriods.length;c++){
		//kill each asteriod
		destroyAsteriod(c);
	}
	canSpawnNewAsteriods = true; // do I want this line?
	if(lives < 1){
		//end game
		
	}
}

function mouseAction(){
	var mx = event.clientX;
	var my = event.clientY;
	
	//-  half of the players width and height
	playerX = mx-0.5*playerWidth;
	playerY = my-0.5*playerHieght;
	setPlayer1Position(playerX,playerY);
}

function fire(){
	//console.log("Bang, with amo to appear!");
	/*
		Put in some way so that the amo cannot appear next to each othe, maybe a short wait? 
		esle they appear as short beam...which could be usefull.....
	*/
	var firstActive = -1;
	var canStillgo = true;
	for(var c = 0;c<AmoList.length;c++){
		if(AmoList[c][5]==false && canStillgo==true){
			firstActive = c;
			canStillgo = false;
		}
	}
	if(firstActive == -1){
		console.log("Overheat\n\nActually, there is no spare amo");
	}else{
		if(firePlace==true){
			AmoList[firstActive][0] = playerX-22 + playerWidth * 0.91//x - position, on the right
			firePlace = false;		
		}else{
			AmoList[firstActive][0] = playerX-4 + playerWidth * 0.09;//x - position, on the left
			firePlace = true;
		}
	/*for positioning, need to go to player (x,y), then minus 50% of height and width, then + bits that are already there*/
		AmoList[firstActive][1] = playerY+15 ;//y - position
		
		//set position!!
		setAmoPLace(AmoList[firstActive][0],AmoList[firstActive][1],firstActive);  
		displayAmo(firstActive,"block");
		AmoList[firstActive][5] = true;
	}
}



/*Ammo functions*/
function runAmo(){
	for(var AmoPlace = 0;AmoPlace<AmoList.length;AmoPlace++){
		/*
			for each ACTIVE amo, alter its Y coordinate by X amount
		*/
		//console.log("Running amo " + AmoPlace);
		if(AmoList[AmoPlace][5] == true){
			//amo is activated
			AmoList[AmoPlace][1] = AmoList[AmoPlace][1] - amoSpeed;//change the Amo Y coordordinate
			setAmoPLace(AmoList[AmoPlace][0],AmoList[AmoPlace][1],AmoPlace)

			for(var c=0;c<Asteriods.length;c++){
				//console.log("AmoPlace has the value of " + AmoPlace);
				if(isAsteriodCollidingWithActiveAmo(c,AmoPlace)==true){
					//set amo to inactive, and hide
					AmoList[AmoPlace][5] = false;
					displayAmo(AmoPlace,"none");
				}	
			}
			/*if  beyond boundaries (ie, Y < 0) */			
			if(AmoList[AmoPlace][1] < 0){
				//set to inactive
				AmoList[AmoPlace][5] = false;
				displayAmo(AmoPlace,"none");
			}
		}
	}
	if(playing == true){
		setTimeout(runAmo,25);
	}
}

function setAmoPLace(x,y,n){
	var ID = "A".concat(n+1);
	//console.log("Amo to go to " + x + ", " + y + "-940");
	document.getElementById(ID).style.left = x;	
	document.getElementById(ID).style.top = y;
	/*
	//This bit only needed if a correction factor is needed
	if(n==0){
		document.getElementById("A1").style.top = y-940;
	}else if(n==1){
		document.getElementById("A2").style.top = y-960;	
	}else if(n==2){
		document.getElementById("A3").style.top = y-980;	
	}else if(n==3){
		document.getElementById("A4").style.top = y-1000;	
	}else if(n==4){
		document.getElementById("A5").style.top = y-1020;	
	}else if(n==5){
		document.getElementById("A6").style.top = y-1040;	
	}else if(n==6){
		document.getElementById("A7").style.top = y-1060;	
	}else if(n==7){
		document.getElementById("A8").style.top = y-1080;	
	}else if(n==8){
		document.getElementById("A9").style.top = y-1100;	
	}else if(n==9){
		document.getElementById("A10").style.top = y-1120;	
	}else if(n==10){
		document.getElementById("A11").style.top = y-1140;	
	}else if(n==11){
		document.getElementById("A12").style.top = y-1160;
	}*/
}

function setUpAmoTwo(){
		var y=0;
		document.getElementById("A1").style.top = y-940;
		document.getElementById("A2").style.top = y-960;	
		document.getElementById("A3").style.top = y-980;	
		document.getElementById("A4").style.top = y-1000;	
		document.getElementById("A5").style.top = y-1020;	
		document.getElementById("A6").style.top = y-1040;	
		document.getElementById("A7").style.top = y-1060;	
		document.getElementById("A8").style.top = y-1080;	
		document.getElementById("A9").style.top = y-1100;	
		document.getElementById("A10").style.top = y-1120;	
		document.getElementById("A11").style.top = y-1140;	
		document.getElementById("A12").style.top = y-1160;
		
	
	
}

function displayAmo(n,action){
	if(action == "block" || action == "none"){
		var ID = "A".concat(n+1);
		document.getElementById(ID).style.display = action;
		//console.log("Amo is to appear");
	}
}


/*Other functions*/
function myRound(x,d){/* Round the specifide number (x) to (d) number of decimal places*/return Math.round(x*Math.pow(10,d))/Math.pow(10,d);}



/*Asteriod functions*/
function runAsteriods(){
	//console.log("Run Asteriods activated\n\nThe length of the Asteriods Array is " + Asteriods.length);
	for(var asteriodCheckNumber = 0;asteriodCheckNumber<Asteriods.length;asteriodCheckNumber++){
		//var asteriodCheckNumber = 0;
		if(Asteriods[asteriodCheckNumber][5]==true){
		//if the asteriod is active, then it can move and kill player
	/*
		perhaps not have the check if colliding stuff here
		amo ones are done i it scripts
		
		maybe the player has a timer etc going and it then generates a list of points of every asteriods 
			(all of them in one list) then check its position against that 1 list
			
	*/
			if(isAsteriodCollidingWithActiveAmo(asteriodCheckNumber)==true){
				//collliding with amo?
//				console.log("Hit amo");
				destroyAsteriod(asteriodCheckNumber);
				score = score +1;
				updateDisplays();
			}else if(isAsteriodCollidingWithShip(asteriodCheckNumber)==true){
//				console.log("Hit ship");
				killPlayer();
				destroyAsteriod(asteriodCheckNumber);
				updateDisplays();
			}else{
				moveAsteriods(Asteriods[asteriodCheckNumber][6],asteriodCheckNumber);
				if(Asteriods[asteriodCheckNumber][0]<0 ||Asteriods[asteriodCheckNumber][0] > gameWidth){
//					console.log("OUt of bounds ono the X axis");
					destroyAsteriod(asteriodCheckNumber);
				}else if(Asteriods[asteriodCheckNumber][1] > gameHeight || Asteriods[asteriodCheckNumber][1] < -500){
//					console.log("Out of bounds on the Y axis");
					destroyAsteriod(asteriodCheckNumber);					
				}else{
				}
			}
		}else{
/*			Begin the asteriod
			
			small chance that an asteriod would be set off 
				try to include a way so that it is not colliding with any other asteriod
			
	
*/
			var R = Math.floor(Math.random() * tickChance);		
			if(R == 0 && canSpawnNewAsteriods==true){
				Asteriods[asteriodCheckNumber][0] =  Math.floor(Math.random()* (gameWidth-5))+1;//new x position
				Asteriods[asteriodCheckNumber][1] = -50 /*- Asteriods[asteriodCheckNumber][4]*/;//new y position    | the correction factor may no longer be needed....
				var m = (Asteriods[asteriodCheckNumber][1] - playerY)/(Asteriods[asteriodCheckNumber][0] - playerX);
				Asteriods[asteriodCheckNumber][2] = Math.atan(m);//as M = tan(theta);  RETURN IT IN RADIANS!!!
				//console.log("Asteriod " + asteriodCheckNumber + " is about to be set off with a angle of " + Asteriods[asteriodCheckNumber][2] + " \nfrom a gradients of  "+ m + " as the player is at;\npx = "  + playerX + "\npy = " + playerY +"\n\nThe asteriods starting point is("+ Asteriods[asteriodCheckNumber][0]+","+Asteriods[asteriodCheckNumber][1]+")");
				displayAsteriod(asteriodCheckNumber,"block");
				Asteriods[asteriodCheckNumber][5] = true; 
			}
		}
	}
	
	astTickCounter = astTickCounter+1;
	//console.log("Asteriod tick " +astTickCounter);
	if(playing == true){
		setTimeout(runAsteriods,waitTime);
	}
}

function moveAsteriods(x,A_No){
	//move an asteriod number (A_No) forward by x amount 
	
	//somethings not right with the angle / sin/cos part

	var O =  Asteriods[A_No][2];//  *Math.PI / 180;/gradient angle is calculated in radians
	displayAsteriod(A_No,"block");
	var dy = Math.round(x * Math.sin(O),2); 
	var dx = Math.round(x * Math.cos(O),2);//  seems to end up being that my X = 5 and Y = 0
	
	//console.log("Moving Asteriod "+A_No+" forward by " + x + " and angle of "+ Asteriods[A_No][2] + "\n\nThis leads to a radians angle of " + O + "\nafter rounding of\n sin ("+Math.sin(O)+") and\n cos ("+Math.cos(O)+"),\n I get the differenc of " + dy + " in the Y and " + dx + " in the X");
	
	var AH = Asteriods[A_No][4];
	var AW = Asteriods[A_No][3];
	var AX = Asteriods[A_No][0];
	var AY = Asteriods[A_No][1];
	
	
		Asteriods[A_No][1] = AY + dy;
		Asteriods[A_No][0] = AX + dx;
		//console.log("Moving Asteriod "+A_No+" forward by " + x + " and angle of "+ Asteriods[A_No][2] + "\n\nThis leads to a radians angle of " + O + "\nafter rounding of\n sin ("+Math.sin(O)+") and\n cos ("+Math.cos(O)+"),\n I get the differenc of " + dy + " in the Y and " + dx + " in the X\n\nThis results in the asteriod now being at X = "+Asteriods[A_No][0]+" and Y = "+Asteriods[A_No][1]);

		displayAsteriod(A_No,"block");
	if(A_No == 1){		setAst1Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 2){	setAst2Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 3){	setAst3Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 4){	setAst4Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 5){	setAst5Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 6){	setAst6Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 7){	setAst7Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 8){	setAst8Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 9){	setAst9Position( Asteriods[A_No][0],Asteriods[A_No][1]);}
	else if(A_No == 10){setAst10Position(Asteriods[A_No][0],Asteriods[A_No][1]);}
}

function setUpAsteriods(){
/*
	setAst1Position(0,0);	
	setAst2Position(0,0);	
	setAst3Position(0,0);	
	setAst4Position(0,0);	
	setAst5Position(0,0);	
	setAst6Position(0,0);
	//console.log("Asteriods set up.\n\nBegining asteriod movement")
*/
//	setUpAmoTwo();
/*
//Correcion factor now done in CSS file

	document.getElementById("O1").style.top = -225;	
	document.getElementById("O2").style.top = -445;
	document.getElementById("O4").style.top = -745;
	document.getElementById("O3").style.top = -580;	
	document.getElementById("O5").style.top = -875;
	document.getElementById("O6").style.top = -935;
*/



	runAsteriods();

}

function displayAsteriod(n,action){
/*
	alter the z-index. lower for ones that are no showing to ensure that the black screen does not appear.


*/	
	if(action == "block"){//switch to asteriod image
		//console.log("Asteriod to show");
		if(n==0){
			document.getElementById("O1").style.backgroundImage = "url('../Z_Images/asteriod1.jpg')";
		}else if(n==1){
			document.getElementById("O2").style.backgroundImage = "url('../Z_Images/asteroid2.jpg')";			
		}else if(n==2){
			document.getElementById("O3").style.backgroundImage = "url('../Z_Images/asteriod3.jpg')";		
		}else if(n==3){
			document.getElementById("O4").style.backgroundImage = "url('../Z_Images/asteriod4.jpg')";		
		}else if(n==4){
			document.getElementById("O5").style.backgroundImage = "url('../Z_Images/asteriod5.jpg')";		
		}else if(n==5){
			document.getElementById("O6").style.backgroundImage = "url('../Z_Images/asteriod6.jpg')";		
		}else if(n==6){
			document.getElementById("O7").style.backgroundImage = "url('../Z_Images/asteriod7.jpg')";			
		}else{console.log("ID not reconigsed");}
		
	}else if(action == "none"){
		var ID = "O".concat(n+1);
		//console.log("Asteriod to hide");
		document.getElementById(ID).style.backgroundImage = "url('../Z_Images/AST"+(n+1)+"_blank.jpg')";		
	
	}else if(action == "explode"){
		var ID = "O".concat(n+1);
		//console.log("Asteriod to explode");
		document.getElementById(ID).style.backgroundImage = "url('../Z_Images/AST"+(n+1)+"_ex.jpg')";				
		
	}
}

function destroyAsteriod(n){
	/*
		hide original asteroid
		summon an exploin in its place
		(Change the  background image?)
	
		no score changers here as this function is also used to keep asteriods within the boundaries
	*/
	displayAsteriod(n,"explode");	
	//console.log("destroying asteriod");
	
	setTimeout(resetAsteriod(n),1000);
}
function resetAsteriod(n){
	Asteriods[n][0] = 0-Asteriods[n][3];//new x
	Asteriods[n][1] = 0-Asteriods[n][4];//new y
	Asteriods[n][2] = 0;//new direction
	Asteriods[n][5] = false;//set it to false		
	if(n == 1){		setAst1Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 2){	setAst2Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 3){	setAst3Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 4){	setAst4Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 5){	setAst5Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 6){	setAst6Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 7){	setAst7Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 8){	setAst8Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 9){	setAst9Position( Asteriods[n][0],Asteriods[n][1]);}
	else if(n == 10){setAst10Position(Asteriods[n][0],Asteriods[n][1]);}
	displayAsteriod(n,"none");	
}


/*Asteriod position functions*/{
	function setAst_ALL_position(x,y,n){
		document.getElementById("O".concat(n)).style.top = y;
		document.getElementById("O".concat(n)).style.left = x;		
	}

	function setAst1Position(x,y){
		//document.getElementById("O1").style.top = y-225;
		document.getElementById("O1").style.top = y;
		document.getElementById("O1").style.left = x;	
	}
	function setAst2Position(x,y){
		//document.getElementById("O2").style.top = y-445;
		document.getElementById("O2").style.top = y;
		document.getElementById("O2").style.left = x;	
	}
	function setAst3Position(x,y){
	//	document.getElementById("O3").style.top = y-580;
		document.getElementById("O3").style.top = y;
		document.getElementById("O3").style.left = x;	
	}
	function setAst4Position(x,y){
	//	document.getElementById("O4").style.top = y-745;
		document.getElementById("O4").style.top = y;
		document.getElementById("O4").style.left = x;	
	}
	function setAst5Position(x,y){
		//document.getElementById("O5").style.top = y-875;
		document.getElementById("O5").style.top = y;
		document.getElementById("O5").style.left = x;	
	}
	function setAst6Position(x,y){
		//document.getElementById("O6").style.top = y-935;
		document.getElementById("O6").style.top = y;
		document.getElementById("O6").style.left = x;	
	}
	//not adjusted yet from here
	function setAst7Position(x,y){
		//document.getElementById("O7").style.top = y-445;
		document.getElementById("O7").style.top = y;
		document.getElementById("O7").style.left = x;	
	}
	function setAst8Position(x,y){
		document.getElementById("O8").style.top = y-445;
		document.getElementById("O8").style.left = x;	
	}
	function setAst9Position(x,y){
		document.getElementById("O9").style.top = y-445;
		document.getElementById("O9").style.left = x;	
	}
	function setAst10Position(x,y){
		document.getElementById("O10").style.top = y-445;
		document.getElementById("O10").style.left = x;	
	}
}


/*Collision functions*/
function isAsteriodCollidingWithShip(AN){
	var ACX = Asteriods[AN][0];
	var ACY = Asteriods[AN][1];
	var output = false;
	

	//generate list of point that I am at and see if any of them collid with the ship places
	var PossiblePlaces = generateListofPointsOfCircle(ACX,ACY,Asteriods[AN][3],false,Asteriods[AN][4]);//places that asteriod could be
	//var shipPlaces = generateListofPointsOfPolygon([[1,2],[2,2],[4,4]]);	
	var shipPlaces = generateShipPoints();
	
	for(var c=0;c<shipPlaces.length;c++){
		//if amo place = a place on output list
		for(var outCounter=0;outCounter<PossiblePlaces.length;outCounter++){
			if(Math.round(PossiblePlaces[outCounter][0]) == Math.round(shipPlaces[c][0]) && Math.round(PossiblePlaces[outCounter][1]) == Math.round(shipPlaces[c][1])){
				//destroy asteriod
				console.log("Asteriod hit SHIP!!! :( :( !  :(")
				output = true;
			}
		}
	}
	return output;
}

function isAsteriodCollidingWithActiveAmo(Asod){
	var ACX = Asteriods[Asod][0];
	var ACY = Asteriods[Asod][1];
	var output = false;
	var PossiblePlaces = generateListofPointsOfCircle(ACX,ACY,Asteriods[Asod][3],false,Asteriods[Asod][4]);//places that steriod could be

//Causes game to be too laggy
	for(var c = 0;c<PossiblePlaces.length;c++){
		for(var AmoVallue = 0;AmoVallue<AmoList.length;AmoVallue++){

			if(AmoList[AmoVallue][5] == true && Math.round(PossiblePlaces[c][0]) == Math.round(AmoList[AmoVallue][0]) && Math.round(PossiblePlaces[c][1]) == Math.round(AmoList[AmoVallue][1])){
				console.log("Amo is colliding with asteriod");
				output = true;
				//playing = false;
			}else{
				//console.log(PossiblePlaces[c]+" != "+point);
			}
		}
	}
	
	return output;
}	



//functions to use to generate list of points
function generateListofPointsOfCircle(cx,cy,r,veiwOutput,cw){
	//like the ploygon, this one generates a list of points that are on the circumfrence of  a circle with center (cx,cy) and radius r
	
	/*based of (x-a)^2 * (y-b)^2 = r^2
		rearranged gives y = b +or- sqrt(r^2 - (x-a)^2)
	
	*/
	//console.log("Starting circle stuff");
	var output = [];
	cw = 0.5*cw;	
	var cvx = cx - cw-1;
	var Div = 0.1;
	/*have cvx going between (cx - 1/2 * width) and (cx + 1/2 * width)*/
	while(cvx<(cx+1+cw)){

		var G = r*r - (cvx-cx)*(cvx-cx);
		var y = 0;
		//do this if, as the value of G must be positive;
		if(G>0 ||G==0){
			y = cy + Math.sqrt(G);
			f = [cvx,y];
			output.push(f);
			y = cy - Math.sqrt(G);
			f = [myRound(cvx,3),myRound(y,3)];
			output.push(f);
		}
		cvx = cvx + Div;
	//	console.log("Still circule stuff\n\ncvx = " + cvx + "\nand div = " + div);
	}
	if(veiwOutput==true && false == true){
		for(var c=0;c<output.length;c++){
			console.log(myRound(output[c][0],3)+", "+myRound(output[c][1],3));
		}	
	}
	return output;
}

function generateListofPointsOfPolygon(ListOfPoints){
	/*
		ListOfPoints is an array of coordinates that are in a clockwise direction of the shape
		This function draws a invisivable line between the points then calculates  every coordinate point along the line, 
			usally at every 0.1 interval
		
		The produced output can then be used to find if two shapes are colliding, as they would have the same corrdinates at some point
		
	*/
	var LOP = ListOfPoints;
	var LOPlen = LOP.length; 
	var output = [];
	 
	var m = 0;
	var a = 0;
	var b = 0;
	var dx= 0;
	var y = 0;	
	var f = [0,0];
	var s = 0;//the second a value
	var x = 0;
	var xs = [];
	
	
	if(LOPlen < 3){
		//error
	}else{
		for(var c = 0;c<LOPlen-1;c++){
			a = LOP[c][0];
			b = LOP[c][1];
			s = LOP[c+1][0];
			m = (b-LOP[c+1][1])/(a-s);
			//now have equation, y = m(x-a)+b
			//console.log(" a = " + a + "\nb = "+b+"\ns = " + s+"\nand m = "+m);		
			/*
				Need to complete for when m = undefind and perhaps when m = 0
					undefind = striaght line where x = a specfiic single value
						equation would give no results
						the while loop would also not work, as it relise on there being a differnece in the x values
					0 -> the equation would give correct results
			
			*/
			div = 0.1;
			if(m==undefined){
				//console.log("M is undefined");
		//		b  and  LOP[c+1][1]
				if(b < LOP[c+1][1]){
					//for each y value from b to LOP[c+1][1], 
					y = b;
					while(y<LOP[c+1][1]){
						f = [a,y];
						output.push(f);
						y = y + div;
					}					
				}else{
					//for each y value from LOP[c+1][1] to b, 
					y = LOP[c+1][1];
					while(y<b){
						f = [a,y];
						output.push(f);
						y = y + div;
					}
				}
			}else{
				if(a<s){
					x=a;
					while(x<s){
						y = m*(x-a)+b;
					//	console.log("Generating Y for X = " + x);
						f = [x,y];
						output.push(f);	
						x = x+div;					
					}
				}else{
					x=s;
					while(x<s){
						y = m*(x-a)+b;
					//	console.log("Generating Y for X = " + x);
						f = [x,y];
						x = x+div;
						output.push(f);				
					}
				}
			}
		}
		//the final slot
			a = LOP[LOPlen-1][0];
			b = LOP[LOPlen-1][1];
			s = LOP[0][0];
			m = (b-LOP[0][1])/(a-s);
			//console.log("Final a = " + a + "\nb = "+b+"\ns = " + s+"\nand m = "+m);
			//now have equation, y = m(x-a)+b		
			div = 0.1;
			
			if(m==undefined){
				//console.log("M is undefined");
		//		b  and  LOP[0][1]
				if(b < LOP[0][1]){
					//for each y value from b to LOP[0][1], 
					y = b;
					while(y<LOP[0][1]){
						f = [a,y];
						output.push(f);
						y = y + div;
					}					
				}else{
					//for each y value from LOP[0][1] to b, 
					y = LOP[0][1];
					while(y<b){
						f = [a,y];
						output.push(f);
						y = y + div;
					}
				}
			}else{			
				if(a<s){
					x=a;
					while(x<s){
						y = m*(x-a)+b;
					//	console.log("Generating Y for X = " + x);
						f = [x,y];
						output.push(f);	
						x = x+div;					
					}
				}else{
					x=s;
					while(x<s){
						y = m*(x-a)+b;
					//	console.log("Generating Y for X = " + x);
						f = [x,y];
						x = x+div;
						output.push(f);				
					}
				}
			}
	}	
/*	console.log("\nOutput;\n");	
	for(var c=0;c<output.length;c++){
		console.log(output[c][0]+", "+output[c][1]);
	}

	//console.log("\nNow for the rounded Output;\n");	
	for(var c=0;c<output.length;c++){
		console.log(myRound(output[c][0],3)+", "+myRound(output[c][1],3));
	}*/
	return output;
}

function generateShipPoints(){
	var SW = playerWidth;
	var SH = playerHieght;
	var SX = playerX;
	var SY = playerY;


	var SHIPA = [];{
	/*For the fighter 1bj.jpg file, these are the percentages that each corner is at
		in SW and SH put in the relative width nd ehight and then this array should be a 
		list of thier positions
	*/
		SHIPA[0] =  [-0.5*SX+SW*(50/100),	-0.5*SY+SH*(95/100)];
		SHIPA[1] =  [-0.5*SX+SW*(58.3/100),	-0.5*SY+SH*(80/100)];
		SHIPA[2] =  [-0.5*SX+SW*(58.3/100),	-0.5*SY+SH*(47/100)];
		SHIPA[3] =  [-0.5*SX+SW*(68/100),	-0.5*SY+SH*(47/100)];
		SHIPA[4] =  [-0.5*SX+SW*(68/100),	-0.5*SY+SH*(41/100)];
		SHIPA[5] =  [-0.5*SX+SW*(87/100),	-0.5*SY+SH*(41/100)];
		SHIPA[6] =  [-0.5*SX+SW*(87/100),	-0.5*SY+SH*(55/100)];
		SHIPA[7] =  [-0.5*SX+SW*(89/100),	-0.5*SY+SH*(55/100)];
		SHIPA[8] =  [-0.5*SX+SW*(89/100),	-0.5*SY+SH*(80/100)];
		SHIPA[9] =  [-0.5*SX+SW*(93/100),	-0.5*SY+SH*(80/100)];
		SHIPA[10] = [-0.5*SX+SW*(93/100),	-0.5*SY+SH*(55/100)];
		SHIPA[11] = [-0.5*SX+SW*(95/100),	-0.5*SY+SH*(55/100)];
		SHIPA[12] = [-0.5*SX+SW*(95/100),	-0.5*SY+SH*(16.3/100)];
		SHIPA[13] = [-0.5*SX+SW*(87/100),	-0.5*SY+SH*(16.3/100)];
		SHIPA[14] = [-0.5*SX+SW*(87/100),	-0.5*SY+SH*(22/100)];
		SHIPA[15] = [-0.5*SX+SW*(68/100),	-0.5*SY+SH*(16.3/100)];
		SHIPA[16] = [-0.5*SX+SW*(68/100),	-0.5*SY+SH*(5/100)];
		SHIPA[17] = [-0.5*SX+SW*(58.3/100),	-0.5*SY+SH*(5/100)];
		SHIPA[18] = [-0.5*SX+SW*(58.3/100),	-0.5*SY+SH*(16/100)];
		SHIPA[19] = [-0.5*SX+SW*(50/100),	-0.5*SY+SH*(9.4/100)];
		SHIPA[20] = [-0.5*SX+SW*(41.7/100),	-0.5*SY+SH*(16/100)];
		SHIPA[21] = [-0.5*SX+SW*(41.7/100),	-0.5*SY+SH*(5/100)];
		SHIPA[22] = [-0.5*SX+SW*(32/100),	-0.5*SY+SH*(5/100)];
		SHIPA[23] = [-0.5*SX+SW*(32/100),	-0.5*SY+SH*(16.3/100)];
		SHIPA[24] = [-0.5*SX+SW*(13/100),	-0.5*SY+SH*(22/100)];
		SHIPA[25] = [-0.5*SX+SW*(13/100),	-0.5*SY+SH*(16.3/100)];
		SHIPA[26] = [-0.5*SX+SW*(5/100),	-0.5*SY+SH*(16.3/100)];
		SHIPA[27] = [-0.5*SX+SW*(5/100),	-0.5*SY+SH*(55/100)];
		SHIPA[28] = [-0.5*SX+SW*(7/100),	-0.5*SY+SH*(55/100)];
		SHIPA[29] = [-0.5*SX+SW*(7/100),	-0.5*SY+SH*(80/100)];
		SHIPA[30] = [-0.5*SX+SW*(11/100),	-0.5*SY+SH*(80/100)];
		SHIPA[31] = [-0.5*SX+SW*(11/100),	-0.5*SY+SH*(55/100)];
		SHIPA[32] = [-0.5*SX+SW*(13/100),	-0.5*SY+SH*(55/100)];
		SHIPA[33] = [-0.5*SX+SW*(13/100),	-0.5*SY+SH*(41/100)];
		SHIPA[34] = [-0.5*SX+SW*(32/100),	-0.5*SY+SH*(41/100)];
		SHIPA[35] = [-0.5*SX+SW*(32/100),	-0.5*SY+SH*(47/100)];
		SHIPA[36] = [-0.5*SX+SW*(41.7/100),	-0.5*SY+SH*(47/100)];
		SHIPA[37] = [-0.5*SX+SW*(41.7/100),	-0.5*SY+SH*(80/100)];
	}	
	
	return generateListofPointsOfPolygon(SHIPA);
}






