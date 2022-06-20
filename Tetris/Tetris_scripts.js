/*
	E R R O R S 
	
	somethimes you die when you should not....
	
	you can die if you attempt to rotate when you would collide with the already there 
	
	however, could work on end of game identification

*/


/*Plotting functions*/{
function unplotObject(){
	for(var C = 1; C<object.length; C++){
		
		if(object[C][0] != -1 && object[C][1] != -1){
			unplot(object[C][0],object[C][1]);
			containers[object[C][1]][object[C][0]-1] = "0";	
		}else{
			console.log(object[C][0] + ", " + object[C][1] + " does not exist\nPlease give me numbers between 1 and " + GameHieght + " for Y positions and between 1 and " + GameWidth + " for X positions" );
		}			
	}
}

function unplot(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("empty");
}

function plotO1(x,y){
	if(x==-1){
		DIE();
	}else{
		var id = CreateID(x,y);
		document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
		"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
		"object_7_static");
		document.getElementById(id).classList.add("object_1_move");
	}
}
function plotO2(x,y){
	if(x==-1){
		DIE();
	}else{
		var id = CreateID(x,y);
		document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
		"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
		"object_7_static");
		document.getElementById(id).classList.add("object_2_move");
	}
}
function plotO3(x,y){
	if(x==-1){
		DIE();
	}else{	
		var id = CreateID(x,y);
		document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
		"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
		"object_7_static");
		document.getElementById(id).classList.add("object_3_move");
	}
}
function plotO4(x,y){
	if(x==-1){
		DIE();
	}else{
		var id = CreateID(x,y);
		document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
		"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
		"object_7_static");
		document.getElementById(id).classList.add("object_4_move");
	}
}
function plotO5(x,y){
	if(x==-1){
		DIE();
	}else{	
		var id = CreateID(x,y);
		document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
		"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
		"object_7_static");
		document.getElementById(id).classList.add("object_5_move");
	}
}
function plotO6(x,y){
	if(x==-1){
		DIE();
	}else{	
		var id = CreateID(x,y);
		document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
		"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
		"object_7_static");
		document.getElementById(id).classList.add("object_6_move");
	}
}
function checkHeight(){}
function plotO7(x,y){
	if(x==-1){
		DIE();
	}else{	
		var id = CreateID(x,y);
		document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
		"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
		"object_7_static");
		document.getElementById(id).classList.add("object_7_move");
	}
}

function plotS1(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("object_1_static");
}
function plotS2(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("object_2_static");
}
function plotS3(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("object_3_static");
}
function plotS4(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("object_4_static");
}
function plotS5(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("object_5_static");
}
function plotS6(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("object_6_static");
}
function plotS7(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty","object_1_move","object_2_move","object_3_move","object_4_move","object_5_move",
	"object_6_move","object_7_move","object_1_static","object_2_static","object_3_static","object_4_static","object_5_static","object_6_static",
	"object_7_static");
	document.getElementById(id).classList.add("object_7_static");
}

function plot(x,y){
	var id = CreateID(x,y);
	document.getElementById(id).classList.remove("filled","empty");
	document.getElementById(id).classList.add("filled");
}

function CreateID(x,y){
	var ID = "btn";
	ID = ID.concat(y);
	ID = ID.concat("_");
	ID = ID.concat(x);

return ID;
}

}

function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	console.log("### " + x + " key pressed ###");
	/*
		*** KEYS USED ***	
	*/
	
	
	if(x=="ArrowDown"){
		//move down
		if(keepPlaying == true){
			score = score + 1;
			down();
		}
	}else if(x=="ArrowLeft"){
		//move left
		if(keepPlaying == true){
			left();
		}		
	}else if(x=="ArrowRight"){
		//move right
		if(keepPlaying == true){
			right();			
		}		
	}else if(x=="ArrowUp"){
		//move up or rotate
		if(admin == true){
			up();
		}else{
			if(keepPlaying == true){
				rotateObjectClockwise();			
			}		
		}
	}else if(x=="~" ||  x=="#"){
		DIE();
	}else if(x=="z" ||  x=="Z"){
		//rotate anti-clockwise
		rotateObjectAntiClockwise();		
			
	}else if(x=="x" || x=="X"){
		//rotate clockwise
		rotateObjectClockwise();	
	
	}else if(x=="p" ||  x=="P"){
		//rotate anti-clockwise
		if(admin == true){
			printToBack();
		}else{

		}	
		
	}else if(admin == true){
		if(x=="e"||x=="E"){		
			//Clear Everything
			loadEmptyBoard();	

		}else if(x=="l"||x=="L"){		
			//Clear Everything
			loadContainers();
			
		}else if(x=="B"||x=="b"){		
			deleteRow();
			
		}else if(x=="Q"||x=="q"){	
			//display the contents of the containres record
			var output = "Containers is\n";
			for(var C= 1;C<GameHieght+1;C++){
				output = output.concat(containers[C][0] + " " +containers[C][1] + " " +containers[C][2] + " " + containers[C][3] + " " 
				 + containers[C][4] + " " + containers[C][5] + " " +containers[C][6] + " " +containers[C][7] + "\n");
			}
			
			console.log(output);

		}else if(x=="o"||x=="O"){		
			//Show the objects stuff
			console.log("O B J E C T   S T A T S\n\nObject Number: " + objectNo[0] + "\nObject Angle: " + objectNo[1] + "\n\nObject Positions;  \n--> " + object[1][0] + ", " + object[1][1] +  "\n--> " + object[2][0] + ", " + object[2][1] +   "\n--> " + object[3][0] + ", " + object[3][1] + "\n--> " + object[4][0] + ", " + object[4][1]);                 
			
		}else if(x=="1"){
			objectNo[0] = 1;
			whichShape();
			
		}else if(x=="2"){
			objectNo[0] = 2;
			whichShape();
			
		}else if(x=="3"){	
			objectNo[0] = 3;
			whichShape();
			
		}else if(x=="4"){	
			objectNo[0] = 4;
			whichShape();
			
		}else if(x=="5"){	
			objectNo[0] = 5;
			whichShape();
			
		}else if(x=="6"){	
			objectNo[0] = 6;
			whichShape();

		}else if(x=="7"){	
			objectNo[0] = 7;
			whichShape();
			
		}
	}
}

