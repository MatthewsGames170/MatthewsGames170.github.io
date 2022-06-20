/*
	E R R O R S
	
	# Snake Head can often go through its tail when it gets too long
	# Allow some of the custom modes that the real snake has such as color changing, 


	Notes
	
	snake head through tail issue
		-- list may also include teh current position of the head, which may lead to issues
		-- 
		

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
audioList[0] = ["../Z_Audio/snake_eat_a.mp3",0.25];
audioList[1] = ["../Z_Audio/snake_die.mp3",0.15];

function playSound(n){
	if(soundInProgress==false){
		soundInProgress = true
		switchSound(n);
		document.getElementById("audio_1").play();
		console.log("Audio now playing sound " +n);
		setTimeout(stopSound,audioList[n][1]*1000);
	}
}
function stopSound(){
	document.getElementById("audio_1").pause();		
	console.log("Audio now stopped");
	soundInProgress = false;	
}
var soundInProgress = false;


var snakeBody = [];
{
	//give corrdinates for where it should be
	snakeBody[0] = [20,22];
	snakeBody[1] = [20,21];
	snakeBody[2] = [20,20];
}


function snakePlot(x,y){
	//make similar to coin plot, with circle
	var id = snake_CreateID(x,y);
	document.getElementById(id).classList.remove("snake_player","snake_empty","snake_fruit");
	document.getElementById(id).classList.add("snake_player");
	
}
function snakeUnplot(x,y){
	//make similar to coin plot, with circle
	var id = snake_CreateID(x,y);
	document.getElementById(id).classList.remove("snake_player","snake_empty","snake_fruit");
	document.getElementById(id).classList.add("snake_empty");
	
}
function snakeFruit(x,y){
	//make similar to coin plot, with circle
	var id = snake_CreateID(x,y);
	document.getElementById(id).classList.remove("snake_player","snake_empty","snake_fruit");
	document.getElementById(id).classList.add("snake_fruit");
	
}
function snake_CreateID(x,y){

	var ID = "btn";
	ID = ID.concat(y);
	ID = ID.concat("_");
	ID = ID.concat(x);

return ID;
}

function snake_whichButton(){
	var x = event.key;
	//console.log("Pressed: " + x);
	/*
		*** KEYS USED ***
		
		UP Arrow 		or W	- 	Player Up
		Down Arrow 		or S	- 	Player Down
		Right Arrow 	or D	-	Move right
		Left Arrow		or A 	-	Move left
				
	*/
	var wjfjjjja =snake_hasMoved;
	if (x =="ArrowUp"||x=="w"||x=="W"){
		if(snake_PD != "down"){
			snake_PD = "up";
			snake_hasMoved = true;
			
		}
	}else if (x =="ArrowDown"||x=="s"||x=="S"){
		if(snake_PD != "up"){
			snake_PD = "down";
			snake_hasMoved = true;
		}
	}else if (x =="ArrowRight"||x=="d"||x=="D"){
		if(snake_PD != "left"){
			snake_PD = "right";
			snake_hasMoved = true;

		}
	}else if (x =="ArrowLeft"||x=="a"||x=="A"){
		if(snake_PD != "right"){	
			snake_PD = "left";
			snake_hasMoved = true;
	
		}
	}else if(x=="~" ||  x=="#"){
		snake_DIE();
	}else if (x=="P"||x=="p" && 3>4){
		//add one to end of string
		snake_eatFruit();
		
	}else if(x=="R"||x=="r" && 3>-4823){
		snake_placeFruit();
	}	
	
	if(wjfjjjja == false && snake_hasMoved == true){
		//what to do when the player begins the game
		snake_placeFruit();
	}
}

/*
game is 35 high and 40 wide

*/

var snake_PD = "";//stands for player direction
var snake_VD = "";

var snake_RX = 0;
var snake_RY = 0;
var snake_playerX = 20;
var snake_playerY = 20;
var snakeGameWidth = 40;
var snakeGameHeight = 34;
var snake_score = 0;
var snake_waitTime = 100;
var snake_dead = true;
var snake_hasMoved = false;

function snake_setDefaults(){
	snake_dead = true;
	snakeBody = [];
	
	//give corrdinates for where it should be
	snakeBody[0] = [20,22];
	snakeBody[1] = [20,21];
	snakeBody[2] = [20,20];
	
	snake_PD = "";//stands for player direction
	snake_VD = "";
	snake_score = 0;
	snake_RX = 0;
	snake_RY = 0;
	snake_playerX = 20;
	snake_playerY = 20;
	snakeGameWidth = 40;
	snakeGameHeight = 34;
	snake_waitTime = 100;
	snake_hasMoved = false;
	
	for(var X = 0;X<snakeGameWidth;X++){
		for(var Y = 0; Y<snakeGameHeight;Y++){
			snakeUnplot((X+1),(Y+1));
		}
	}
	
	
	for(var C = 0;C<snakeBody.length;C++){
		snakePlot(snakeBody[C][0],snakeBody[C][1]);
	}
	document.getElementById("audio_1").controls =false;	

}

function start_snake(){
	snake_dead = false;
	snake_setDefaults();
	snake_onTick();
}

function snake_onTick(){
	if(snake_hasMoved == true){
		snakeMovePlayer(snake_PD);
	}
	if(snake_dead == true){
		setTimeout(snake_onTick,snake_waitTime);
	}
}

