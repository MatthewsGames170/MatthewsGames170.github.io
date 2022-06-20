


function goStop(){
	
	if(ticker_Stuff[1]==true){
		ticker_Stuff[1] = false;
		document.getElementById("stopGoBtn").innerHTML = "Click To Play";
	}else{

		player1_stuff[3] = 0;		
		player2_stuff[3] = 0;		
		A_R();
		ticker_Stuff[1] = true;
		ticker();
		document.getElementById("stopGoBtn").innerHTML = "Click to Stop";		
	}
	
}

function ticker(){
	
	movePlayers();
	if(ticker_Stuff[1]==true){
		setTimeout(ticker,ticker_Stuff[0]);
	}
	
}

function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	if (x =="v" || x=="V"){	
	
	}else if (x =="l" || x=="L"){			
		loadBackground();
		
		
	//player 2 controls
	}else if (x =="ArrowDown"){
		player1_stuff[2] = "up";
		
	}else if (x =="ArrowRight"){
		player1_stuff[2] = "right";
	
	}else if (x =="ArrowLeft"){
		player1_stuff[2] = "left";
	
	}else if (x =="ArrowUp"){
		player1_stuff[2] = "down";
		
	//player 1 controls	
	}else if (x =="a" || x=="A"){
		player2_stuff[2] = "left";
	}else if (x =="s" || x=="S"){
		player2_stuff[2] = "down";
	}else if (x =="d" || x=="D"){
		player2_stuff[2] = "right";
	}else if (x =="w" || x=="W"){
		player2_stuff[2] = "up";
	
	}else if(x=="t" ||x=="T"){
		ticker();
	}else if(x=="m" ||x=="M"){
		movePlayers();
		

	}
}
	
function movePlayers(){
	
	/*for each player,
		get thier current x and y positions and direction
		for each direction
			test to see if they can go without going out of bounds
				else die
			see if they are touching part other players area

		hitting other play, boundaries or yourself will kill you
	*/

	var nx = 0;
	var ny = 0;	
	
	//for player 1
	if(player1_stuff[2] == "up"){
		nx = player1_stuff[0];
		ny = player1_stuff[1] + 1;
		
		if( ny>game[1]-1 || background_M[ny][nx] == 2|| background_M[ny][nx] == 1){
			DIE(1);
		}else{
			background_M[ny][nx] = 1;
			player1_stuff[0] = nx;
		    player1_stuff[1] = ny;
		}
		
	}else if(player1_stuff[2] == "down"){
		nx = player1_stuff[0];
		ny = player1_stuff[1] - 1;
		
		if( ny< 0 ||background_M[ny][nx] == 2 || background_M[ny][nx] == 1){
			DIE(1);
		}else{
			background_M[ny][nx] = 1;
			player1_stuff[0] = nx;
		    player1_stuff[1] = ny;
		}
		
	}else if(player1_stuff[2] == "left"){
		nx = player1_stuff[0]-1;
		ny = player1_stuff[1];
		
		if(nx< 0|| background_M[ny][nx] == 2  || background_M[ny][nx] == 1){
			DIE(1);
		}else{
			background_M[ny][nx] = 1;
			player1_stuff[0] = nx;
		    player1_stuff[1] = ny;
		}
	}else if(player1_stuff[2] == "right"){
		nx = player1_stuff[0]+1;
		ny = player1_stuff[1];
		
		if( nx> game[0]-1 || background_M[ny][nx] == 2 || background_M[ny][nx] == 1){
			DIE(1);
		}else{
			background_M[ny][nx] = 1;
			player1_stuff[0] = nx;
		    player1_stuff[1] = ny;
		}
	}

	
	
	//for player 2
	if(player2_stuff[2] == "up"){
		nx = player2_stuff[0];
		ny = player2_stuff[1] - 1;
		
		if( ny<0 || background_M[ny][nx] == 2|| background_M[ny][nx] == 1){
			DIE(2);
		}else{
			background_M[ny][nx] = 2;
			player2_stuff[0] = nx;
		    player2_stuff[1] = ny;
		}
		
	}else if(player2_stuff[2] == "down"){
		nx = player2_stuff[0];
		ny = player2_stuff[1] + 1;
		
		if( ny>game[1]-1 ||background_M[ny][nx] == 2 || background_M[ny][nx] == 1){
			DIE(2);
		}else{
			background_M[ny][nx] = 2;
			player2_stuff[0] = nx;
		    player2_stuff[1] = ny;
		}
		
	}else if(player2_stuff[2] == "left"){
		nx = player2_stuff[0]-1;
		ny = player2_stuff[1];
		
		if(nx< 0|| background_M[ny][nx] == 2  || background_M[ny][nx] == 1){
			DIE(2);
		}else{
			background_M[ny][nx] = 2;
			player2_stuff[0] = nx;
		    player2_stuff[1] = ny;
		}
	}else if(player2_stuff[2] == "right"){
		nx = player2_stuff[0]+1;
		ny = player2_stuff[1];
		
		if( nx> game[0]-1 || background_M[ny][nx] == 2 || background_M[ny][nx] == 1){
			DIE(2);
		}else{
			background_M[ny][nx] = 2;
			player2_stuff[0] = nx;
		    player2_stuff[1] = ny;
		}
	}

	
	loadBackground();
}