var GameHieght = 23;
var GameWidth = 8;
var PX = 4;
var PY = 4;
var score = 0;
var admin = false;
var keepPlaying = false;
var waitTime = 650;
var objectNo = [3,0];
var object = [];

/*For Audio functions*/{
function switchSound(n){
	if(n>-0.00000001 && n<audioList.length){
		document.getElementById("audio_1").src  = audioList[n][0];
	}else{
		console.log("Container " + n + " does not exist");
	}
}
var audioList = [];
	//in form of Src,   duration
audioList[0] = ["../Z_Audio/tetris_die.mp3",0.5];
audioList[1] = ["../Z_Audio/Tetris_item_placed_b.mp3",0.75];

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

	
}


/*	coordinates of the objects location
	Position 1 MUST be the center point											
*/
	object[1] = [4,4];//centerPoint
	object[2] = [3,4];
	object[3] = [4,3];
	object[4] = [5,4];
//			     x y    
var containers = [];
{
	// 8x20
	containers[1] =  [0,0,0,0,0,0,0,0];
	containers[2] =  [0,0,0,0,0,0,0,0];
	containers[3] =  [0,0,0,0,0,0,0,0];
	containers[4] =  [0,0,0,0,0,0,0,0];
	containers[5] =  [0,0,0,0,0,0,0,0];
	containers[6] =  [0,0,0,0,0,0,0,0];
	containers[7] =  [0,0,0,0,0,0,0,0];
	containers[8] =  [0,0,0,0,0,0,0,0];
	containers[9] =  [0,0,0,0,0,0,0,0];
	containers[10] = [0,0,0,0,0,0,0,0];
	containers[11] = [0,0,0,0,0,0,0,0];
	containers[12] = [0,0,0,0,0,0,0,0];
	containers[13] = [0,0,0,0,0,0,0,0];
	containers[14] = [0,0,0,0,0,0,0,0];
	containers[15] = [0,0,0,0,0,0,0,0];
	containers[16] = [0,0,0,0,0,0,0,0];
	containers[17] = [0,0,0,0,0,0,0,0];
	containers[18] = [0,0,0,0,0,0,0,0];
	containers[19] = [0,0,0,0,0,0,0,0];
	containers[20] = [0,0,0,0,0,0,0,0];
	containers[21] = [0,0,0,0,0,0,0,0];
	containers[22] = [0,0,0,0,0,0,0,0];
	containers[23] = [0,0,0,0,0,0,0,0];
/*

0 = empty empty (nothing at all here)
A_ = part of the main block at bottom
B_ = part of object

_ is where a number goes, representing the colour of the object 


*/
}

function setAllDefault(){
	GameHieght = 23;
	GameWidth = 8;
	PX = 4;
	PY = 4;
	score = 0;
	admin = false;
	keepPlaying = false;
	waitTime = 650;
	objectNo = [3,0];
	object = [];

	object[1] = [4,4];//centerPoint
	object[2] = [3,4];
	object[3] = [4,3];
	object[4] = [5,4];

	var containers = [];
	{
		// 8x23
		containers[1] =  [0,0,0,0,0,0,0,0];
		containers[2] =  [0,0,0,0,0,0,0,0];
		containers[3] =  [0,0,0,0,0,0,0,0];
		containers[4] =  [0,0,0,0,0,0,0,0];
		containers[5] =  [0,0,0,0,0,0,0,0];
		containers[6] =  [0,0,0,0,0,0,0,0];
		containers[7] =  [0,0,0,0,0,0,0,0];
		containers[8] =  [0,0,0,0,0,0,0,0];
		containers[9] =  [0,0,0,0,0,0,0,0];
		containers[10] = [0,0,0,0,0,0,0,0];
		containers[11] = [0,0,0,0,0,0,0,0];
		containers[12] = [0,0,0,0,0,0,0,0];
		containers[13] = [0,0,0,0,0,0,0,0];
		containers[14] = [0,0,0,0,0,0,0,0];
		containers[15] = [0,0,0,0,0,0,0,0];
		containers[16] = [0,0,0,0,0,0,0,0];
		containers[17] = [0,0,0,0,0,0,0,0];
		containers[18] = [0,0,0,0,0,0,0,0];
		containers[19] = [0,0,0,0,0,0,0,0];
		containers[20] = [0,0,0,0,0,0,0,0];
		containers[21] = [0,0,0,0,0,0,0,0];
		containers[22] = [0,0,0,0,0,0,0,0];
		containers[23] = [0,0,0,0,0,0,0,0];

	}

	
	
}