function snake_hittingMySelf(){
	
	//retrun false if the snake is not hitting itself
	var output = false;
	//console.log("# # # # # # # # # # # # # # # # # # # #\n\nNew Checks\n\n");
	for(var C = 1; C<snakeBody.length;C++){		
		if(snakeBody[C][0] == snake_playerX && snakeBody[C][1] == snake_playerY){
			output = true;
			//console.log("The snake is hitting itself");
		}
		//console.log("Checking " + snakeBody[C][0] + " ~ " + snake_playerX + " and " + snakeBody[C][1] + " ~ " + snake_playerY + "\n\nThe result is: " + output);
	}
	//console.log("Finsihed round of chekcs\n\n== == == == == == == == === == == == ");
	return output;
}

function snakeMovePlayer(direction){
	/*
		for each direction, 
			check if the player can go there -> if not, die
			else
				change the players position
				check if they are hitting thier tail -> if so, die
					plot a new player position
					
		add the new position to the snake body list
		unplot the last item of the body
		move every body part up one		
		remove the last item in the array		
		
		check if the player is eating the fruit
			if true, eat fruit (inckludes increasing the body length and genreating a new fruit place)
			change score, 
			update score display
			

	*/

	if(direction == "up"){
		if(snake_playerY - 1 > 0){
			snake_playerY = snake_playerY - 1;
			if(snake_hittingMySelf() == false){
				snakePlot(snake_playerX,snake_playerY);
			}else{
				snake_DIE();
			}			
		}else{
			snake_DIE();
		}
		
		
	}else if(direction == "down"){							// 	If the snake is ment to move down, do this
		if(snake_playerY + 1 < snakeGameHeight+1){			// 	Ensure that the player is not going to be going outside the play area --> if they are, Kill them
			snake_playerY = snake_playerY + 1;				// 	Change the (Y) coordinate of the player
			if(snake_hittingMySelf() == false){				// 	Make sure that the player is not going to be crashing into themselves --> if they are , Kill them
				snakePlot(snake_playerX,snake_playerY);		// 	Replot the player
			}else{
				snake_DIE();								// 	Function to kill the player
			}
		}else{
			snake_DIE();
		}
		
		
	}else if(direction == "right"){
		if(snake_playerX + 1 < snakeGameWidth+1){	
			snake_playerX = snake_playerX + 1;	
			if(snake_hittingMySelf() == false){
				snakePlot(snake_playerX,snake_playerY);
			}else{
				snake_DIE();
			}		
		}else{
			snake_DIE();
		}
	}else if(direction == "left"){
		if(snake_playerX - 1 > 0){	
			snake_playerX = snake_playerX - 1;
			if(snake_hittingMySelf() == false){
				snakePlot(snake_playerX,snake_playerY);
			}else{
				snake_DIE();
			}
		}else{
			snake_DIE();
		}
	}else{
		console.log("Press and arrow key to begin");
	}
	
	//add player coords to list (at the end of the list)
	var newItem = [snake_playerX,snake_playerY];
	snakeBody.push(newItem);

	//check if touching fruit
	if(snake_playerX == snake_RX && snake_playerY == snake_RY){
		snake_eatFruit();
		snake_score = snake_score + 1;
		document.getElementById("snakeScoreplace").innerHTML = "<b>" + snake_score + "</b>";
	}
	
	//unplot the last item on the array
	var LX = snakeBody[0][0];
	var LY = snakeBody[0][1];
	snakeUnplot(LX,LY);
	
	//move every item up one
	for(var c = 0;c<snakeBody.length-1;c++){
		snakeBody[c] = snakeBody[c+1];
		//console.log(snakeBody[c-1]);
	}
	
	//remove final slot
	snakeBody.pop();	
	

}

function snake_DIE(){
	console.log("YOU DIED\n\nYour score was: " + snake_score +"\n\n #  # #  # #  #");
	var HS = localStorage.getItem("snakeHS");
	playSound(1);
	if(HS == undefined || HS < snake_score){
		HS = snake_score;
		localStorage.setItem("snakeHS",HS);
		console.log("New High Score");
	}
	snake_PD = "";
	snake_setDefaults();
}

function snake_eatFruit(){
	// add line to snake body
	snakeBody.splice(1, 0, snakeBody[1]);//duplicate the second item in the array (makes it longer)
	//console.log("Snake is eating fruit");
	playSound(0);
	setTimeout(snake_placeFruit,100);
}

function snake_placeFruit(){
	//console.log("Generating new fruit");
	/*
	
		Conditions for placing fruit
		
		# cannot be out of bounds
		# cannot be where the snake is (including tail)
		# deally not directly infront of them
	
	Math.floor(Math.random() * )+;
	*/
	var RqX = 0;
	var RqY = 0;
	var CP = false;
	
	//this loop is ment to stop fruit appearing on you  -->not working
	while(CP == false){
		RqX = Math.floor(Math.random() * snakeGameWidth)+1;
		RqY = Math.floor(Math.random() * snakeGameHeight)+1;
		var CP = true;
		var RqI = [RqX,RqY];
		//if position is on list that I cannot go
		for(var D = 0;D<snakeBody.length;D++){	
			if(snakeBody[D][0] == RqX && snakeBody[D][1] == RqY){
				CP = false;
			}
		}
	}
	
	//summon fruit at (RX,RY)
	snakeFruit(RqX,RqY);
	snake_RX = RqX;
	snake_RY = RqY;
}

function snake_setNewTime(){
	//get value
	var x = document.getElementById("snake_speed").value;
	if(0 < x && x < 100){
		snake_waitTime = 1000 / x;
	}else{
		//console.log("Invalid Time input");
	}
}

function snakeLeft(){ /*these two do nothing, its just to keep it happy*/}
function snakeRight(){/*these two do nothing, its just to keep it happy*/}