function DIE(player){
	
	console.log("Player " + player + " Died");	
	if(player == 2){
		//player 2 score ^
		player2_stuff[3] = player2_stuff[3] + 1;//increase the score
		player1_stuff[4] = 0;   //set the oposite player`s win streak to 0
		player2_stuff[4] = player2_stuff[4] + 1;//increase the win streak	
		if(player2_stuff[4] > 5){
			player2_stuff[3] = player2_stuff[3] + 1;
			console.log("Bonus Points for Win Streak");
		}
	}else{
		//player 1 score ^
		player1_stuff[3] = player1_stuff[3] + 1;
		player2_stuff[4] = 0;
		player1_stuff[4] = player1_stuff[4] + 1;
		if(player1_stuff[4] > 5){
			player1_stuff[3] = player1_stuff[3] + 1;
			console.log("Bonus Points for win streak");
		}		
	}
	updateDisplay();
	A_R();
}

function A_R(){
	background_M[0] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[1] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[2] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[3] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[4] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[5] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[6] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[7] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[8] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[9] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[11] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[12] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[13] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[14] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[15] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[16] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[17] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[18] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[19] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[20] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[21] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[22] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[23] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[24] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[25] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[26] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[27] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[28] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[29] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	player1_stuff[0] = 25;
	player1_stuff[1] = 6;
	player1_stuff[2] = "left";
	
	player2_stuff[0] = 6;
	player2_stuff[1] = 25;
	player2_stuff[2] = "right";
	updateDisplay();	
	loadBackground();	
}

function updateDisplay(){
	document.getElementById("p1_score_out").innerHTML = player1_stuff[3];
	document.getElementById("p2_score_out").innerHTML = player2_stuff[3];
}

function loadBackground(){
	
	for(var y = 0;y<background_M.length;y++){
		for(var x = 0;x<background_M[y].length;x++){
			//console.log("Now trying for point " +x +" " + y)
			if(background_M[y][x] == 0){
				unplot(x,y);
			}else if(background_M[y][x] == 1){
				p1_plot(x,y);
			}else if(background_M[y][x] == 2){
				p2_plot(x,y);
			}
		}
	}
	
}

function unplot(x,y){document.getElementById(createID(x+1,y+1)).classList.remove("p2_taken","p1_taken");  }

function p1_plot(x,y){
	var id = createID(x+1,y+1);
	document.getElementById(id).classList.remove("p2_taken","p1_taken");
	document.getElementById(id).classList.add("p1_taken");
}

function p2_plot(x,y){
	var id = createID(x+1,y+1);
	document.getElementById(id).classList.remove("p2_taken","p1_taken");
	document.getElementById(id).classList.add("p2_taken");
}

function createID(x,y){
	var ID = "btn";
	ID = ID.concat(y);
	ID = ID.concat("_");
	ID = ID.concat(x);
	return ID;	
}

var background_M = [];{
	//table is a 30 * 30
	//0 = blank,   1 = player 1`s area,   2 = player 2`s area

	//                  0  1  2  3  4  5  6  7  8  9  10  11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
	background_M[0] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[1] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[2] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[3] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[4] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[5] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[6] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[7] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[8] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[9] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[11] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[12] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[13] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[14] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[15] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[16] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[17] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[18] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[19] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[20] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[21] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[22] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[23] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[24] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[25] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[26] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[27] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[28] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	background_M[29] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

}

//in order;           X position,  Y position,  Direction,  Score   win streak
var player1_stuff = [ 25,          6,            "left",       0,    0];
var player2_stuff = [ 6,           25,           "right",      0,    0];

//width and height of game board 
var game = [30,30];
			// waittime   playing? 
var ticker_Stuff = [200,      false];