function userCreateObject(){
	var CenterX = prompt("Enter the Center X position");
	var CenterY = prompt("Enter the Center Y position");
	var NO 		= prompt("Enter Object Number");
	var angle	= prompt("Enter the angle it is at");
	console.log("Generating Object Number" + NO + "at (" + CenterX + "," + CenterY + ") with and angle of " + angle);
	generateObject(NO,angle,CenterX,CenterY);
	
}

function plotObject(ObjectNo,Direction){
	//test to see if each cube can  move in that direction, not the object
	if(keepPlaying == true){
		if(ObjectNo == undefined){
			ObjectNo = 0;
		}
		var canPass = true;
		
		/*
		for each item in the array, ensure that all teh obejcts can move in teh speifide direction
			
		*/	
			
		unplotObject();
		if(Direction == "up"){
			for(var counter = 1; counter < object.length; counter++){
				if(object[counter][1] - 1 < 1 							|| singularWICWB(object[counter][0],object[counter][1] - 1) == false){           
					canPass = false;                                                                                               
				}                                                                                                                  
			}	                                                                                                                   
																																   
		}else if(Direction == "down"){                                                                                             
			for(var counter = 1; counter < object.length; counter++){                                                              
				if(object[counter][1] + 1 > GameHieght 					|| singularWICWB(object[counter][0],object[counter][1] + 1) == false){  
					canPass = false;                                                                                               
				}                                                                                                                  
			}		                                     		                                                                   
																																   
		}else if(Direction == "left"){                                                                                             
			for(var counter = 1; counter < object.length; counter++){                                                              
				if(object[counter][0] - 1 < 1 							|| singularWICWB(object[counter][0] - 1,object[counter][1]) == false){           
					canPass = false;                                                                                               
				}                                                                                                                  
			}		                                                                                                               
		}else if(Direction == "right"){                                                                                            
			for(var counter = 1; counter < object.length; counter++){                                                              
				if(object[counter][0] + 1 > GameWidth 					|| singularWICWB(object[counter][0] + 1,object[counter][1]) == false){
					canPass = false;
				}
			}		
		}
		
		if(canPass == true){
			
			for(var counter = 1; counter < object.length; counter++){
				
				if(Direction == "up"){
					object[counter][1] = object[counter][1] - 1;
					containers[object[counter][1]][object[counter][0]-1] = "B".concat(ObjectNo[0]);
					
				}else if(Direction == "down"){
					object[counter][1] = object[counter][1] + 1;
					containers[object[counter][1]][object[counter][0]-1] = "B".concat(ObjectNo[0]);
					
				}else if(Direction == "left"){
					object[counter][0] = object[counter][0] - 1;
					containers[object[counter][1]][object[counter][0]-1] = "B".concat(ObjectNo[0]);
					
				}else if(Direction == "right"){
					object[counter][0] = object[counter][0] + 1;	
					containers[object[counter][1]][object[counter][0]-1] = "B".concat(ObjectNo[0]);
				}

			}
		}

		for(var C = 1; C<object.length; C++){
			if(objectNo[0] == 1){
				plotO1(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B1";
				
			}else if(objectNo[0] == 2){
				plotO2(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B2";	
				
			}else if(objectNo[0] == 3){
				plotO3(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B3";
				
			}else if(objectNo[0] == 4){
				plotO4(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B4";
				
			}else if(objectNo[0] == 5){
				plotO5(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B5";
				
			}else if(objectNo[0] == 6){
				plotO6(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B6";
				
			}else if(objectNo[0] == 7){
				plotO7(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B7";			
			}
		}
	}
}

function printToBack(){
	console.log("Printing Object to back");
	/*Get the current object to become part of the back board*/

	var xx = 0;
	var yy= 0;
	
	for(var c = 1;c<object.length;c++){
		xx = object[c][0];
		yy = object[c][1];
		
		unplot(xx,yy);
		
		object[c][0] = -1;
		object[c][1] = -1;
		
		containers[yy][xx-1] = "A".concat(parseInt(objectNo[0]));
	}
	console.log("Loading new containers");
	loadContainers();
	
	console.log("Going to generate new object");
	//may pick new object number here  --also change coordinates to correct place one day
	generateObject(pickRandomObjectNo(),0,4,3);
	whichShape();
	
}

function pickRandomObjectNo(){
	//use this function to pick a new random shape number
	let NoShapes = 7;//7 + 1
	
	R = Math.floor(Math.random() * NoShapes)+1;
	while(previousShape[0] == R && previousShape[1] == R &&previousShape[2] == R ){
		R = Math.floor(Math.random() * NoShapes)+1;
	}
	if(previousShape.length>3){
		//move every item up one
		for(var c = 0;c<previousShape.length-1;c++){
			previousShape[c] = previousShape[c+1];	
		}
		//remove final slot
		previousShape.pop();	
	}
	previousShape.push(R);
	return R;
}

var previousShape = [];

function generateObject(No,Angle,atX,atY){
	object[1][0] = atX;
	object[1][1] = atY;
	objectNo[0] = No;
	objectNo[1] = Angle;
	
	console.log("Creating new object with number " + No + " \nand angle of " + Angle + "\nand being spwaned at " + atX + "," + atY);
	becomeShapeNo();
}

function loadContainers(){
	console.log("Loading Containers");
	for(var Y =1;Y<GameHieght+1;Y++){
		for(var X = 1;X<GameWidth+1;X++){
			var containerValue = containers[Y][X-1];
			
			if(containerValue == "A1"){
				plotS1(X,Y);
			}else if(containerValue == "A2"){
				plotS2(X,Y);
			}else if(containerValue == "A3"){
				plotS3(X,Y);
			}else if(containerValue == "A4"){
				plotS4(X,Y);
			}else if(containerValue == "A5"){
				plotS5(X,Y);
			}else if(containerValue == "A6"){
				plotS6(X,Y);
			}else if(containerValue == "A7"){
				plotS7(X,Y);
				
			}else if(containerValue == "0" || containerValue == 0){
				unplot(X,Y);
				
			}else if(containerValue == "B1"){
				plotO1(X,Y);
			}else if(containerValue == "B2"){
				plotO2(X,Y);				
			}else if(containerValue == "B3"){
				plotO3(X,Y);				
			}else if(containerValue == "B4"){
				plotO4(X,Y);				
			}else if(containerValue == "B5"){
				plotO5(X,Y);				
			}else if(containerValue == "B6"){
				plotO6(X,Y);				
			}else if(containerValue == "B7"){
				plotO7(X,Y);			
			}
			
		}
	}
}

function loadEmptyBoard(){
	console.log("Clearing board");
	for(var Y =1;Y<GameHieght+1;Y++){
		for(var X = 1;X<GameWidth+1;X++){
			unplot(X,Y);			
		}
	}
}

function rotateObjectClockwise(){
	console.log("Rotating object Clockwise");
	objectNo[1] = objectNo[1] + 90;
	//put validation around here
	if(objectNo[1] > 350){
		objectNo[1] = 0;
	}
	//unplotObject();
	console.log("New Angle is " + objectNo[1]);
	whichShape();
}

function rotateObjectAntiClockwise(){
	objectNo[1] = objectNo[1] - 90;
	//put validation around here
	if(objectNo[1] < -1){
		objectNo[1] = 270;
	}
	//unplotObject();
	whichShape();
	console.log("New Angle is " + objectNo[1]);
}

function becomeShapeNo(NO){
	//need validation for changing shape here
	
	if(NO == 1){
		objectNo[1][0] = NO;
		if(objectNo[1] == 0){
			switchtoShape(100);
			
		}else if(objectNo[1] == 90){
			switchtoShape(109);
			
		}else if(objectNo[1] == 180){
			switchtoShape(118);
			
		}else if(objectNo[1] == 270){
			switchtoShape(127);
			
		}
	}else if(NO == 2){
		objectNo[1][0] = NO;		
		if(objectNo[1] == 0){
			switchtoShape(200);
			
		}else if(objectNo[1] == 90){
			switchtoShape(209);
			
		}else if(objectNo[1] == 180){
			switchtoShape(218);
			
		}else if(objectNo[1] == 270){
			switchtoShape(227);
			
		}		
	}else if(NO == 3){
		objectNo[1][0] = NO;		
		if(objectNo[1] == 0){
			switchtoShape(300);
			
		}else if(objectNo[1] == 90){
			switchtoShape(309);
			
		}else if(objectNo[1] == 180){
			switchtoShape(318);
			
		}else if(objectNo[1] == 270){
			switchtoShape(327);
			
		}	
	}else if(NO == 4){
		objectNo[1][0] = NO;		
		if(objectNo[1] == 0){
			switchtoShape(400);
			
		}else if(objectNo[1] == 90){
			switchtoShape(409);
			
		}else if(objectNo[1] == 180){
			switchtoShape(418);
			
		}else if(objectNo[1] == 270){
			switchtoShape(427);
			
		}	
	}else if(NO == 5){
		objectNo[1][0] = NO;		
		if(objectNo[1] == 0){
			switchtoShape(500);
			
		}else if(objectNo[1] == 90){
			switchtoShape(509);
			
		}else if(objectNo[1] == 180){
			switchtoShape(518);
			
		}else if(objectNo[1] == 270){
			switchtoShape(527);
			
		}	
	}else if(NO == 6){
		objectNo[1][0] = NO;		
		if(objectNo[1] == 0){
			switchtoShape(600);
			
		}else if(objectNo[1] == 90){
			switchtoShape(609);
			
		}else if(objectNo[1] == 180){
			switchtoShape(618);
			
		}else if(objectNo[1] == 270){
			switchtoShape(627);
			
		}	
	}else if(NO == 7){
		objectNo[1][0] = NO;		
		if(objectNo[1] == 0){
			switchtoShape(700);
			
		}else if(objectNo[1] == 90){
			switchtoShape(709);
			
		}else if(objectNo[1] == 180){
			switchtoShape(718);
			
		}else if(objectNo[1] == 270){
			switchtoShape(727);
			
		}	
	}
	
}

function whichShape(){
	//need validation for changing shape here
	unplotObject(); 
	console.log("Which shape is needed today?");
	if(objectNo[0] == 1){
		if(objectNo[1] == 0){
			switchtoShape(100);
			
		}else if(objectNo[1] == 90){
			switchtoShape(109);
			
		}else if(objectNo[1] == 180){
			switchtoShape(118);
			
		}else if(objectNo[1] == 270){
			switchtoShape(127);
		}else{
			console.log("Else on Line 643");
		}
	}else if(objectNo[0] == 2){
		if(objectNo[1] == 0){
			switchtoShape(200);
			
		}else if(objectNo[1] == 90){
			switchtoShape(209);
			
		}else if(objectNo[1] == 180){
			switchtoShape(218);
			
		}else if(objectNo[1] == 270){
			switchtoShape(227);
			
		}else{
			console.log("Else on Line 659");
		}
	}else if(objectNo[0] == 3){
		if(objectNo[1] == 0){
			switchtoShape(300);
			
		}else if(objectNo[1] == 90){
			switchtoShape(309);
			
		}else if(objectNo[1] == 180){
			switchtoShape(318);
			
		}else if(objectNo[1] == 270){
			switchtoShape(327);
			
		}else{
			console.log("Else on Line 675");
		}	
	}else if(objectNo[0] == 4){
		if(objectNo[1] == 0){
			switchtoShape(400);
			
		}else if(objectNo[1] == 90){
			switchtoShape(409);
			
		}else if(objectNo[1] == 180){
			switchtoShape(418);
			
		}else if(objectNo[1] == 270){
			switchtoShape(427);
			
		}else{
			console.log("Else on Line 691");
		}
	}else if(objectNo[0] == 5){
		if(objectNo[1] == 0){
			switchtoShape(500);
			
		}else if(objectNo[1] == 90){
			switchtoShape(509);
			
		}else if(objectNo[1] == 180){
			switchtoShape(518);
			
		}else if(objectNo[1] == 270){
			switchtoShape(527);
			
		}else{
			console.log("Else on Line 707");
		}
	}else if(objectNo[0] == 6){
		if(objectNo[1] == 0){
			switchtoShape(600);
			
		}else if(objectNo[1] == 90){
			switchtoShape(609);
			
		}else if(objectNo[1] == 180){
			switchtoShape(618);
			
		}else if(objectNo[1] == 270){
			switchtoShape(627);
			
		}else{
			console.log("Else on Line 723");
		}
	}else if(objectNo[0] == 7){
		if(objectNo[1] == 0){
			switchtoShape(700);
			
		}else if(objectNo[1] == 90){
			switchtoShape(709);
			
		}else if(objectNo[1] == 180){
			switchtoShape(718);
			
		}else if(objectNo[1] == 270){
			switchtoShape(727);
			
		}else{
			console.log("Else on Line 739");
		}
	}else{
			console.log("Else on Line 742");
	}
	
}

function switchtoShape(shapeNo){
	
	//put validation here?
	
	//unplotObject();  //-may need to uncomment this one.... ######
	
	var CPX = object[1][0];//get center point (x and y)
	var CPY = object[1][1];
	console.log("Switching to shape...");
	
	if(shapeNo == 100){
/*
		@
		@ @* @
*/		if(CPX-1 > 0 && CPY-1 > 0 && CPY < GameHieght && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX-1,CPY-1,CPX+1,CPY) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX-1,CPY-1];
			object[4] = [CPX+1,CPY];
		}

	}else if(shapeNo == 109){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX,CPY+1,CPX,CPY-1,CPX+1,CPY-1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX,CPY+1];
			object[3] = [CPX,CPY-1];
			object[4] = [CPX+1,CPY-1];	
		}
	}else if(shapeNo == 118){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX+1,CPY,CPX+1,CPY+1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX+1,CPY];
			object[4] = [CPX+1,CPY+1];		
		}
	}else if(shapeNo == 127){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX,CPY-1,CPX,CPY+1,CPX-1,CPY+1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX,CPY-1];
			object[3] = [CPX,CPY+1];
			object[4] = [CPX-1,CPY+1];	
		}
//shape 2
	}else if(shapeNo == 200){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX+1,CPY,CPX+1,CPY-1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX+1,CPY];
			object[4] = [CPX+1,CPY-1];	
		}
	}else if(shapeNo == 209){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX,CPY-1,CPX,CPY+1,CPX+1,CPY+1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX,CPY-1];
			object[3] = [CPX,CPY+1];
			object[4] = [CPX+1,CPY+1];	
		}
	}else if(shapeNo == 218){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX-1,CPY+1,CPX+1,CPY) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX-1,CPY+1];
			object[4] = [CPX+1,CPY];	
		}
	}else if(shapeNo == 227){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY-1,CPX,CPY-1,CPX,CPY+1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY-1];
			object[3] = [CPX,CPY-1];
			object[4] = [CPX,CPY+1];	
		}
	//shape 3	
	}else if(shapeNo == 300){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX,CPY-1,CPX+1,CPY) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX,CPY-1];
			object[4] = [CPX+1,CPY];			
		}
	}else if(shapeNo == 309){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX+1,CPY,CPX,CPY-1,CPX,CPY+1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX+1,CPY];
			object[3] = [CPX,CPY-1];
			object[4] = [CPX,CPY+1];	
		}
	}else if(shapeNo == 318){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX+1,CPY,CPX,CPY+1) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX+1,CPY];
			object[4] = [CPX,CPY+1];	
		}
	}else if(shapeNo == 327){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX,CPY+1,CPX,CPY-1) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX,CPY+1];
			object[4] = [CPX,CPY-1];			
		}

//shapes 4 
	}else if(shapeNo == 400 || shapeNo == 418){
	//stage 1
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX+1,CPY-1,CPX,CPY-1) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX+1,CPY-1];
			object[4] = [CPX,CPY-1];
		}
	}else if(shapeNo == 409 || shapeNo == 427){
//stage 2
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX,CPY-1,CPX+1,CPY,CPX+1,CPY+1) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX,CPY-1];
			object[3] = [CPX+1,CPY];
			object[4] = [CPX+1,CPY+1];
		}

	}else if(3>6 ){
//stage 3
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX+1,CPY,CPX,CPY+1,CPX-1,CPY+1) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX+1,CPY];
			object[3] = [CPX,CPY+1];
			object[4] = [CPX-1,CPY+1];	
		}
		
	}else if( 3>7){
//stage 4
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX-1,CPY-1,CPX,CPY+1) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX-1,CPY-1];
			object[4] = [CPX,CPY+1];	
		}
		
		
//SHAPE 5
	}else if(shapeNo == 500 || shapeNo == 518){
	//stage 1
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX,CPY-1,CPX-1,CPY-1,CPX+1,CPY) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX,CPY-1];
			object[3] = [CPX-1,CPY-1];
			object[4] = [CPX+1,CPY];
		}
	}else if(shapeNo == 509 || shapeNo == 527){
//stage 2
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX+1,CPY,CPX+1,CPY-1,CPX,CPY+1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX+1,CPY];
			object[3] = [CPX+1,CPY-1];
			object[4] = [CPX,CPY+1];
		}

	}else if(2>3){
//stage 3
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX,CPY+1,CPX+1,CPY+1) == true ){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX,CPY+1];
			object[4] = [CPX+1,CPY+1];	
		}
		
	}else if(16<3){
//stage 4
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX-1,CPY+1,CPX,CPY-1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX-1,CPY+1];
			object[4] = [CPX,CPY-1];	
		}

		//issue here with function in if
//shape 6		
	}else if(shapeNo == 600 || shapeNo == 609 || shapeNo == 618 || shapeNo == 627){
		if(CPX-1 > 0 && CPY-1 >0 && CPY < GameHieght && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY, CPX-1,CPY, CPX-1,CPY+1, CPX,CPY+1) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX-1,CPY+1];
			object[4] = [CPX,CPY+1];
		}
		
//shape 7		-- needs special validation
	}else if(shapeNo == 700 || shapeNo == 718){
		if(CPX-1 > 0 && CPY-2 >0 && CPY < GameHieght  && CPX < GameWidth  && wouldItCollideWithBase(CPX,CPY,CPX,CPY+1,CPX,CPY-1,CPX,CPY-2) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX,CPY+1];
			object[3] = [CPX,CPY-1];
			object[4] = [CPX,CPY-2];
		}
	}else if(shapeNo == 709 || shapeNo == 727){
		if(CPX-2 > 0 && CPY-1 >0 && CPY < GameHieght  && CPX < GameWidth && wouldItCollideWithBase(CPX,CPY,CPX-1,CPY,CPX-2,CPY,CPX+1,CPY) == true){
			object[1] = [CPX,CPY];
			object[2] = [CPX-1,CPY];
			object[3] = [CPX-2,CPY];
			object[4] = [CPX+1,CPY];
		}
		
	}
	
	if(keepPlaying == true){
		for(var C = 1; C<object.length; C++){
			if(objectNo[0] == 1){
				plotO1(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B1";			
			}else if(objectNo[0] == 2){
				plotO2(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B2";			
			}else if(objectNo[0] == 3){
				plotO3(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B3";			
			}else if(objectNo[0] == 4){
				plotO4(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B4";			
			}else if(objectNo[0] == 5){
				plotO5(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B5";			
			}else if(objectNo[0] == 6){
				plotO6(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B6";			
			}else if(objectNo[0] == 7){
				plotO7(object[C][0],object[C][1]);
				containers[object[C][1]][object[C][0]-1] = "B7";			
			}
		}
	}else{
		
		
	}

}

function wouldItCollideWithBase(xA,yA,xB,yB,xC,yC,xD,yD){
	
	var canPass = true;
	
	var A = containers[yA][xA-1];
	var B = containers[yB][xB-1];
	var C = containers[yC][xC-1];
	var D = containers[yD][xD-1];
	
	let me = [A,B,C,D];
	let noGos = ["A1","A2","A3","A4","A5","A6","A7","A8"];
	
	for(var C = 0;C<me.length;C++){
		for(var c=0;c<noGos.length;c++){
			if(me[C] == noGos[c]){
				canPass = false;
			}
		}
	}
	if(canPass == true){
		console.log("You can pass");		
	}else{
		//this is where ther error is....
		
		/*
		DIE();
		console.log("Killing on line 1042\nCall the police!");
		*/
		
	}

	return canPass;
}

function singularWICWB(x,y){
	var canPass = true;
	let noGos = ["A1","A2","A3","A4","A5","A6","A7","A8"];	
	if(x>0){
		let me = containers[y][x-1];
	
		for(var c=0;c<noGos.length;c++){
			if(me == noGos[c]){
				canPass = false;
			}
		}	
	}else{
		canPass = false;
	}
	return canPass;
}

function moveBoardDown(Q){
	
	let As = ["B1","B2","B3","B4","B5","B6","B7","B8"];
	
	for(var cx = 0; cx < GameWidth; cx++){
		if(As.includes(containers[1][cx]) == true){

		}else{
			containers[1][cx] = containers[2][cx];
		}
	}
	
	for(var cy = Q-1; cy > 1; cy--){
		for(var cx = 0; cx < GameWidth; cx++){
			if(As.includes(containers[cy][cx]) == true){
				//containers[cy+1][cx] = 0;
			}else{
				containers[cy+1][cx] = containers[cy][cx];
			}
		}
	}
	plotObject(objectNo[0],objectNo[1]);
	loadContainers();
}

function deleteRow(Q){
	
	let As = ["A1","A2","A3","A4","A5","A6","A7","A8"];
	
	if(
		As.includes(containers[Q][0]) == true && As.includes(containers[Q][1]) == true && As.includes(containers[Q][2]) == true &&
		As.includes(containers[Q][3]) == true && As.includes(containers[Q][4]) == true && As.includes(containers[Q][5]) == true &&
		As.includes(containers[Q][6]) == true && As.includes(containers[Q][7]) == true
	){
		
		console.log("Deleting Bottom Row");
		moveBoardDown(Q);
		score = score + 10;
	}else{
		//console.log("Cannot delete the row " + Q);
	}
	
}

function shouldDie(){
	let As = ["A1","A2","A3","A4","A5","A6","A7","A8"];
	
	for(var N = 0; N < GameWidth; N++){
		if(As.includes(containers[3][N]) == true){
			DIE();
		}
	}
	
}

function DIE(){
	console.log("You Died\n\n");
	other();
	keepPlaying = false;
	playSound(0);
	setTimeout(clearAll,4000)
}

function onEachTick(){
	console.log("\nTick");
	
	detectWhenPrint();	
	for(var C = 2;C<GameHieght+1;C++){
		deleteRow(C);
	}
	other();
	shouldDie();
	updateDisplay();	

	if(keepPlaying == true){
		down();	
		setTimeout(onEachTick,waitTime);
	}	
}

function updateDisplay(){
	
	document.getElementById("Score").innerHTML = score;
	document.getElementById("HScore").innerHTML = localStorage.getItem("TetrisHighscore");
	
}

function other(){
	let H = localStorage.getItem("TetrisHighscore");
	if(score > H){
		localStorage.setItem("TetrisHighscore",score);
	}else if(H == undefined){
		localStorage.setItem("TetrisHighscore",0);
	}

}

function onStart(){
	clearAll();
	if(keepPlaying == false){
		
		loadEmptyBoard();
		score = 0;
		keepPlaying = true;
		waitTime = 650;
		onEachTick();
	}/*else{ it must already be going*/
}

function detectWhenPrint(){
	for(var counter = 1; counter < object.length; counter++){                                                              
		if(object[counter][1] + 1 > GameHieght 					|| singularWICWB(object[counter][0],object[counter][1] + 1) == false && keepPlaying == true){ 
			printToBack(); 
		}
	}
	
}

function clearAll(){
	
	if(keepPlaying == false){
		loadEmptyBoard();
		for(var EY = 1; EY < GameHieght+1;EY++){
			for(var EX = 0; EX < GameWidth; EX++){
				containers[EY][EX] = 0;
			}
		}
		
		objectNo[0] = 3;
		objectNo[1] = 0;
		unplotObject();
		setAllDefault();
	}

}


//these functions are actually needed.... but could be consensed?.....
function left(){
	plotObject(1,"left");
	playSound(1);
	console.log("Object Left");	
	}
function right(){
	plotObject(1,"right");
	playSound(1);
	console.log("Object Right");
	}
function up(){
	plotObject(1,"up");    
	score = score - 1;
	console.log("Object Up");	
	}
function down(){
	if(keepPlaying == true){
		plotObject(1,"down"); 
		console.log("Object Down");
	}
}

function whatsAt(x,y){	
	if(y > 0 && y < GameHieght && x > 0 && x < GameWidth){
		console.log("What`s at (" + x + "," + y + ")?,\nWell, its " + containers[y][x-1]);
		return containers[y][x-1];		
	}else{
		console.log("What`s at (" + x + "," + y + ")?,\nWell, its a Wall...?");		
		return "wall";
	}
}





/* -- -- For Adverts  -- --*/
var fadeInterval = 100;
var showingAdvert = false;
var advertShowTime = 15000;
var numberOfAds = 5;//to remove Thomas`s advert, set the 5 to 4
var lastAdNo = 0;

function adLoader(){
	document.getElementById("audio_1").controls =false;//it is here, even though it is not related because this function workes when teh page loads, And i dont want the audio to be present whenver you veiw the page
	setTimeout(AdsAGo,10000);//so that the adverts are not there when the screen is first loaded
}

function AdsAGo(){
	
	if(showingAdvert==false){
		//pick a new advert
		var R = Math.floor(Math.random() * numberOfAds)+1;
		while(R == lastAdNo){
			R = Math.floor(Math.random() * numberOfAds)+1;
		}
		ShowAd(R);//to show a specific advert, change R to the specifide Ad number / ID
		lastAdNo = R;
	}
	setTimeout(AdsAGo,1000);
}



function ShowAd(AdNo){
	/*Hide every ad, just in case*/
	for(var C = 1;C<numberOfAds+1;C++){
		var x = "ad".concat(parseInt(C));
		document.getElementById(x).style.display="none";
	}
	//display the correct advert - however, it opacity is very low, so wont show
	document.getElementById("ad".concat(parseInt(AdNo))).style.display="block";
	showAdvert();
}

{
/*The purpose of these functions is to change the opacity of the main adverts section at time intervals
it then closes the advert at similar time intervals

this creates the fade efffect for them

*/
function showAdvert(){
	showingAdvert = true;
	document.getElementById("adverts").style.display="block";
	document.getElementById("adverts").style.opacity = 0;
	setTimeout(qufmT1,fadeInterval);
}
function qufmT1(){
	document.getElementById("adverts").style.opacity = 0.1;
	setTimeout(qufmT2,fadeInterval);
}
function qufmT2(){
	document.getElementById("adverts").style.opacity = 0.2;
	setTimeout(qufmT3,fadeInterval);
}
function qufmT3(){
	document.getElementById("adverts").style.opacity = 0.3;
	setTimeout(qufmT4,fadeInterval);
}
function qufmT4(){
	document.getElementById("adverts").style.opacity = 0.4;
	setTimeout(qufmT5,fadeInterval);
}
function qufmT5(){
	document.getElementById("adverts").style.opacity = 0.5;
	setTimeout(qufmT6,fadeInterval);
}
function qufmT6(){
	document.getElementById("adverts").style.opacity = 0.6;
	setTimeout(qufmT7,fadeInterval);
}
function qufmT7(){
	document.getElementById("adverts").style.opacity = 0.7;
	setTimeout(qufmT8,fadeInterval);
}
function qufmT8(){
	document.getElementById("adverts").style.opacity = 0.8;
	setTimeout(qufmT9,fadeInterval);
}
function qufmT9(){
	document.getElementById("adverts").style.opacity = 0.9;
	setTimeout(qufmT10,fadeInterval);
}
function qufmT10(){
	document.getElementById("adverts").style.opacity = 1;
	setTimeout(closeAdvert,advertShowTime);
}

function closeAdvert(){
	document.getElementById("adverts").style.opacity = 1;
	setTimeout(Tmjds1,fadeInterval);	
}
function Tmjds1(){
	document.getElementById("adverts").style.opacity = 0.9;
	setTimeout(Tmjds2,fadeInterval);	
}
function Tmjds2(){
	document.getElementById("adverts").style.opacity = 0.8;
	setTimeout(Tmjds3,fadeInterval);	
}
function Tmjds3(){
	document.getElementById("adverts").style.opacity = 0.7;
	setTimeout(Tmjds4,fadeInterval);	
}
function Tmjds4(){
	document.getElementById("adverts").style.opacity = 0.6;
	setTimeout(Tmjds5,fadeInterval);	
}
function Tmjds5(){
	document.getElementById("adverts").style.opacity = 0.5;
	setTimeout(Tmjds6,fadeInterval);	
}
function Tmjds6(){
	document.getElementById("adverts").style.opacity = 0.4;
	setTimeout(Tmjds7,fadeInterval);	
}
function Tmjds7(){
	document.getElementById("adverts").style.opacity = 0.3;
	setTimeout(Tmjds8,fadeInterval);	
}
function Tmjds8(){
	document.getElementById("adverts").style.opacity = 0.2;
	setTimeout(Tmjds9,fadeInterval);	
}
function Tmjds9(){
	document.getElementById("adverts").style.opacity = 0.1;
	setTimeout(Tmjds10,fadeInterval);	
}
function Tmjds10(){
	document.getElementById("adverts").style.opacity = 0;
	document.getElementById("adverts").style.display="none";
	setTimeout(finishAdT,5000);
}
function finishAdT(){
		showingAdvert = false;
}
}











