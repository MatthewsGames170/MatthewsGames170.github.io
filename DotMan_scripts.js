/*
 E R R O R    C O D E S 

	- these are alert messages that could occur during game play. ie messages that are not commented out 
	
	ERROR 001/X: This means that the ghost (numbered X) is not getting a direction after trying to move

	ERROR 002/X: This means that the ghost has determinded that there is no possible direction for it to go and therefore cannot move

*/
/*
	A C T I V E    E R R O R S

	
#	Ghosts sometimes just stop and cease to exist. this then cuases every other ghost to
	stop moving. player can still move but ghosts cannot. 
		- this often happens if the ghost is in the last two columns of the map
		
#	ghosts seem to be set to run away whenever the level changes


	T H I N G S   T O   A D D    O R   I M P R O V E

#	Make Ghosts better at catching you 
		- when you have gone through teleporter, ghosts could follow even if they are at junction

#	Better Die methods


*/

/*  0 = clear, 1 = wall  */
var  dhf = []; /*this 'variable' or record is to store the background*/
{

	dhf[1]  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	dhf[2]  = [1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1];	
	dhf[3]  = [1,2,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,2,1,1,1,1,1,1,1,1,1,2,1,2,1,1,0,1];
	dhf[4]  = [1,0,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,2,1];
	dhf[5]  = [1,2,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0,0,0,0,2,1,2,0,2,0,1];
	dhf[6]  = [1,0,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,1,0,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,1];
	dhf[7]  = [1,2,1,2,0,2,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,2,1,2,0,0,0,2,1,0,0,1,2,0,0,0,2,1,2,0,0,2,1,1,1,1,1,1,1,1,1,2,0,2,0,1,0,1];
	dhf[8]  = [1,0,1,0,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,0,2,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,2,1,2,1];
	dhf[9]  = [1,2,1,0,3,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,0,1,2,0,2,0,2,0,0,0,0,2,0,2,0,2,1,0,1,0,2,1,1,1,1,1,1,1,1,1,2,1,3,0,1,0,1];
	dhf[10] = [1,0,1,1,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,0,2,0,2,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,2,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,1];
	dhf[11] = [1,2,0,2,0,2,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1,0,2,1,1,1,1,1,1,1,1,1,2,0,2,0,2,0,1];
	dhf[12] = [1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,0,2,1,2,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,2,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1];
	dhf[13] = [1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,2,1,0,0,1,1,0,0,1,1,0,0,1,2,1,1,1,0,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1];
	dhf[14] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	dhf[15] = [0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0];
	dhf[16] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	dhf[17] = [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,2,1,0,0,1,1,1,1,1,1,0,0,1,2,1,1,1,0,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1];
	dhf[18] = [1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,2,1,2,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,2,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1];
	dhf[19] = [1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1,0,2,0,2,0,2,0,2,0,2,0,2,0,0,2,0,2,1];
	dhf[20] = [1,2,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,2,0,0,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1];
	dhf[21] = [1,0,1,0,2,0,2,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,1,0,1,2,0,2,0,2,0,0,0,0,2,0,2,0,2,1,0,1,0,2,1,1,1,1,1,1,1,1,1,2,0,2,0,1,2,1];
	dhf[22] = [1,2,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,2,1,2,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,2,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,2,1,0,1];
	dhf[23] = [1,0,1,0,3,1,2,1,1,0,1,1,1,1,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,3,0,1,2,1];
	dhf[24] = [1,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,2,0,2,0,2,0,2,1,1,1,1,0,1];
	dhf[25] = [1,0,2,0,2,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,2,0,2,1];
	dhf[26] = [1,2,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,0,1];
	dhf[27] = [1,0,1,1,2,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,2,1];
	dhf[28] = [1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1];
	dhf[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

	//player start 	(33,25)
	//ghosts start at (33,16)
	
	
}	

var BGP = [];/*this record is the ghosts - contains their x, y, direction, colour*/
{
//each container is equal to one enemy.

/*
	Array No.	What's in it
		0		X position
		1		Y position
		2		name
		3		direction
		
		4		left counter
		5		right counter
		6		up counter
		7		down counter
		
*/
			// 0  1 2  3	 4 5 6 7
	BGP[1] = [14,13,1,"left",0,0,0,0];//direct follow
	BGP[2] = [14,13,2,"right",0,0,0,0];//cut player off
	BGP[3] = [14,13,3,"left",0,0,0,0];//cut player off
	BGP[4] = [14,13,4,"right",0,0,0,0];//direct follow or run away

}

//Run bad Guys
/*
RMoveGhosts() and type3moveGhosts() do not allow ghosts to exist in the final 2 columns

*/

function RmoveGhosts(GNo){ /*Move the specified ghost randomly*/
	/*this code makes the ghost move by itself
	
	add something that allows dot to change direction at any junction
	
	*/
	
	var dx = 0;				//The difference to be made to the ghost's x value
	var dy = 0;				//The difference to be made to the ghost's y value
	var Gx = BGP[GNo][0];	//The ghost's current X value
	var Gy = BGP[GNo][1];	//The ghost's current Y value
	var GD = false;			//Got direction - has the ghost determined which way it is to go (meant to follow after every alteration of dx or dy)
	var md = BGP[GNo][3];	//The ghost's current direction, although variable is mainly used to store the new direction of ghost
	var Px = playerX;		//The player's X value
	var Py = playerY;		//The player's Y value
	
	if(testPosition(Gx,Gy) == false){
		//this bit attempts to stop the ghost from destronying wall blocks  by 'killing' the ghost
		kill(GNo);
		wallPlot(Gx,Gy);
		
	}
	
	if(mapNo == 2){
		if(Gx == 51 && Gy == 15 && Px < 25){/*if ghost is at a point near to the teleproter, (the junctions near it) go through it*/
			md = "right";
			dx = 1;
			GD = true;
		}else if(Gx == 53 && Gy == 15 && Px < 25){
			md = "right";
			dx = 1;
			GD = true;						
		}else if(Gx == 8 && Gy == 15 && Px > 35){
			md = "left";
			dx = -1;
			GD = true;
		}else if(Gx == 10 && Gy == 15 && Px > 35){	
			md = "left";
			dx = -1;
			GD = true;		
		}else{
			GD = false;
		}
	}	
	
	if(IsCorner(Gx,Gy) == 2){
		//it has two entrances - could be a true corner or a straight line
			//if true - turn and reset direction
		if(line(Gx,Gy)==0){
			
			if(md=="left"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}
				
			}else if(md=="right"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}				
				// -- -- -- --
			}else if(md=="up"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}				
				
			}else if(md=="down"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}					
			}
			//alert("Did corner");
		}else{
			
			if(md=="left"){
				dx=-1;
				GD=true;
				
			}else if(md=="right"){
				dx=1;
				GD=true;
				
			}else if(md=="down"){
				dy=1;
				GD=true;
				
			}else if(md=="up"){
				dy=-1;
				GD=true;
				
			}else{
				alert("error in straight: line 238");
				md=RDIcanGo();
			}
			//alert("Straight");
		}
			
	}else{
		//must be junction or dead end
		var deadEnd = false;
		
		if(md=="left"){
			if(testPosition(Gx-1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="right"){
			if(testPosition(Gx+1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="up"){
			if(testPosition(Gx,Gy-1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else if(md=="down"){
			if(testPosition(Gx,Gy+1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else{
			
		}		
		
		if(deadEnd==false){
			//it is a junction so pick a random direction 
			//(generate list of locations I can	go and reset my direction)
			var L = listIcanGo(Gx,Gy,GNo);
			if(Py == Gy){										//include a few test positions here
				if(Px < Gx && L.includes("left") == true && testPosition(Gx-1,Gy) == true){
					//to the left of ghost
					md = "left";
						
				}else if(Px > Gx && L.includes("right") == true&& testPosition(Gx+1,Gy) == true){
					//to the left of ghost
					md = "right";
				}else{
					md = RDIcanGo(Gx,Gy,GNo);
				}
			}else if(Px == Gx){
				if(Py < Gy && L.includes("up") == true&& testPosition(Gx,Gy-1) == true){
					//to the left of ghost
					md = "up";
					
				}else if(Py > Gy && L.includes("down") == true&& testPosition(Gx,Gy+1) == true){
					//to the left of ghost
					md = "down";
				}else{
					md = RDIcanGo(Gx,Gy,GNo);
				}

				
			}else{	
				md = RDIcanGo(Gx,Gy,GNo);
			}

			//determine what way it is going to go and alter dx or dy
			if(md=="left"){
				dx=-1;		//change x by -1
				GD=true;	//is has a direction
			}else if(md=="right"){
				dx=1;
				GD=true;
			}else if(md=="down"){
				dy=1;
				GD=true;
			}else if(md=="up"){
				dy=-1;
				GD=true;
			}

			

			
		}else if(deadEnd == true){
			//turn around - it is a dead end
			if(md=="left"){
				dx=1;		//change x/y by the opposite of what it normaly is
				GD=true;	//it has a direction
				md="right";	//set its direction to opposite way it was going
				
			}else if(md=="right"){
				dx=-1;
				GD=true;
				md="left";
				
			}else if(md=="down"){
				dy=-1;
				GD=true;
				md="up";
				
			}else if(md=="up"){
				dy=1;
				GD=true;
				md="down;"
			}
			
		}else{
			//junction has more than 4 entrances or we are surounded by wall
			GD=true; //cannot move, but i have a direction
			alert("no solution");
		}
	}	
	
	var Hx = Gx + dx;
	var Hy = Gy + dy;


	if(GD==true ){
		unplot(Gx,Gy);
		
		if(mapNo == 6){
			if(BGP[GNo][0] + dx < 2){
				BGP[GNo][0] = 26;
			}else if(BGP[GNo][0] + dx > 26){
				BGP[GNo][0] = 2;
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;			
			}

		}else{
			if(BGP[GNo][0] + dx < 2){/*Should be validation to allow teleportation*/
				BGP[GNo][0] = 59;			
			}else if(BGP[GNo][0] + dx > 59){
				BGP[GNo][0] = 1;			
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;
			}		
		}
		BGP[GNo][1] = BGP[GNo][1] + dy;
		BGP[GNo][3] = md;

		ememyPlot(BGP[GNo][0],BGP[GNo][1],BGP[GNo][2]);

	}else{
		alert("ERROR 001/" + GNo + ": Not getting a direction");
	}


/*
things to do at end of once direction has beed established - check it is not plotting in a 1 square

	# unplot current ghost
	# change the x and y coordinates of ghost
	# reset ghosts direction (md) - if needed
	# check if teleportation is needed - if true, change the x (y wont be needed) position
	# plot the ghost with the correct colour


*/

}

function FwMoveGhosts(GNo){/*Move the specified ghost towards the player*/
	
	/*
		This code should be the same as the random move ghosts function,
		except when choosing where to go at a junction, it will work out the direction it should go
	
		this does mean that any errors in the random / original function would be carried here
	
	*/
	
	
	var dx = 0;				//The difference to be made to the ghost's x value
	var dy = 0;				//The difference to be made to the ghost's y value
	var Gx = BGP[GNo][0];	//The ghost's current X value
	var Gy = BGP[GNo][1];	//The ghost's current Y value
	var GD = false;			//Got direction - has the ghost determined which way it is to go (meant to follow after every alteration of dx or dy)
	var md = BGP[GNo][3];	//The ghost's current direction, although variable is mainly used to store the new direction of ghost
	var Px = playerX;		//The player's X value
	var Py = playerY;		//The player's Y value
	
	if(testPosition(Gx,Gy) == false){
		//this bit attempts to stop the ghost from destroying wall blocks  by 'killing' the ghost
		wallPlot(Gx,Gy);
		Gx = 30;
		Gy = 14;
		BGP[GNo][0] = Gx;
		BGP[GNo][1] = Gy;
		
		alert("spawning on wall");

	}
	
	if(mapNo == 2){
		if(Gx == 51 && Gy == 15 && Px < 25){/*if ghost is at a point near to the teleproter, (the junctions near it) go through it*/
			md = "right";
			dx = 1;
			GD = true;
		}else if(Gx == 53 && Gy == 15 && Px < 25){
			md = "right";
			dx = 1;
			GD = true;						
		}else if(Gx == 8 && Gy == 15 && Px > 35){
			md = "left";
			dx = -1;
			GD = true;
		}else if(Gx == 10 && Gy == 15 && Px > 35){	
			md = "left";
			dx = -1;
			GD = true;		
		}else{
			GD = false;
		}
	}
	
	if(GD == false){
		if(Px == Gx && Py == Gy){
			md = playerDirection;
			GD=true;
			//add validation here to ensure that ghost cannot move through walls	(if testPosition = false, do not change x/y values else do so)		 
			
		}else if(IsCorner(Gx,Gy) == 2){
			//it has two entrances - could be a true corner or a straight line
				//if true - turn and reset direction
			
			
			if(line(Gx,Gy)==0){
				
				if(md=="left"){
					if(testPosition(Gx,Gy-1)==true){
						//up
						dy=-1;
						GD=true;
						md="up";
						
					}else if(testPosition(Gx,Gy+1)==true){
						//down
						dy=1;
						GD=true;
						md="down";
					}else{
						//alert("Line: 501");
					}
					
				}else if(md=="right"){
					if(testPosition(Gx,Gy-1)==true){
						//up
						dy=-1;
						GD=true;
						md="up";
						
					}else if(testPosition(Gx,Gy+1)==true){
						//down
						dy=1;
						GD=true;
						md="down";
					}else{
						//alert("Line: 517");
					}				
					// -- -- -- --
				}else if(md=="up"){
					if(testPosition(Gx-1,Gy)==true){
						//left
						dx=-1;
						GD=true;
						md="left";
						
					}else if(testPosition(Gx+1,Gy)==true){
						//right
						dx=1;
						GD=true;
						md="right";
					}else{
					//	alert("Line: 533");
					}				
					
				}else if(md=="down"){
					if(testPosition(Gx-1,Gy)==true){
						//left
						dx=-1;
						GD=true;
						md="left";
						
					}else if(testPosition(Gx+1,Gy)==true){
						//right
						dx=1;
						GD=true;
						md="right";
					}else{
					//	alert("Line: 549");
					}					
				}
				//alert("Did corner");
			}else{
				//if false - it is a straight line   -- could i move it to the bit above?
				//this bit sometimes fails to work correctly
				if(md=="left"){
					dx=-1;
					GD=true;
					
				}else if(md=="right"){
					dx=1;
					GD=true;
					
				}else if(md=="down"){
					dy=1;
					GD=true;
					
				}else if(md=="up"){
					dy=-1;
					GD=true;
				}else{
					alert("error in straight: line 572");
				}
				//alert("Straight");
			}
				
		}else{
			//must be junction or dead end
			var deadEnd = false;
			
			if(md=="left"){
				if(testPosition(Gx-1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
					deadEnd= true;
				}else{
					//	alert("Line: 585");
					}	
			}else if(md=="right"){
				if(testPosition(Gx+1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
					deadEnd= true;
				}else{
					//	alert("Line: 591");
				}	
			}else if(md=="up"){
				
				if(testPosition(Gx,Gy-1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
					deadEnd = true;
				}else{
					//alert("Line: 597"); //keeps coming here
				}
			}else if(md=="down"){
				if(testPosition(Gx,Gy+1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
					deadEnd= true;
				}else{
						//alert("Line: 603");
				}	
			}else{
				alert("line 606");
			}		
			
			if(deadEnd==false){
				
	// ## ## ##  T H I S   I S   T H E   B I T   T H A T   H A S   B E E N   C H A N G E D   ## ## ##


				//it is a junction so choose the direction that would decrease the distance to the player 

				var M = gradient(Px,Py,Gx,Gy);//x1, y1, x2, y2
				var L = listIcanGo(Gx,Gy,GNo);
				var quad = ""; //can be either ul, ur, ll, lr.   upper left, upper right, lower left, lower right
				
				//	alert(M);
				//all movements are favorde movements - check list if i can go there - else take alternative route
				
				/*
				Use the list of avalible directions and the gradient between the player and the ghost to choose the direction the ghost will go at a junction
				
				if gradient is positive, then player is either               up   and left   or   down and right   of ghost
				otherwise, if gradient is negative, then player is either    down and left   or   up   and right   of ghost
				
					- use the players X and Y position to determin exactly which quadrant (relative to the ghost) they are
				
					- once the quadrent has been identifide, the top top directions to be favord are now found
						use the list of availbe directions and pick the 
						
				if gradient is o or undefinde, the player is on the same axis as the ghost - favour this axis
					- but if there is a block stopping it, use player direction to help
							- if player moving perpenducular to axis, take thier direction (as junction is 3 gaps, then this would be possible everwhere)
							- otherwise, pick a suitable random direction *
							
								* basically, if the player and ghost are in the same colum (both y-cooridinates are the same), but the player is above the ghost 
								and there is a block preventing the ghost from going straight up to get the player, take either left or right BUT absalotly NOT down	
								this would tkae the ghost away from the player
				
				if the gradient is 1 or 1, again use th eplayers direction to help. 
					first, if i cannot go one of the directions, take the remaining one.
					if i can take both desirede directions, use the players direction
						- if player is moving up and i can take up or left, take up			//this bit could be changed for other ghosts ? 
						ie; copy player movement
				
				
				# there would be problems to do with dead ends - ghost would repeatable go down these holes
				*/
				
				//the following ifs determine which quadrent the player is in, relative to the ghost
				if(Px == Gx){
					if(Py == Gy){
						//they are at the same location, take the same direction as the player
						md = playerDirection;
						
					}else{
						//player x is the same, but y coordinate is not - move up or down
					
						if(Py < Gy && L.includes("up") == true){
							//to the left of ghost
							md = "up";
							
						}else if(Py > Gy && L.includes("down") == true){
							//to the left of ghost
							md = "down";
							
						}else{				//l, r, u, d (1 = wanted)
							md = PRDICGFO(Gx,Gy,GNo, 1,1,0,0);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
						}
						
					}	
					
				//quad        can be either ul, ur, ll, lr.       upper left, upper right, lower left, lower right	
				}else if(Py == Gy){
					//ghost in same y-axis, but not at same x position

					if(Px < Gx && L.includes("left") == true){
						//to the left of ghost
						md = "left";
						
					}else if(Px > Gx && L.includes("right") == true){
						//to the left of ghost
						md = "right";
						
					}else{				//l, r, u, d (1 = wanted)
						md = PRDICGFO(Gx,Gy,GNo, 0,0,1,1);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
					}
					
					
					//quadrent method from here
				}else if(Px < Gx){				
					//player is to the left of ghost
					
					if(Py == Gy){
						//directly to the left
						alert("line 699");
					}else if(Py < Gy){
						//player is left and up from ghost
						quad = "ul";
						
					}else if(Py > Gy){
						//player is left and down from ghost
						quad = "ll";
						
					}
					
				}else if(Px > Gx){
					//player is to the right of ghost
				
					if(Py == Gy){
						//directly to the right
						
					}else if(Py < Gy){
						//player is right and up from ghost
						quad = "ur";
						
					}else if(Py > Gy){
						//player is right and down from ghost
						quad = "lr";
					}
					
				}
				
				
				
				//if quadrent method used, use below to determin directions	
				/*
				quadrent method solves direction for the following player positions;
						- up   and left
						- up   and right
						- down and left
						- down and right
						
						- when gradient between 
						
				
					i.e; the player is not in a straight (not diagonal though) line to ghost 
				
				*/
				if(quad != ""){/*if the quadrent varible has been used, use it to determin direction*/
					if(M>1 && M != undefined && quad == "ul"){
						//left and up, favoing up
						if(L.includes("up")){
							md = "up";
						}else{
							md = "left";
						}
				
					}else if(M<-1 && M != undefined && quad == "ur"){
						//right and up, favouring up
						if(L.includes("up")){
							md = "up";
						}else{
							md = "right";
						}
						
					}else if(M<-1 && M != undefined && quad == "ll"){
						//left and down, favouring down
						if(L.includes("down")){
							md = "down";
						}else{
							md = "left";
						}				
					
					}else if(M>1 && M != undefined && quad == "lr"){				
						//right and down, favouring down
						if(L.includes("down")){
							md = "down";
						}else{
							md = "right";
						}				
					
					
					// - - - - - - - - - - - - - - - -- - - -- - - -- - 	
					}else if(M < 1 && M > -1 && M != 0 && quad == "ul"){
						//left and up, favoring left
						if(L.includes("left")){
							md = "left";
						}else{
							md = "up";
						}				
					
					}else if(M < 1 && M > -1 && M != 0 && quad == "ur"){
						//right and up, favoring right
						if(L.includes("right")){
							md = "right";
						}else{
							md = "up";
						}				

					}else if(M < 1 && M > -1 && M != 0 && quad == "ll"){
						//left and down, favoring left
						if(L.includes("left")){
							md = "left";
						}else{
							md = "down";
						}				
				
					}else if(M < 1 && M > -1 && M != 0 && quad == "lr"){
						//right and down, favoring right
						if(L.includes("right")){
							md = "right";
						}else{
							md = "down";
						}			
						
						
					// - - - - - - --- - - - - - - --- - - - - - - --- - - - - - - ---	
					}else if(M == 1 || M == -1){
						//if i can go in both directions, pick a random direction
						if(Px > Gx){
							//L.includes("up")
							//PRDICGFO(x,y,GNo,l,r,u,d)
							if(Py < Gy){
								//up and right
								md = PRDICGFO(Gx,Gy,GNo,0,1,1,0);
							}else{
								//down and right
								md = PRDICGFO(Gx,Gy,GNo,0,1,0,1);
							}
						
						}else if(Px < Gx){
							//L.includes("up")
							//PRDICGFO(x,y,GNo,l,r,u,d)
							if(Py < Gy){
								//up and left
								md = PRDICGFO(Gx,Gy,GNo,1,0,1,0);
							}else{
								//down and left
								md = PRDICGFO(Gx,Gy,GNo,1,0,0,1);
							}							
						
						}
					
					}
				
				}/*else, the direction is likly alread solved, so skip it*/
				
				//determin what way it is going to go and alter dx or dy			 
				if(md=="left"){
					dx=-1;		//change x by -1
					GD=true;	//is has a direction
				}else if(md=="right"){
					dx=1;
					GD=true;
				}else if(md=="down"){
					dy=1;
					GD=true;
				}else if(md=="up"){
					dy=-1;
					GD=true;
				}
				//alert("junction");
				
			}else if(deadEnd == true){
				//turn around - it is a dead end
				//maybe add way so that ghost does not go down a dead end unless the player is there....?
				
				if(md=="left"){
					dx=1;		//change x/y by the opposite of what it normaly is
					GD=true;	//it has a direction
					md="right";	//set its direction to opposite way it was going
					
				}else if(md=="right"){
					dx=-1;
					GD=true;
					md="left";
					
				}else if(md=="down"){
					dy=-1;
					GD=true;
					md="up";
					
				}else if(md=="up"){
					dy=1;
					GD=true;
					md="down;"
				}
				//alert("dead End");
			}else{
				//junction has more than 4 entrances or we are surrounded by wall
				GD=true; //cannot move, but I have a direction
				alert("ERROR 002/" + GNo + ": No solution");
			}
		}	
	}

	if(GD==true /*&& testPosition(Gx+dx,Gy+dy)==true - causes error*/){
		unplot(Gx,Gy);
		
		if(mapNo == 6){
			if(BGP[GNo][0] + dx < 2){
				BGP[GNo][0] = 26;
			}else if(BGP[GNo][0] + dx > 26){
				BGP[GNo][0] = 2;
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;			
			}

		}else{
			if(BGP[GNo][0] + dx < 2){/*Should be validation to allow teleportation*/
				BGP[GNo][0] = 59;			
			}else if(BGP[GNo][0] + dx > 59){
				BGP[GNo][0] = 1;			
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;
			}		
		}
		BGP[GNo][1] = BGP[GNo][1] + dy;
		BGP[GNo][3] = md;

		ememyPlot(BGP[GNo][0],BGP[GNo][1],BGP[GNo][2]);

	}else{
		alert("ERROR 001/" + GNo + ": Not getting a direction");
	}

}

function type3moveGhosts(GNo){

	/*
		This code should be the same as the random move ghosts function,
		except when choosing where to go at a junction, it will work out the direction it should go
	
		this does mean that any errors in the random / original function would be carried here
	
	*/	
	
	var dx = 0;				//The difference to be made to the ghost's x value
	var dy = 0;				//The difference to be made to the ghost's y value
	var Gx = BGP[GNo][0];	//The ghost's current X value
	var Gy = BGP[GNo][1];	//The ghost's current Y value
	var GD = false;			//Got direction - has the ghost determined which way it is to go (meant to follow after every alteration of dx or dy)
	var md = BGP[GNo][3];	//The ghost's current direction, although variable is mainly used to store the new direction of ghost
	var Px = playerX;		//The player's X value
	var Py = playerY;		//The player's Y value
	
	if(testPosition(Gx,Gy) == false){
		//this bit attempts to stop the ghost from destronying wall blocks  by 'killing' the ghost
		wallPlot(Gx,Gy);
		Gx = 30;
		Gy = 14;
		BGP[GNo][0] = Gx;
		BGP[GNo][1] = Gy;
	}
	
	if(mapNo == 2){
		if(Gx == 51 && Gy == 15 && Px < 25){/*if ghost is at a point near to the teleproter, (the junctions near it) go through it*/
			md = "right";
			dx = 1;
			GD = true;
		}else if(Gx == 53 && Gy == 15 && Px < 25){
			md = "right";
			dx = 1;
			GD = true;						
		}else if(Gx == 8 && Gy == 15 && Px > 35){
			md = "left";
			dx = -1;
			GD = true;
		}else if(Gx == 10 && Gy == 15 && Px > 35){	
			md = "left";
			dx = -1;
			GD = true;		
		}else{
			GD = false;
		}
	}	
	
	if(Px == Gx && Py == Gy){
		md = playerDirection;
		GD=true;
		//add validation here to ensure that ghost cannot move through walls	(if testpostiuon = false, do not change x/y values else do so)		 
		
	}else if(IsCorner(Gx,Gy) == 2){
		//it has two entrances - could be a true corner or a straight line
			//if true - turn and reset direction
		
		
		if(line(Gx,Gy)==0){
			
			if(md=="left"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}
				
			}else if(md=="right"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}				
				// -- -- -- --
			}else if(md=="up"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}				
				
			}else if(md=="down"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}					
			}
			//alert("Did corner");
		}else{
			//if false - it is a straight line   -- could i move it to the bit above?
			//this bit sometimes fails to work correctly
			if(md=="left"){
				dx=-1;
				GD=true;
				
			}else if(md=="right"){
				dx=1;
				GD=true;
				
			}else if(md=="down"){
				dy=1;
				GD=true;
				
			}else if(md=="up"){
				dy=-1;
				GD=true;
			}else{
				alert("error in straight in type 3 MG");
			}
			//alert("Straight");
		}
			
	}else{
		//must be junction or dead end
		var deadEnd = false;
		
		if(md=="left"){
			if(testPosition(Gx-1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="right"){
			if(testPosition(Gx+1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="up"){
			if(testPosition(Gx,Gy-1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else if(md=="down"){
			if(testPosition(Gx,Gy+1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else{
			
		}		
		
		if(deadEnd==false){
			
// ## ## ##  T H I S   I S   T H E   B I T   T H A T   H A S   B E E N   C H A N G E D   ## ## ##


			//it is a junction so choose the direction that would decrease the distance to the player 

			var M = gradient(Px,Py,Gx,Gy);//x1, y1, x2, y2
			var L = listIcanGo(Gx,Gy,GNo);
			var quad = ""; //can be either ul, ur, ll, lr.   upper left, upper right, lower left, lower right
			
			//	alert(M);
			//all movements are favorde movements - check list if i can go there - else take alternative route
			
			/*
			Use the list of avalible directions and the gradient between the player and the ghost to choose the direction the ghost will go at a junction
			
			if gradient is positive, then player is either               up   and left   or   down and right   of ghost
			otherwise, if gradient is negative, then player is either    down and left   or   up   and right   of ghost
			
				- use the players X and Y position to determin exactly which quadrant (relative to the ghost) they are
			
				- once the quadrent has been identifide, the top top directions to be favord are now found
					use the list of availbe directions and pick the 
					
			if gradient is o or undefinde, the player is on the same axis as the ghost - favour this axis
				- but if there is a block stopping it, use player direction to help
						- if player moving perpenducular to axis, take thier direction (as junction is 3 gaps, then this would be possible everwhere)
						- otherwise, pick a suitable random direction *
						
							* basically, if the player and ghost are in the same colum (both y-cooridinates are the same), but the player is above the ghost 
							and there is a block preventing the ghost from going straight up to get the player, take either left or right BUT absalotly NOT down	
							this would tkae the ghost away from the player
			
			if the gradient is 1 or 1, again use th eplayers direction to help. 
				first, if i cannot go one of the directions, take the remaining one.
				if i can take both desirede directions, use the players direction
					- if player is moving up and i can take up or left, take up			//this bit could be changed for other ghosts ? 
					ie; copy player movement
			
			
			# there would be problems to do with dead ends - ghost would repeatable go down these holes
			*/
			
			//the following ifs determin which quadrent the player is in, relative to the ghost
			if(Px == Gx){
				if(Py == Gy){
					//they are at the same location, take the same direction as the player
					md = playerDirection;
					
				}else{
					//player x is the same, but y coordiante is not - move up or down
				
					if(Py < Gy && L.includes("up") == true){
						//to the left of ghost
						md = "up";
						
					}else if(Py > Gy && L.includes("down") == true){
						//to the left of ghost
						md = "down";
						
					}else{				//l, r, u, d (1 = wanted)
						md = PRDICGFO(Gx,Gy,GNo, 1,1,0,0);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
					}
					
				}	
				
			//quad        can be either ul, ur, ll, lr.       upper left, upper right, lower left, lower right	
			}else if(Py == Gy){
				//ghost in same y-axis, but not at same x position

				if(Px < Gx && L.includes("left") == true){
					//to the left of ghost
					md = "left";
					
				}else if(Px > Gx && L.includes("right") == true){
					//to the left of ghost
					md = "right";
					
				}else{				//l, r, u, d (1 = wanted)
					md = PRDICGFO(Gx,Gy,GNo, 0,0,1,1);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
				}
				
				
				//quadrent method from here
			}else if(Px < Gx){				
				//player is to the left of ghost
				
				if(Py == Gy){
					//directly to the left
					
				}else if(Py < Gy){
					//player is left and up from ghost
					quad = "ul";
					
				}else if(Py > Gy){
					//player is left and down from ghost
					quad = "ll";
					
				}
				
			}else if(Px > Gx){
				//player is to the right of ghost
			
				if(Py == Gy){
					//directly to the right
					
				}else if(Py < Gy){
					//player is right and up from ghost
					quad = "ur";
					
				}else if(Py > Gy){
					//player is right and down from ghost
					quad = "lr";
				}
				
			}
			
			
			
			//if quadrent method used, use below to determin directions	
			/*
			quadrent method solves direction for the following player positions;
					- up   and left
					- up   and right
					- down and left
					- down and right
					
					- when gradient between 
					
			
				i.e; the player is not in a straight (not diagonal though) line to ghost 
			
			*/
			
//this little bit is copied from the move ghost directly towards player function, but with a few edits to encourage the ghost to cut off player 
			if(quad != ""){/*if the quadrent varible has been used, use it to determin direction*/
				if(M>1 && M != undefined && quad == "ul"){
					//left and up, favoing left
					if(L.includes("left")){
						md = "left";
					}else{
						md = "up";
					}
			
				}else if(M<-1 && M != undefined && quad == "ur"){
					//right and up, favouring right
					if(L.includes("right")){
						md = "right";
					}else{
						md = "up";
					}
					
				}else if(M<-1 && M != undefined && quad == "ll"){
					//left and down, favouring left
					if(L.includes("left")){
						md = "left";
					}else{
						md = "down";
					}				
				
				}else if(M>1 && M != undefined && quad == "lr"){				
					//right and down, favouring right
					if(L.includes("right")){
						md = "right";
					}else{
						md = "down";
					}				
				
				
				// - - - - - - - - - - - - - - - -- - - -- - - -- - 	
				}else if(M < 1 && M > -1 && M != 0 && quad == "ul"){
					//left and up, favoring up
					if(L.includes("up")){
						md = "up";
					}else{
						md = "left";
					}				
				
				}else if(M < 1 && M > -1 && M != 0 && quad == "ur"){
					//right and up, favoring up
					if(L.includes("up")){
						md = "up";
					}else{
						md = "right";
					}				

				}else if(M < 1 && M > -1 && M != 0 && quad == "ll"){
					//left and down, favoring down
					if(L.includes("down")){
						md = "down";
					}else{
						md = "left";
					}				
			
				}else if(M < 1 && M > -1 && M != 0 && quad == "lr"){
					//right and down, favoring right
					if(L.includes("down")){
						md = "down";
					}else{
						md = "right";
					}			
					
					
				// - - - - - - --- - - - - - - --- - - - - - - --- - - - - - - ---	
				}else if(M == 1 || M == -1){
					//if i can go in both directions, pick a random direction
					if(Px > Gx){
						//L.includes("up")
						//PRDICGFO(x,y,GNo,l,r,u,d)
						if(Py < Gy){
							//up and right
							md = PRDICGFO(Gx,Gy,GNo,0,1,1,0);
						}else{
							//down and right
							md = PRDICGFO(Gx,Gy,GNo,0,1,0,1);
						}
						
					}else if(Px < Gx){
						//L.includes("up")
						//PRDICGFO(x,y,GNo,l,r,u,d)
						if(Py < Gy){
							//up and left
							md = PRDICGFO(Gx,Gy,GNo,1,0,1,0);
						}else{
							//down and left
							md = PRDICGFO(Gx,Gy,GNo,1,0,0,1);
						}							
						
					}
				
				}
			
			}/*else, the direction is likly alread solved, so skip it*/
			
			//determin what way it is going to go and alter dx or dy			 
			if(md=="left"){
				dx=-1;		//change x by -1
				GD=true;	//is has a direction
			}else if(md=="right"){
				dx=1;
				GD=true;
			}else if(md=="down"){
				dy=1;
				GD=true;
			}else if(md=="up"){
				dy=-1;
				GD=true;
			}
			//alert("junction");
			
		}else if(deadEnd == true){
			//turn around - it is a dead end
			//maybe add way so that ghost does not go down a dead end unless the player is there....?
			if(md=="left"){
				dx=1;		//change x/y by the opposite of what it normaly is
				GD=true;	//it has a direction
				md="right";	//set its direction to opposite way it was going
				
			}else if(md=="right"){
				dx=-1;
				GD=true;
				md="left";
				
			}else if(md=="down"){
				dy=-1;
				GD=true;
				md="up";
				
			}else if(md=="up"){
				dy=1;
				GD=true;
				md="down;"
			}
			//alert("dead End");
		}else{
			//junction has more than 4 entrances or we are surounded by wall
			GD=true; //cannot move, but i have a direction
			alert("ERROR 002/" + GNo + ": No solution");
		}
	}	


	if(GD==true /*&& testPosition(Gx+dx,Gy+dy)==true - causes error*/){
		unplot(Gx,Gy);
		
		if(mapNo == 6){
			if(BGP[GNo][0] + dx < 2){
				BGP[GNo][0] = 26;
			}else if(BGP[GNo][0] + dx > 26){
				BGP[GNo][0] = 2;
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;			
			}

		}else{
			if(BGP[GNo][0] + dx < 2){/*Should be validation to allow teleportation*/
				BGP[GNo][0] = 59;			
			}else if(BGP[GNo][0] + dx > 59){
				BGP[GNo][0] = 1;			
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;
			}		
		}
		BGP[GNo][1] = BGP[GNo][1] + dy;
		BGP[GNo][3] = md;

		ememyPlot(BGP[GNo][0],BGP[GNo][1],BGP[GNo][2]);

	}else{
		alert("ERROR 001/" + GNo + ": Not getting a direction");
	}

}

/*Have the following additional functions for moving ghosts

	# random moving - but when they have the same X  or Y as player, they move towards
	# random moving - but when close to player - eg, distance is less than 6?, head toward player
	# move towards player, but pick random inverse or direct movement (a combination of red and pinks movment)
		- also have the move away version of this
	# another move away from player function

	give them a better way to get out of starting place...

*/

function type4moveGhosts(GNo){
/*make pick random, type Fw or 3*/


	/*
		This code should be the same as the random move ghosts function,
		except when choosing where to go at a junction, it will work out the direction it should go
	
		this does mean that any errors in the random / original function would be carried here
	
	*/	
	
	var dx = 0;				//The difference to be made to the ghost's x value
	var dy = 0;				//The difference to be made to the ghost's y value
	var Gx = BGP[GNo][0];	//The ghost's current X value
	var Gy = BGP[GNo][1];	//The ghost's current Y value
	var GD = false;			//Got direction - has the ghost determined which way it is to go (meant to follow after every alteration of dx or dy)
	var md = BGP[GNo][3];	//The ghost's current direction, although variable is mainly used to store the new direction of ghost
	var Px = playerX;		//The player's X value
	var Py = playerY;		//The player's Y value
	
	if(testPosition(Gx,Gy) == false){
		//this bit attempts to stop the ghost from destronying wall blocks  by 'killing' the ghost
		wallPlot(Gx,Gy);
		Gx = 30;
		Gy = 14;
		BGP[GNo][0] = Gx;
		BGP[GNo][1] = Gy;
	}
	
	if(mapNo == 2){
		if(Gx == 51 && Gy == 15 && Px < 25){/*if ghost is at a point near to the teleproter, (the junctions near it) go through it*/
			md = "right";
			dx = 1;
			GD = true;
		}else if(Gx == 53 && Gy == 15 && Px < 25){
			md = "right";
			dx = 1;
			GD = true;						
		}else if(Gx == 8 && Gy == 15 && Px > 35){
			md = "left";
			dx = -1;
			GD = true;
		}else if(Gx == 10 && Gy == 15 && Px > 35){	
			md = "left";
			dx = -1;
			GD = true;		
		}else{
			GD = false;
		}
	}	
	
	if(Px == Gx && Py == Gy){
		md = playerDirection;
		GD=true;
		//add validation here to ensure that ghost cannot move through walls	(if testpostiuon = false, do not change x/y values else do so)		 
		
	}else if(IsCorner(Gx,Gy) == 2){
		//it has two entrances - could be a true corner or a straight line
			//if true - turn and reset direction
		
		
		if(line(Gx,Gy)==0){
			
			if(md=="left"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}
				
			}else if(md=="right"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}				
				// -- -- -- --
			}else if(md=="up"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}				
				
			}else if(md=="down"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}					
			}
			//alert("Did corner");
		}else{
			//if false - it is a straight line   -- could i move it to the bit above?
			//this bit sometimes fails to work correctly
			if(md=="left"){
				dx=-1;
				GD=true;
				
			}else if(md=="right"){
				dx=1;
				GD=true;
				
			}else if(md=="down"){
				dy=1;
				GD=true;
				
			}else if(md=="up"){
				dy=-1;
				GD=true;
			}else{
				alert("error in straight");
			}
			//alert("Straight");
		}
			
	}else{
		//must be junction or dead end
		var deadEnd = false;
		
		if(md=="left"){
			if(testPosition(Gx-1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="right"){
			if(testPosition(Gx+1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="up"){
			if(testPosition(Gx,Gy-1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else if(md=="down"){
			if(testPosition(Gx,Gy+1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else{
			
		}		
		
		if(deadEnd==false){
			
		// ## ## ##  T H I S   I S   T H E   B I T   T H A T   H A S   B E E N   C H A N G E D   ## ## ##
			var R = Math.floor(Math.random() * 2)+1;
			
			if(R == 1){
				//it is a junction so choose the direction that would decrease the distance to the player 

					var M = gradient(Px,Py,Gx,Gy);//x1, y1, x2, y2
					var L = listIcanGo(Gx,Gy,GNo);
					var quad = ""; //can be either ul, ur, ll, lr.   upper left, upper right, lower left, lower right
					
					//the following ifs determin which quadrent the player is in, relative to the ghost
					if(Px == Gx){
						if(Py == Gy){
							//they are at the same location, take the same direction as the player
							md = playerDirection;
							
						}else{
							//player x is the same, but y coordiante is not - move up or down
						
							if(Py < Gy && L.includes("up") == true){
								//to the left of ghost
								md = "up";
								
							}else if(Py > Gy && L.includes("down") == true){
								//to the left of ghost
								md = "down";
								
							}else{				//l, r, u, d (1 = wanted)
								md = PRDICGFO(Gx,Gy,GNo, 1,1,0,0);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
							}
							
						}	
						
					//quad        can be either ul, ur, ll, lr.       upper left, upper right, lower left, lower right	
					}else if(Py == Gy){
						//ghost in same y-axis, but not at same x position

						if(Px < Gx && L.includes("left") == true){
							//to the left of ghost
							md = "left";
							
						}else if(Px > Gx && L.includes("right") == true){
							//to the left of ghost
							md = "right";
							
						}else{				//l, r, u, d (1 = wanted)
							md = PRDICGFO(Gx,Gy,GNo, 0,0,1,1);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
						}
						
						
						//quadrent method from here
					}else if(Px < Gx){				
						//player is to the left of ghost
						
						if(Py == Gy){
							//directly to the left
							
						}else if(Py < Gy){
							//player is left and up from ghost
							quad = "ul";
							
						}else if(Py > Gy){
							//player is left and down from ghost
							quad = "ll";
							
						}
						
					}else if(Px > Gx){
						//player is to the right of ghost
					
						if(Py == Gy){
							//directly to the right
							
						}else if(Py < Gy){
							//player is right and up from ghost
							quad = "ur";
							
						}else if(Py > Gy){
							//player is right and down from ghost
							quad = "lr";
						}
						
					}
					
					//this little bit is copied from the move ghost directly towards player function, but with a few edits to encourage the ghost to cut off player 
					if(quad != ""){/*if the quadrent varible has been used, use it to determin direction*/
						if(M>1 && M != undefined && quad == "ul"){
							//left and up, favoing left
							if(L.includes("left")){
								md = "left";
							}else{
								md = "up";
							}
					
						}else if(M<-1 && M != undefined && quad == "ur"){
							//right and up, favouring right
							if(L.includes("right")){
								md = "right";
							}else{
								md = "up";
							}
							
						}else if(M<-1 && M != undefined && quad == "ll"){
							//left and down, favouring left
							if(L.includes("left")){
								md = "left";
							}else{
								md = "down";
							}				
						
						}else if(M>1 && M != undefined && quad == "lr"){				
							//right and down, favouring right
							if(L.includes("right")){
								md = "right";
							}else{
								md = "down";
							}				
						
						
						// - - - - - - - - - - - - - - - -- - - -- - - -- - 	
						}else if(M < 1 && M > -1 && M != 0 && quad == "ul"){
							//left and up, favoring up
							if(L.includes("up")){
								md = "up";
							}else{
								md = "left";
							}				
						
						}else if(M < 1 && M > -1 && M != 0 && quad == "ur"){
							//right and up, favoring up
							if(L.includes("up")){
								md = "up";
							}else{
								md = "right";
							}				

						}else if(M < 1 && M > -1 && M != 0 && quad == "ll"){
							//left and down, favoring down
							if(L.includes("down")){
								md = "down";
							}else{
								md = "left";
							}				
					
						}else if(M < 1 && M > -1 && M != 0 && quad == "lr"){
							//right and down, favoring right
							if(L.includes("down")){
								md = "down";
							}else{
								md = "right";
							}			
							
							
						// - - - - - - --- - - - - - - --- - - - - - - --- - - - - - - ---	
						}else if(M == 1 || M == -1){
							if(Px > Gx){
								//L.includes("up")
								//PRDICGFO(x,y,GNo,l,r,u,d)
								if(Py < Gy){
									//up and right
									md = PRDICGFO(Gx,Gy,GNo,0,1,1,0);
								}else{
									//down and right
									md = PRDICGFO(Gx,Gy,GNo,0,1,0,1);
								}
							
							}else if(Px < Gx){
								//L.includes("up")
								//PRDICGFO(x,y,GNo,l,r,u,d)
								if(Py < Gy){
									//up and left
									md = PRDICGFO(Gx,Gy,GNo,1,0,1,0);
								}else{
									//down and left
									md = PRDICGFO(Gx,Gy,GNo,1,0,0,1);
								}							
							
							}
						
						}
					
					}/*else, the direction is likly alread solved, so skip it*/
					
					//determin what way it is going to go and alter dx or dy			 
					if(md=="left"){
						dx=-1;		//change x by -1
						GD=true;	//is has a direction
					}else if(md=="right"){
						dx=1;
						GD=true;
					}else if(md=="down"){
						dy=1;
						GD=true;
					}else if(md=="up"){
						dy=-1;
						GD=true;
					}

		
			}else{
				var M = gradient(Px,Py,Gx,Gy);//x1, y1, x2, y2
				var L = listIcanGo(Gx,Gy,GNo);
				var quad = ""; //can be either ul, ur, ll, lr.   upper left, upper right, lower left, lower right
			//the following ifs determin which quadrent the player is in, relative to the ghost
				if(Px == Gx){
					if(Py == Gy){
						//they are at the same location, take the same direction as the player
						md = playerDirection;
						
					}else{
						//player x is the same, but y coordiante is not - move up or down
					
						if(Py < Gy && L.includes("up") == true){
							//to the left of ghost
							md = "up";
							
						}else if(Py > Gy && L.includes("down") == true){
							//to the left of ghost
							md = "down";
							
						}else{				//l, r, u, d (1 = wanted)
							md = PRDICGFO(Gx,Gy,GNo, 1,1,0,0);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
						}
						
					}	
					
				//quad        can be either ul, ur, ll, lr.       upper left, upper right, lower left, lower right	
				}else if(Py == Gy){
					//ghost in same y-axis, but not at same x position

					if(Px < Gx && L.includes("left") == true){
						//to the left of ghost
						md = "left";
						
					}else if(Px > Gx && L.includes("right") == true){
						//to the left of ghost
						md = "right";
						
					}else{				//l, r, u, d (1 = wanted)
						md = PRDICGFO(Gx,Gy,GNo, 0,0,1,1);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
					}
					
					
					//quadrent method from here
				}else if(Px < Gx){				
					//player is to the left of ghost
					
					if(Py == Gy){
						//directly to the left
						
					}else if(Py < Gy){
						//player is left and up from ghost
						quad = "ul";
						
					}else if(Py > Gy){
						//player is left and down from ghost
						quad = "ll";
						
					}
					
				}else if(Px > Gx){
					//player is to the right of ghost
				
					if(Py == Gy){
						//directly to the right
						
					}else if(Py < Gy){
						//player is right and up from ghost
						quad = "ur";
						
					}else if(Py > Gy){
						//player is right and down from ghost
						quad = "lr";
					}
					
				}
				if(quad != ""){/*if the quadrent varible has been used, use it to determin direction*/
					if(M>1 && M != undefined && quad == "ul"){
						//left and up, favoing up
						if(L.includes("up")){
							md = "up";
						}else{
							md = "left";
						}
				
					}else if(M<-1 && M != undefined && quad == "ur"){
						//right and up, favouring up
						if(L.includes("up")){
							md = "up";
						}else{
							md = "right";
						}
						
					}else if(M<-1 && M != undefined && quad == "ll"){
						//left and down, favouring down
						if(L.includes("down")){
							md = "down";
						}else{
							md = "left";
						}				
					
					}else if(M>1 && M != undefined && quad == "lr"){				
						//right and down, favouring down
						if(L.includes("down")){
							md = "down";
						}else{
							md = "right";
						}				
					
					
					// - - - - - - - - - - - - - - - -- - - -- - - -- - 	
					}else if(M < 1 && M > -1 && M != 0 && quad == "ul"){
						//left and up, favoring left
						if(L.includes("left")){
							md = "left";
						}else{
							md = "up";
						}				
					
					}else if(M < 1 && M > -1 && M != 0 && quad == "ur"){
						//right and up, favoring right
						if(L.includes("right")){
							md = "right";
						}else{
							md = "up";
						}				

					}else if(M < 1 && M > -1 && M != 0 && quad == "ll"){
						//left and down, favoring left
						if(L.includes("left")){
							md = "left";
						}else{
							md = "down";
						}				
				
					}else if(M < 1 && M > -1 && M != 0 && quad == "lr"){
						//right and down, favoring right
						if(L.includes("right")){
							md = "right";
						}else{
							md = "down";
						}			
						
						
					// - - - - - - --- - - - - - - --- - - - - - - --- - - - - - - ---	
					}else if(M == 1 || M == -1){
						//if i can go in both directions, pick a random direction
						if(L.includes("up") && L.includes("left")){
							var RD = Math.floor(Math.random() * 2);
							if(RD == 1){
								md = "up";
							}else{
								md = "left";
							}
						}else if(L.includes("up") && L.includes("right")){
							var RD = Math.floor(Math.random() * 2);
							if(RD == 1){
								md = "up";
							}else{
								md = "right";
							}					
						}else if(L.includes("down") && L.includes("left")){
							var RD = Math.floor(Math.random() * 2);
							if(RD == 1){
								md = "down";
							}else{
								md = "left";
							}					
						}else if(L.includes("down") && L.includes("right")){
							var RD = Math.floor(Math.random() * 2);
							if(RD == 1){
								md = "down";
							}else{
								md = "right";
							}					
						}else{
						
						}
					
					}
				
				}/*else, the direction is likly alread solved, so skip it*/
				
				//determin what way it is going to go and alter dx or dy			 
				if(md=="left"){
					dx=-1;		//change x by -1
					GD=true;	//is has a direction
				}else if(md=="right"){
					dx=1;
					GD=true;
				}else if(md=="down"){
					dy=1;
					GD=true;
				}else if(md=="up"){
					dy=-1;
					GD=true;
				}

			}


			
		}else if(deadEnd == true){
			//turn around - it is a dead end
			//maybe add way so that ghost does not go down a dead end unless the player is there....?
			if(md=="left"){
				dx=1;		//change x/y by the opposite of what it normaly is
				GD=true;	//it has a direction
				md="right";	//set its direction to opposite way it was going
				
			}else if(md=="right"){
				dx=-1;
				GD=true;
				md="left";
				
			}else if(md=="down"){
				dy=-1;
				GD=true;
				md="up";
				
			}else if(md=="up"){
				dy=1;
				GD=true;
				md="down;"
			}
			//alert("dead End");
		}else{
			//junction has more than 4 entrances or we are surounded by wall
			GD=true; //cannot move, but i have a direction
			alert("ERROR 002/" + GNo + ": No solution");
		}
	}	


	if(GD==true /*&& testPosition(Gx+dx,Gy+dy)==true - causes error*/){
		unplot(Gx,Gy);
		
		if(mapNo == 6){
			if(BGP[GNo][0] + dx < 2){
				BGP[GNo][0] = 26;
			}else if(BGP[GNo][0] + dx > 26){
				BGP[GNo][0] = 2;
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;			
			}

		}else{
			if(BGP[GNo][0] + dx < 2){/*Should be validation to allow teleportation*/
				BGP[GNo][0] = 59;			
			}else if(BGP[GNo][0] + dx > 59){
				BGP[GNo][0] = 1;			
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;
			}		
		}
		BGP[GNo][1] = BGP[GNo][1] + dy;
		BGP[GNo][3] = md;

		ememyPlot(BGP[GNo][0],BGP[GNo][1],BGP[GNo][2]);

	}else{
		alert("ERROR 001/" + GNo + ": Not getting a direction");
	}

	
}



//functions to make the ghosts run away
function moveGhostsAWAY(GNo){

	/*
		This code should be the same as the random move ghosts function,
		except when choosing where to go at a junction, it will work out the direction it should go
	
		this does mean that any errors in the random / original function would be carried here
	
	*/	
	
	var dx = 0;				//The difference to be made to the ghost's x value
	var dy = 0;				//The difference to be made to the ghost's y value
	var Gx = BGP[GNo][0];	//The ghost's current X value
	var Gy = BGP[GNo][1];	//The ghost's current Y value
	var GD = false;			//Got direction - has the ghost determined which way it is to go (meant to follow after every alteration of dx or dy)
	var md = BGP[GNo][3];	//The ghost's current direction, although variable is mainly used to store the new direction of ghost
	var Px = playerX;		//The player's X value
	var Py = playerY;		//The player's Y value
	
	if(testPosition(Gx,Gy) == false){
		//this bit attempts to stop the ghost from destronying wall blocks  by 'killing' the ghost
		wallPlot(Gx,Gy);
		Gx = 30;
		Gy = 14;
		BGP[GNo][0] = Gx;
		BGP[GNo][1] = Gy;
	}
	
	if(mapNo == 2){
		if(Gx == 51 && Gy == 15 && Px < 25){/*if ghost is at a point near to the teleproter, (the junctions near it) go through it*/
			md = "right";
			dx = 1;
			GD = true;
		}else if(Gx == 53 && Gy == 15 && Px < 25){
			md = "right";
			dx = 1;
			GD = true;						
		}else if(Gx == 8 && Gy == 15 && Px > 35){
			md = "left";
			dx = -1;
			GD = true;
		}else if(Gx == 10 && Gy == 15 && Px > 35){	
			md = "left";
			dx = -1;
			GD = true;		
		}else{
			GD = false;
		}
	}	
	
	if(Px == Gx && Py == Gy){
		md = playerDirection;
		GD=true;
		//kill ghost
		BGP[GNo][0] = defaultStarts[2][0];
		BGP[GNo][1] = defaultStarts[2][1];
		
		//add validation here to ensure that ghost cannot move through walls	(if testpostiuon = false, do not change x/y values else do so)		 
		
	}else if(IsCorner(Gx,Gy) == 2){
		//it has two entrances - could be a true corner or a straight line
			//if true - turn and reset direction
		
		
		if(line(Gx,Gy)==0){
			
			if(md=="left"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}
				
			}else if(md=="right"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}				
				// -- -- -- --
			}else if(md=="up"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}				
				
			}else if(md=="down"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}					
			}
			//alert("Did corner");
		}else{
			//if false - it is a straight line   -- could i move it to the bit above?
			//this bit sometimes fails to work correctly
			if(md=="left"){
				dx=-1;
				GD=true;
				
			}else if(md=="right"){
				dx=1;
				GD=true;
				
			}else if(md=="down"){
				dy=1;
				GD=true;
				
			}else if(md=="up"){
				dy=-1;
				GD=true;
			}else{
				alert("error in straight");
			}
			//alert("Straight");
		}
			
	}else{
		//must be junction or dead end
		var deadEnd = false;
		
		if(md=="left"){
			if(testPosition(Gx-1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="right"){
			if(testPosition(Gx+1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="up"){
			if(testPosition(Gx,Gy-1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else if(md=="down"){
			if(testPosition(Gx,Gy+1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else{
			
		}		
		
		if(deadEnd==false){
			
	// ## ## ##  T H I S   I S   T H E   B I T   T H A T   H A S   B E E N   C H A N G E D   ## ## ##


			//go in opposite direction to player

			var M = gradient(Px,Py,Gx,Gy);//x1, y1, x2, y2
			var L = listIcanGo(Gx,Gy,GNo);
			var quad = ""; //can be either ul, ur, ll, lr.   upper left, upper right, lower left, lower right

			
			//the following ifs determin which quadrent the player is in, relative to the ghost
			if(Px == Gx){
				if(Py == Gy){
					//they are at the same location, take the same direction as the player					
					md = playerDirection;
					//I would die

				}else{
					//player x is the same, but y coordinate is not - move up or down
				
					//this if altered			@@
					if(Py < Gy && L.includes("down") == true){
						//to the left of ghost
						md = "down";
						
					}else if(Py > Gy && L.includes("up") == true){
						//to the left of ghost
						md = "up";

						
					}else{				//l, r, u, d (1 = wanted)
						md = PRDICGFO(Gx,Gy,GNo, 1,1,0,0);//up and down are wanted as the ghost cannot go its ideal direction so must change axis
					}
					
				}	
				
				
				
			//quad        can be either ul, ur, ll, lr.       upper left, upper right, lower left, lower right	
			}else if(Py == Gy){
				//ghost in same y-axis, but not at same x position

				if(Px < Gx && L.includes("right") == true){
					//to the left of ghost
					md = "right";
					
				}else if(Px > Gx && L.includes("left") == true){
					//to the left of ghost
					md = "left";
					
				}else{				//l, r, u, d (1 = wanted)
					md = PRDICGFO(Gx,Gy,GNo, 0,0,1,1);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
				}
				
				
				
				//quadrent method from here
			}else if(Px < Gx){				
				//player is to the left of ghost
				
				if(Py == Gy){
					//directly to the left
					
				}else if(Py < Gy){
					//player is left and up from ghost
					quad = "ul";
					
				}else if(Py > Gy){
					//player is left and down from ghost
					quad = "ll";
					
				}
				
			}else if(Px > Gx){
				//player is to the right of ghost
			
				if(Py == Gy){
					//directly to the right
					
				}else if(Py < Gy){
					//player is right and up from ghost
					quad = "ur";
					
				}else if(Py > Gy){
					//player is right and down from ghost
					quad = "lr";
				}
				
			}
			
			
			
			//if quadrent method used, use below to determin directions	
			/*
			quadrent method solves direction for the following player positions;
					- up   and left
					- up   and right
					- down and left
					- down and right
					
					- when gradient between 
					
			
				i.e; the player is not in a straight (not diagonal though) line to ghost 
			
			*/
			
//this little bit is copied from the move ghost directly towards player function, but with a few edits to encourage the ghost to cut off player 
			if(quad != ""){/*if the quadrant variable has been used, use it to determine direction*/
				if(M>1 && M != undefined && quad == "ul"){
					//left and up, -so go down and right, favouring right
					if(L.includes("right")){
						md = "right";
					}else{
						md = "down";
					}
			
				}else if(M<-1 && M != undefined && quad == "ur"){
					//right and up, - so ;left and down, favoing left
					if(L.includes("left")){
						md = "left";
					}else{
						md = "down";
					}
					
				}else if(M<-1 && M != undefined && quad == "ll"){
					//left and down, - so right and up, favoring right
					if(L.includes("right")){
						md = "right";
					}else{
						md = "up";
					}				
				
				}else if(M>1 && M != undefined && quad == "lr"){				
					//right and down, - so left and up, favouring left
					if(L.includes("left")){
						md = "left";
					}else{
						md = "up";
					}				
				
				
				// - - - - - - - - - - - - - - - -- - - -- - - -- - 	
				}else if(M < 1 && M > -1 && M != 0 && quad == "ul"){
					//left and up,  - so right and down, favouring down
					if(L.includes("down")){
						md = "down";
					}else{
						md = "right";
					}				
				
				}else if(M < 1 && M > -1 && M != 0 && quad == "ur"){
					//right and up, - so left and down, favouring down
					if(L.includes("down")){
						md = "down";
					}else{
						md = "left";
					}				

				}else if(M < 1 && M > -1 && M != 0 && quad == "ll"){
					//left and down, - so right and up, favouring up
					if(L.includes("up")){
						md = "up";
					}else{
						md = "right";
					}				
			
				}else if(M < 1 && M > -1 && M != 0 && quad == "lr"){
					//right and down, so left and up, favouring up
					if(L.includes("up")){
						md = "up";
					}else{
						md = "left";
					}			
					
					
				// - - - - - - --- - - - - - - --- - - - - - - --- - - - - - - ---	
				}else if(M == 1 || M == -1){
					//if i can go in both directions, pick a random direction
					if(L.includes("up") && L.includes("left")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "up";
						}else{
							md = "left";
						}
					}else if(L.includes("up") && L.includes("right")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "up";
						}else{
							md = "right";
						}					
					}else if(L.includes("down") && L.includes("left")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "down";
						}else{
							md = "left";
						}					
					}else if(L.includes("down") && L.includes("right")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "down";
						}else{
							md = "right";
						}					
					}else{
					
					}
				
				}
			
			}/*else, the direction is likly alread solved, so skip it*/
			
			//determin what way it is going to go and alter dx or dy

//		-altered this bit to make it opposite the directions it chose
			
			if(md=="left"){
				dx=-1;		//change x by -1
				GD=true;	//is has a direction
			
			}else if(md=="right"){
				dx=1;
				GD=true;
				
			}else if(md=="down"){
				dy=1;
				GD=true;
				
			}else if(md=="up"){
				dy=-1;
				GD=true;
	
			}
			//alert("junction");
			
		}else if(deadEnd == true){
			//turn around - it is a dead end
			//maybe add way so that ghost does not go down a dead end unless the player is there....?
			if(md=="left"){
				dx=1;		//change x/y by the opposite of what it normaly is
				GD=true;	//it has a direction
				md="right";	//set its direction to opposite way it was going
				
			}else if(md=="right"){
				dx=-1;
				GD=true;
				md="left";
				
			}else if(md=="down"){
				dy=-1;
				GD=true;
				md="up";
				
			}else if(md=="up"){
				dy=1;
				GD=true;
				md="down;"
			}
			//alert("dead End");
		}else{
			//junction has more than 4 entrances or we are surounded by wall
			GD=true; //cannot move, but i have a direction
			alert("ERROR 002/" + GNo + ": No solution");
		}
	}	

	if(GD==true /*&& testPosition(Gx+dx,Gy+dy)==true - causes error*/){
		unplot(Gx,Gy);
		
		if(mapNo == 6){
			if(BGP[GNo][0] + dx < 2){
				BGP[GNo][0] = 26;
			}else if(BGP[GNo][0] + dx > 26){
				BGP[GNo][0] = 2;
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;			
			}

		}else{
			if(BGP[GNo][0] + dx < 2){/*Should be validation to allow teleportation*/
				BGP[GNo][0] = 59;			
			}else if(BGP[GNo][0] + dx > 59){
				BGP[GNo][0] = 1;			
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;
			}		
		}
		BGP[GNo][1] = BGP[GNo][1] + dy;
		BGP[GNo][3] = md;

		ememyPlot(BGP[GNo][0],BGP[GNo][1],BGP[GNo][2]);

	}else{
		alert("ERROR 001/" + GNo + ": Not getting a direction");
	}

}

function moveGhostsAWAYtwo(GNo){

	
	var dx = 0;				//The difference to be made to the ghost's x value
	var dy = 0;				//The difference to be made to the ghost's y value
	var Gx = BGP[GNo][0];	//The ghost's current X value
	var Gy = BGP[GNo][1];	//The ghost's current Y value
	var GD = false;			//Got direction - has the ghost determined which way it is to go (meant to follow after every alteration of dx or dy)
	var md = BGP[GNo][3];	//The ghost's current direction, although variable is mainly used to store the new direction of ghost
	var Px = playerX;		//The player's X value
	var Py = playerY;		//The player's Y value
	
	if(testPosition(Gx,Gy) == false){
		//this bit attempts to stop the ghost from destronying wall blocks  by 'killing' the ghost
		wallPlot(Gx,Gy);
		Gx = 30;
		Gy = 14;
		BGP[GNo][0] = Gx;
		BGP[GNo][1] = Gy;
	}
	
	if(mapNo == 2){//this bit may be incorrect
		if(Gx == 51 && Gy == 15 && Px < 25){/*if ghost is at a point near to the teleproter, (the junctions near it) go through it*/
			md = "right";
			dx = 1;
			GD = true;
		}else if(Gx == 53 && Gy == 15 && Px < 25){
			md = "right";
			dx = 1;
			GD = true;						
		}else if(Gx == 8 && Gy == 15 && Px > 35){
			md = "left";
			dx = -1;
			GD = true;
		}else if(Gx == 10 && Gy == 15 && Px > 35){	
			md = "left";
			dx = -1;
			GD = true;		
		}else{
			GD = false;
		}
	}	
	
	if(Px == Gx && Py == Gy){
		md = playerDirection;
		GD=true;
		//add validation here to ensure that ghost cannot move through walls	(if testpostiuon = false, do not change x/y values else do so)		 
		//kill ghost
		BGP[GNo][0] = defaultStarts[2][0];
		BGP[GNo][1] = defaultStarts[2][1];
		
		
	}else if(IsCorner(Gx,Gy) == 2){
		//it has two entrances - could be a true corner or a straight line
			//if true - turn and reset direction
		
		
		if(line(Gx,Gy)==0){
			
			if(md=="left"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}
				
			}else if(md=="right"){
				if(testPosition(Gx,Gy-1)==true){
					//up
					dy=-1;
					GD=true;
					md="up";
					
				}else if(testPosition(Gx,Gy+1)==true){
					//down
					dy=1;
					GD=true;
					md="down";
				}				
				// -- -- -- --
			}else if(md=="up"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}				
				
			}else if(md=="down"){
				if(testPosition(Gx-1,Gy)==true){
					//left
					dx=-1;
					GD=true;
					md="left";
					
				}else if(testPosition(Gx+1,Gy)==true){
					//right
					dx=1;
					GD=true;
					md="right";
				}					
			}
			//alert("Did corner");
		}else{
			//if false - it is a straight line   -- could i move it to the bit above?
			//this bit sometimes fails to work correctly
			if(md=="left"){
				dx=-1;
				GD=true;
				
			}else if(md=="right"){
				dx=1;
				GD=true;
				
			}else if(md=="down"){
				dy=1;
				GD=true;
				
			}else if(md=="up"){
				dy=-1;
				GD=true;
			}else{
				alert("error in straight");
			}
			//alert("Straight");
		}
			
	}else{
		//must be junction or dead end
		var deadEnd = false;
		
		if(md=="left"){
			if(testPosition(Gx-1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="right"){
			if(testPosition(Gx+1,Gy)==false && testPosition(Gx,Gy-1)==false && testPosition(Gx,Gy+1)==false){
				deadEnd= true;
			}	
		}else if(md=="up"){
			if(testPosition(Gx,Gy-1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else if(md=="down"){
			if(testPosition(Gx,Gy+1)==false && testPosition(Gx-1,Gy)==false && testPosition(Gx+1,Gy)==false){
				deadEnd= true;
			}	
		}else{
			
		}		
		
		if(deadEnd==false){
			
	// ## ## ##  T H I S   I S   T H E   B I T   T H A T   H A S   B E E N   C H A N G E D   ## ## ##


			//go in opposite direction to player

			var M = gradient(Px,Py,Gx,Gy);//x1, y1, x2, y2
			var L = listIcanGo(Gx,Gy,GNo);
			var quad = ""; //can be either ul, ur, ll, lr.   upper left, upper right, lower left, lower right

			
			//the following ifs determin which quadrent the player is in, relative to the ghost
			if(Px == Gx){
				if(Py == Gy){
					//they are at the same location, take the same direction as the player					
					md = playerDirection;
					//I would die

				}else{
					//player x is the same, but y coordinate is not - move up or down
				
					//this if altered			@@
					if(Py < Gy && L.includes("down") == true){
						//to the left of ghost
						md = "down";
						
					}else if(Py > Gy && L.includes("up") == true){
						//to the left of ghost
						md = "up";

						
					}else{				//l, r, u, d (1 = wanted)
						md = PRDICGFO(Gx,Gy,GNo, 1,1,0,0);//up and down are wanted as the ghost cannot go its ideal direction so must change axis
					}
					
				}	
				
				
				
			//quad        can be either ul, ur, ll, lr.       upper left, upper right, lower left, lower right	
			}else if(Py == Gy){
				//ghost in same y-axis, but not at same x position

				if(Px < Gx && L.includes("right") == true){
					//to the left of ghost
					md = "right";
					
				}else if(Px > Gx && L.includes("left") == true){
					//to the left of ghost
					md = "left";
					
				}else{				//l, r, u, d (1 = wanted)
					md = PRDICGFO(Gx,Gy,GNo, 0,0,1,1);//up and down are wanted as the ghost cannot go its ideal directio so must chge axis
				}
				
				
				
				//quadrent method from here
			}else if(Px < Gx){				
				//player is to the left of ghost
				
				if(Py == Gy){
					//directly to the left
					
				}else if(Py < Gy){
					//player is left and up from ghost
					quad = "ul";
					
				}else if(Py > Gy){
					//player is left and down from ghost
					quad = "ll";
					
				}
				
			}else if(Px > Gx){
				//player is to the right of ghost
			
				if(Py == Gy){
					//directly to the right
					
				}else if(Py < Gy){
					//player is right and up from ghost
					quad = "ur";
					
				}else if(Py > Gy){
					//player is right and down from ghost
					quad = "lr";
				}
				
			}
			
			
			
			//if quadrent method used, use below to determin directions	
			/*
			quadrent method solves direction for the following player positions;
					- up   and left
					- up   and right
					- down and left
					- down and right
					
					- when gradient between 
					
			
				i.e; the player is not in a straight (not diagonal though) line to ghost 
			
			*/
			
//this little bit is copied from the move ghost directly towards player function, but with a few edits to encourage the ghost to cut off player 
			
			if(quad != ""){/*if the quadrant variable has been used, use it to determine direction*/
				if(M>1 && M != undefined && quad == "ul"){
					//left and up, -so go down and right, favouring down
					if(L.includes("down")){
						md = "down";
					}else{
						md = "right";
					}
			
				}else if(M<-1 && M != undefined && quad == "ur"){
					//right and up, - so ;left and down, favoing down
					if(L.includes("down")){
						md = "down";
					}else{
						md = "left";
					}
					
				}else if(M<-1 && M != undefined && quad == "ll"){
					//left and down, - so right and up, favoring up
					if(L.includes("up")){
						md = "up";
					}else{
						md = "right";
					}				
				
				}else if(M>1 && M != undefined && quad == "lr"){				
					//right and down, - so left and up, favouring up
					if(L.includes("up")){
						md = "up";
					}else{
						md = "left";
					}				
				
				
				// - - - - - - - - - - - - - - - -- - - -- - - -- - 	
				}else if(M < 1 && M > -1 && M != 0 && quad == "ul"){
					//left and up,  - so right and down, favouring right
					if(L.includes("right")){
						md = "right";
					}else{
						md = "down";
					}				
				
				}else if(M < 1 && M > -1 && M != 0 && quad == "ur"){
					//right and up, - so left and down, favouring left
					if(L.includes("left")){
						md = "left";
					}else{
						md = "down";
					}				

				}else if(M < 1 && M > -1 && M != 0 && quad == "ll"){
					//left and down, - so right and up, favouring right
					if(L.includes("right")){
						md = "right";
					}else{
						md = "up";
					}				
			
				}else if(M < 1 && M > -1 && M != 0 && quad == "lr"){
					//right and down, so left and up, favouring left
					if(L.includes("left")){
						md = "left";
					}else{
						md = "up";
					}			
					
					
				// - - - - - - --- - - - - - - --- - - - - - - --- - - - - - - ---	
				}else if(M == 1 || M == -1){
					//if i can go in both directions, pick a random direction
					if(L.includes("up") && L.includes("left")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "up";
						}else{
							md = "left";
						}
					}else if(L.includes("up") && L.includes("right")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "up";
						}else{
							md = "right";
						}					
					}else if(L.includes("down") && L.includes("left")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "down";
						}else{
							md = "left";
						}					
					}else if(L.includes("down") && L.includes("right")){
						var RD = Math.floor(Math.random() * 2);
						if(RD == 1){
							md = "down";
						}else{
							md = "right";
						}					
					}else{
					
					}
				
				}
			
			}/*else, the direction is likly alread solved, so skip it*/
			
			//determin what way it is going to go and alter dx or dy

//		-altered this bit to make it opposite the directions it chose
			
			if(md=="left"){
				dx=-1;		//change x by -1
				GD=true;	//is has a direction
			
			}else if(md=="right"){
				dx=1;
				GD=true;
				
			}else if(md=="down"){
				dy=1;
				GD=true;
				
			}else if(md=="up"){
				dy=-1;
				GD=true;
	
			}
			//alert("junction");
			
		}else if(deadEnd == true){
			//turn around - it is a dead end
			//maybe add way so that ghost does not go down a dead end unless the player is there....?
			if(md=="left"){
				dx=1;		//change x/y by the opposite of what it normaly is
				GD=true;	//it has a direction
				md="right";	//set its direction to opposite way it was going
				
			}else if(md=="right"){
				dx=-1;
				GD=true;
				md="left";
				
			}else if(md=="down"){
				dy=-1;
				GD=true;
				md="up";
				
			}else if(md=="up"){
				dy=1;
				GD=true;
				md="down;"
			}
			//alert("dead End");
		}else{
			//junction has more than 4 entrances or we are surounded by wall
			GD=true; //cannot move, but i have a direction
			alert("ERROR 002/" + GNo + ": No solution");
		}
	}	


	if(GD==true /*&& testPosition(Gx+dx,Gy+dy)==true - causes error*/){
		unplot(Gx,Gy);
		
		if(mapNo == 6){
			if(BGP[GNo][0] + dx < 2){
				BGP[GNo][0] = 26;
			}else if(BGP[GNo][0] + dx > 26){
				BGP[GNo][0] = 2;
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;			
			}

		}else{
			if(BGP[GNo][0] + dx < 2){/*Should be validation to allow teleportation*/
				BGP[GNo][0] = 59;			
			}else if(BGP[GNo][0] + dx > 59){
				BGP[GNo][0] = 1;			
			}else{
				BGP[GNo][0] = BGP[GNo][0] + dx;
			}		
		}
		BGP[GNo][1] = BGP[GNo][1] + dy;
		BGP[GNo][3] = md;

		ememyPlot(BGP[GNo][0],BGP[GNo][1],BGP[GNo][2]);

	}else{
		alert("ERROR 001/" + GNo + ": Not getting a direction");
	}

}



//functions to help move ghost

function listIcanGo(Gx,Gy,GNo){
	var LQ =[]
	if(testPosition(Gx,Gy-1)==true && 1< Gy < 29){
		LQ.push("up");
		if(BGP[GNo][3]=="up"){
		}else{	
			LQ.push("up");
		}
	}
	
	if(testPosition(Gx,Gy+1)==true && 1< Gy < 29){
		LQ.push("down");
		if(BGP[GNo][3]=="down"){			
		}else{	
			LQ.push("down");
		}
	}
	
	if(testPosition(Gx-1,Gy)==true){
		LQ.push("left");
		if(BGP[GNo][3]=="left"){			
		}else{	
			LQ.push("left");
		}
	}
	
	if(testPosition(Gx+1,Gy)==true){
		LQ.push("right");
		if(BGP[GNo][3]=="right"){			
		}else{	
			LQ.push("right");
		}
	}
		
	return LQ;
}

function line(x,y){
	
	if(testPosition(x-1,y) && testPosition(x+1,y)){
		return 1;
	}else if(testPosition(x,y-1) && testPosition(x,y+1)){
		return 2;
	}else{
		return 0;
	}
}

function RandomDirection(x,y){
	//prevent up when there is a block above
	var RD = Math.floor(Math.random() * 4)+1;
	//alert(RD);
	if(RD==1 && x>1 && testPosition(x-1,y)){
		return "left";
	}else if(RD==2 && y > 1 && testPosition(x,y-1)){
		return "up";	
	}else if(RD==3 &&y < 29 && testPosition(x,y+1)){
		return "down";
	}else if(RD==4 && x < 60 && testPosition(x+1,y)){
		return "right";
	}
	
}

function PRDICGFO(x,y,GNo,l,r,u,d){
/*
Pick Random Direction I Can Go From Options(x,y,GNo,l,r,u,d)

		where x = current x position, y = current y position, GNO = ghost number (reuqired for another function)
			l = left option, r = right option, u = up option, d = down option: for each option, 1 = wanted, 0 = not wanted
		
	this function picks a random direction for the ghost to go from a list of options that are valid

*/
		
	var ql = listIcanGo(x,y,GNo);
	var ML = [];
	
	if(ql.includes("left") == true && l == 1){
		ML.push("left");
	}
	if(ql.includes("right") == true && r == 1){
		ML.push("right");
	}
	if(ql.includes("up") == true && u == 1){
		ML.push("up");
	}
	if(ql.includes("down") == true && d == 1){
		ML.push("down");
	}	
		
	return ML[Math.floor(Math.random()*ML.length)];	
}

function RDIcanGo(Gx,Gy,GNo){
	
	var list = listIcanGo(Gx,Gy,GNo);
	var len = list.length;
	var R = Math.floor(Math.random() * len);
		
	return list[R];
}

function IsCorner(x,y){
	//determines if the point you are at is a corner or not
	//from 		  x,y
	var Junct = 0;
	if(testPosition(x,y-1)==true){
		Junct = Junct +1;
	}
	if(testPosition(x,y+1)==true){
		Junct = Junct +1;
	}
	if(testPosition(x-1,y)==true){
		Junct = Junct +1;
	}
	if(testPosition(x+1,y)==true){
		Junct = Junct +1;
	}
	
	return Junct;
	
}

function remove(array,item){

	var text = array.join(",");
	text = text.replace(item,"");
	var A = text.split(",");

	return A;
}

function notDownDeadEnd(Sx,Sy,DG){
	/*Make function that returns boolean result on weather or not it is a dead end*/
	var Cloop  = true;
	/*
		make invisible ghost that, much more quickly, goes down a particular path.
			- when going down this path, they will stop when they get to a junction or 
			  if they interact with the player.
			- if it is a dead end, then there would be no more junctions.
				however if the player is down there, then you want to go down there to kill them
			
	
	
	
	
	*/

	
	
	
}


/*Single line  functions*/
function gradient(x,y,X,Y){ /*Calculate and return the gradient between two points (x,y) and (X,Y)*/  return (Y-y)/(X-x);  }

function distance(x,y,X,Y){  /*Calculate the distance between two points*/  return Math.sqrt(((Y-y)*(Y-y))+((X-x)*(X-x))); }

function none(){}

function B2_false(){	Booleans[2]=false;	}

function refresh(){     /*refresh the page (Gets rid of all timers)*/   window.location.reload();	}

function OnL(){loadMap(6);}

//plot Functions
function unplot(x, y){
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}
	
	document.getElementById(id).classList.remove("wall","player","enemy5","coin","enemy1","enemy2","enemy3","enemy4","none","power","starer");
	if(dhf[y][x-1]==2){
		document.getElementById(id).classList.add("coin");
	}else if(dhf[y][x-1]==3){
		document.getElementById(id).classList.add("power");
	}else{
		document.getElementById(id).classList.add("none");
	}
}

function plot(x, y){
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}

	document.getElementById(id).classList.remove("wall","player","enemy5","coin","enemy1","enemy2","enemy3","starer","enemy4","none","power");
	document.getElementById(id).classList.add("wall");

}

function wallPlot(x, y){
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}
	document.getElementById(id).classList.remove("wall","player","enemy5","coin","enemy1","enemy2","enemy3","enemy4","starer","none","power");
	document.getElementById(id).classList.add("wall");

}

function coinPlot(x, y){
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}
	document.getElementById(id).classList.remove("wall","enemy5","player","coin","enemy1","enemy2","enemy3","enemy4","none","power","starer");
	document.getElementById(id).classList.add("coin");

}

function playerPlot(x, y){
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}
	document.getElementById(id).classList.remove("wall","player","enemy5","coin","enemy1","enemy2","enemy3","enemy4","none","power","starer");
	document.getElementById(id).classList.add("player");
	

}

function ememyPlot(x, y, c){
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}
	if(id != null){
		document.getElementById(id).classList.remove("wall","player","coin","enemy1","enemy2","enemy3","enemy4","none","power","starer","enemy5");
		
		if(Booleans[2]==true){
			document.getElementById(id).classList.add("enemy5");		
		}else{
			if(c==1){
				document.getElementById(id).classList.add("enemy1");	
			}else if(c==2){
				document.getElementById(id).classList.add("enemy2");	
			}else if(c==3){
				document.getElementById(id).classList.add("enemy3");	
			}else if(c==4){		
				document.getElementById(id).classList.add("enemy4");
			}
		}
	}
}

function powerPlot(x,y){
	//make similar to coin plot, with circle
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}
	
	document.getElementById(id).classList.remove("wall","player","coin","enemy5","enemy1","enemy2","enemy3","enemy4","none","power","starer");
	document.getElementById(id).classList.add("power");
	
}

function startPlot(x,y){
	//make similar to coin plot, with circle
	if(mapNo == 6){
		var id = sCreateID(x,y);
	}else{
		var id = CreateID(x,y);	
	}
	
	document.getElementById(id).classList.remove("wall","player","coin","enemy5","enemy1","enemy2","enemy3","enemy4","none","power","starer");
	document.getElementById(id).classList.add("starer");
	
}

function CreateID(x,y){

	var ID = "btn";
	ID = ID.concat(y);
	ID = ID.concat("_");
	ID = ID.concat(x);

return ID;
}

function sCreateID(x,y){

	var ID = "Sbtn";
	ID = ID.concat(y);
	ID = ID.concat("_");
	ID = ID.concat(x);

return ID;
}


//Player functions
function movePlayer(){
	
	unplot(playerX,playerY);			

	if(playerDirection == "up" && (playerY - 1)>0 && testPosition(playerX,playerY-1)){
		playerY = playerY - 1;		
		
	}else if(playerDirection == "down" && (playerY + 1)<30 && testPosition(playerX,playerY+1)){
		playerY = playerY + 1;		
		
	//i fear that the left and right may be wrong way round
	}else if(playerDirection == "left" && (playerX - 1)>0 && testPosition(playerX-1,playerY)){
		playerX = playerX - 1;
		
	}else if(playerDirection == "right" && (playerX + 1)<61 && testPosition(playerX+1,playerY)){		
		playerX = playerX + 1;
	}
	
	collision();
	tp();
	
	//alert("plotting player");
	playerPlot(playerX,playerY);

}

function changePlayerSkin(){
	//not working - try a differnet way
	for(var Y=1;Y<31;Y++){
		for(var X=1;X<61;X++){
		
			var ID = CreateID(X,Y);
			var O = document.getElementById(ID);
			
			if(ID.backgroundImage=="player2.jpg"){
				ID.style.backgroundImage="player1.jpg";
				
			}else if(ID.backgroundImage=="player1.jpg"){
				ID.style.backgroundImage="player2.jpg";
			}
		}
	}
	
}

function testPosition(x,y){

	var unblocked = true;

	/*if coordinates are a wall block,
			return false - this would then stop you from moving*/

	if(dhf[y][x-1]==1){
		unblocked = false;
		//blocked
	}else{
		unblocked = true;
		//unblocked
	}
	
	return unblocked;
}

function tp(){
	//teleports the player from one side of the screen to the other
	
	//14,15,16 is Y correlates
	//60 and 1 are X-coordinates
	if(mapNo == 6){

		if(playerX < 2){
			unplot(playerX,playerY);
			playerX = 27;
			playerPlot(playerX,playerY);
			
		}else if(playerX > 26){
			unplot(playerX,playerY);
			playerX = 1;
			playerPlot(playerX,playerY);			
		}

		
	
	}else{
		if(playerY==15||playerY==14||playerY==16){
			if(playerX == 1){
				unplot(playerX,playerY);
				playerX = 60;
				playerPlot(playerX,playerY);			
			}else if(playerX == 60){
				unplot(playerX,playerY);
				playerX = 1;
				playerPlot(playerX,playerY);			
			}

		}
	}
}

function collision(){

	//check if colliding with enemy
	for(var c=1;c<5;c++){
		if(playerY == BGP[c][1] && playerX == BGP[c][0]){
			if(Booleans[2]==true){
				//increase score
				kill(c);
				score = score + 50;
			}else{   DIE();   }	
		}
	}
	
	//check if colliding with coin?	
	if(dhf[playerY][playerX-1] == 2){
		score = score + 1;
		collectablesLeft = collectablesLeft -1;
		dhf[playerY][playerX-1] = 0;
		if(collectablesLeft < 1){  nextLevel();  }//if got all coins, move to next level
		
	}else if(dhf[playerY][playerX-1] == 3){
		dhf[playerY][playerX-1] = 0;
		//set to power up
		Booleans[2] = true;
		setTimeout(B2_false,powerTime);
	}

}

function DIE(){
	
	unplot(playerX,playerY);
	playerX = defaultStarts[1][0];
	playerY = defaultStarts[1][1];
	playerPlot(playerX,playerY);
	//send all ghosts back to spawn point
	
	for(var C = 1;C<(BGP.length);C++){ kill(C); }
	
	lives = lives - 1;
	if(lives<1){
		//end game
		//maybe state what their score was?....
		
		document.getElementById("dieMSg").style.display = "block";
		document.getElementById("deadScore").innerHTML = score;
		document.getElementById("deadLevel").innerHTML = level;
		gameStarted = false;
		//refresh();
	}

	
}

function kill(GNo){	

	unplot(BGP[GNo][0],BGP[GNo][1]);
	
	BGP[GNo][0] = defaultStarts[2][0];
	BGP[GNo][1] = defaultStarts[2][1];
}

function nextLevel(){
	Booleans[2] = false;
	for(var C = 1;C<BGP.length;C++){
		kill(C);
	}
	lives = lives + 1;
	stage = stage + 1;
	score = score + 100;
	document.getElementById("stage").innerHTML = stage;
	//increase speed until maxium speed about 75
	speed = speed - 1;
	if(speed >76){
		speed = speed - 3;
	}
	loadmap(mapNo);
}



//Keyboard Controls and functions
function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	/*
		*** KEYS USED ***
		
		UP Arrow 		or W	- 	Player Up
		Down Arrow 		or S	- 	Player Down
		Right Arrow 	or D	-	Move right
		Left Arrow		or A 	-	Move left
		
		V	- Load string function - current start
		C	- load empty
		P	- Show position
		Q	- Show score
		R	- refresh
		
		number keys for the amount of ghosts?
		1	- load Map 1
		2	- load map 2	
		3	- load map 3
		4	- load map 4
		
		
	*/
	
	if (x =="ArrowUp"||x=="w"||x=="W"){
		playerDirection = "up";					
		
	}else if (x =="ArrowDown"||x=="s"||x=="S"){
			playerDirection = "down";		

	}else if (x =="ArrowRight"||x=="d"||x=="D"){
			playerDirection = "right";

	}else if (x =="ArrowLeft"||x=="a"||x=="A"){
			playerDirection = "left";
	}else if(x=="~" ||  x=="#"){				
		lives = -5;
		DIE();
	}else if (x=="P"||x=="p"){
		playPause();
		
	}else if(x=="R"||x=="r"){
		refresh();	
		
	}else if (x=="q"||x=="Q"){
		//alert("Score: " + score +"\nPosition: ("+ playerX + " , " + playerY +")");

	}else if(Booleans[4]==true){
	
		if(x=="T"||x=="t"){	
			Pticker();
			
		}else if(x=="Y"||x=="y"){	
			Gticker();
			
		}else if(x=="i"||x=="I"){	
			toStart();
		}else if(x=="V"||x=="v"){		
			loadString();
	
		}else if(x=="Z"||x=="z"){	
			showTesting();
			
		}else if(x=="B"||x=="b"){	
			GameStart();	
			
		}else if(x=="1"){
			map1();
		}else if(x=="2"){
			map2();
		}else if(x=="3"){
			map3();
		}else if(x=="4"){		
			map4();
		}else if(x=="5"){		
			map5();		
		}else if(x=="6"){		
			map6();	
		}
	}
}

function toStart(){
	//loadString();// or set map
	if(gameStarted == false){
		stage = 1;
		score = 0;
		lives = 10;
		speed = 199;
		document.getElementById("dieMSg").style.display = "none";
		Hscore = localStorage.getItem("highscorePacMan");
		gameStarted = true;
		loadmap(6);
		Pticker();
		Gticker();
	}
}

function onloader(){
	document.getElementById("dieMSg").style.display = "none";	
}

function playPause(){

	if(Booleans[3]==true){
		oldSpeed = speed;
		speed = 9999999;
		Booleans[3] = false;
		//document.getElementById("PPB").value = "Pause (P)";
		
	}else{
		//document.getElementById("PPB").value = "Play (P)";	
		speed = oldSpeed;
		Booleans[3] = true;	
	
	}

}

function GameStart(){
	/*
	not used
	
	pick map
	load map
	set up speeds for ghosts and players
	set their X and Ys
	start their timers
	
	wait until collectables left = 0
	
	make game go quicker - decrease timers
	start game again
	*/

}

function Pticker(){/*the timer. when function is run, do these functions*/
	
	if(goIfEdge == true){
		
	}else{
		movePlayer();	
		if(Booleans[0] == true && gameStarted == true){
			setTimeout(Pticker,speed-(speed*0.15));
			Boolean[1] == true;
		}else{
			Boolean[1] == false;	
		}
		updateDisplay();
	}
	
}

function Gticker(){
	
	if(goIfEdge == true){
		
	}else{
	
		if(Booleans[1] == true){
		//do these actives of the player exists
			//if power up active, make all ghosts run away
			//else go towards player
		
			if(Booleans[2]==true){
				moveGhostsAWAY(1);
				moveGhostsAWAYtwo(2);
				moveGhostsAWAY(3);
				moveGhostsAWAYtwo(4);
			}else{
				FwMoveGhosts(1);
				type3moveGhosts(2);
				type4moveGhosts(3);
				RmoveGhosts(4);
			}

		}else{
			RmoveGhosts(1);
			RmoveGhosts(2);
			RmoveGhosts(3);
			RmoveGhosts(4);
			
		}
		collision();
		
		if(Booleans[0] == true && gameStarted == true){
			setTimeout(Gticker,speed);
		}
	}
}

function close(){
	document.getElementById("popUpMsg").style.display = "none";
}

function updateDisplay(){
	
	goIfedge = isEdge();
	if(goIfEdge == true){
		confirm("I`m Sorry, but I will not be working forEdge users Edge is Bad");
	}else{
		document.getElementById("score").innerHTML = "<b>" + score + "</b>";
		document.getElementById("lives").innerHTML = "<b>" + lives + "</b>";
		
		document.getElementById("score2").innerHTML = "<b>" + score + "</b>";
		document.getElementById("lives2").innerHTML = "<b>" + lives + "</b>";
		document.getElementById("stage").innerHTML =  "<b>" + stage + "</b>";
		
		if(score > Hscore){
			Hscore = score;
			localStorage.setItem(`highscorePacMan`, Hscore); 		
		}
		
		var nHs = localStorage.getItem("highscorePacMan");
		if(nHs == "undefined"){  nHS = 10;   }
		document.getElementById("HS").innerHTML =  "<b>" + nHs + "</b>";	
	}
}

function showTesting(){
	if(SHOWM == true){
		SHOWM = false;
	}else{
		SHOWM = true;
	}

}


//load new / different maps
function loadmap(N){
	if(N == 1){
		map1();
		
	}else if(N == 2){
		map2();
		
	}else if(N == 3){
		map3();
		
	}else if(N == 4){
		map4();
		
	}else if(N == 5){
		map5();
		
	}else if(N == 6){
		map6();
		
	}else{
	
	}

}

//currently, maps 1 to 5 do not load
{
function map1(){
	document.getElementById("otherSize").display="none";
	document.getElementById("fullPagePlayArea").display="block";
//			  0					10					20					30					40					50					60
//			   1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 	
	 dhf[1] =  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	 dhf[2] =  [1,0,2,0,2,0,1,1,1,2,0,0,2,0,2,0,2,0,0,2,0,0,1,1,1,0,0,2,0,0,2,0,0,0,1,1,1,0,0,2,0,0,2,0,0,2,0,2,0,2,0,1,1,1,0,2,0,2,0,1];
	 dhf[3] =  [1,0,1,1,1,0,2,0,0,0,1,1,0,1,1,1,0,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,0,1,2,1,1,1,0,1,1,1,1,0,2,0,2,0,1,1,1,2,1];
	 dhf[4] =  [1,2,1,1,1,0,1,1,1,1,1,0,2,0,0,1,2,1,1,0,2,0,1,1,1,0,1,1,1,0,1,0,2,0,1,1,1,0,1,2,1,0,1,1,1,2,0,2,0,1,1,1,1,1,2,1,1,1,0,1];
	 dhf[5] =  [1,0,1,1,1,2,0,2,0,0,1,2,1,1,2,1,0,2,0,2,1,2,0,0,2,0,1,1,1,2,0,2,1,0,2,0,2,0,1,0,2,0,2,0,2,0,1,1,2,1,1,1,1,1,0,1,1,1,2,1];
	 dhf[6] =  [1,0,2,0,2,0,1,0,1,2,1,0,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,0,2,0,2,1,1,0,2,0,2,0,1];
	 dhf[7] =  [1,1,0,1,1,1,1,3,1,0,1,2,1,1,2,0,0,1,1,0,2,1,1,2,0,2,0,2,1,2,1,0,2,0,0,1,1,1,1,2,1,0,3,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1];
	 dhf[8] =  [1,1,0,2,0,0,1,0,1,2,1,0,1,1,0,1,2,1,1,1,0,0,2,1,1,1,1,0,1,0,1,1,1,1,2,0,2,0,0,0,1,0,1,0,1,2,0,2,0,2,0,2,0,2,0,2,0,2,1,1];
	 dhf[9] =  [1,1,0,1,1,2,1,2,1,0,0,2,1,1,2,1,0,1,1,1,1,1,0,2,1,1,1,2,1,0,2,0,0,1,0,1,1,1,2,1,1,2,1,2,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1];
	 dhf[10] = [1,0,2,1,1,0,1,0,1,1,1,0,1,1,0,1,0,2,0,0,1,1,1,0,2,1,1,0,0,2,1,1,0,2,0,2,1,1,0,2,0,0,2,0,2,0,2,0,2,0,2,0,1,1,2,1,1,0,2,1];
	 dhf[11] = [1,0,1,1,1,2,1,2,0,2,1,2,1,1,2,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,2,0,2,1,1,0,1,2,1,1,1,1,1,2,1,0,2,1,0,1,1,1,0,1];
	 dhf[12] = [1,2,1,1,1,0,2,0,1,0,1,0,1,1,0,2,0,2,0,2,0,2,0,0,2,0,0,2,0,2,0,2,0,2,1,1,0,1,1,1,1,2,1,0,2,0,2,0,1,0,1,1,0,1,0,1,1,1,2,1];
	 dhf[13] = [1,0,1,1,1,2,1,1,1,2,0,2,1,1,1,0,1,1,1,1,1,1,1,2,1,1,1,0,1,1,1,1,1,0,1,1,2,1,0,2,0,0,1,2,1,1,1,0,2,0,2,0,2,1,2,1,1,1,0,1];
	 dhf[14] = [1,0,1,1,1,0,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,2,0,2,0,2,1,2,1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1];
	 dhf[15] = [0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,3,1,0,1,0,1,0,2,0,0,2,0,0,2,0,0,2,0,2,0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0];
	 dhf[16] = [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,2,1,1,1,2,1,2,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1,1,1,0,1];
	 dhf[17] = [1,2,1,1,1,0,1,0,2,0,0,2,1,2,0,2,1,2,0,2,0,2,1,2,1,0,1,0,2,0,2,0,1,0,0,2,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,2,1,1,1,2,1];
	 dhf[18] = [1,0,1,1,1,2,1,1,1,1,1,0,0,0,1,0,2,0,1,1,1,0,1,0,1,0,1,2,1,1,1,1,1,2,1,0,2,1,0,1,1,0,1,1,0,0,2,0,2,0,2,0,0,1,0,1,1,1,0,1];
	 dhf[19] = [1,2,1,1,1,0,1,1,1,1,1,2,1,1,1,1,0,1,1,0,0,2,0,2,0,2,0,0,2,0,2,0,2,0,1,1,0,0,2,0,1,2,1,1,2,1,1,0,1,1,1,0,1,1,2,1,1,1,2,1];
	 dhf[20] = [1,0,0,1,1,0,2,0,0,2,0,0,1,1,2,0,2,1,1,2,1,1,0,1,0,1,0,1,1,2,1,0,1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,2,1,1,1,2,0,2,0,1,1,0,0,1];
	 dhf[21] = [1,1,2,0,0,2,1,1,1,0,1,1,1,1,0,1,1,0,2,0,1,1,2,1,2,1,2,0,0,0,1,2,0,2,0,1,1,1,1,1,1,2,0,2,0,1,1,0,1,1,1,1,0,1,2,0,0,2,1,1];
	 dhf[22] = [1,1,0,1,1,1,1,2,0,2,0,0,3,1,2,1,1,0,1,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,0,2,0,0,2,0,1,0,1,1,2,1,1,0,2,0,2,0,2,1,1,1,1,0,1,1];
	 dhf[23] = [1,0,2,0,0,2,1,0,1,1,1,1,1,1,0,1,1,2,1,0,2,0,2,1,2,0,0,1,1,0,1,1,0,2,0,1,0,1,1,0,2,0,1,1,0,0,1,1,1,0,1,1,0,1,2,0,0,2,0,1];
	 dhf[24] = [1,0,1,1,1,0,0,2,0,2,0,0,2,0,2,0,2,0,0,2,1,1,1,1,1,1,2,1,1,2,1,1,0,1,1,1,2,1,1,1,0,1,1,1,1,0,2,1,1,2,1,1,2,0,0,1,1,1,0,1];
	 dhf[25] = [1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,2,1,1,0,2,0,0,1,0,1,0,2,0,2,1,0,0,2,1,0,0,2,0,0,1,0,0,0,0,1,1,1,1,2,1,1,1,2,1];
	 dhf[26] = [1,0,1,1,1,0,0,2,0,2,0,1,1,1,1,1,2,1,1,1,1,0,1,1,2,1,1,2,1,2,1,2,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,2,0,2,0,2,0,1,1,1,0,1];
	 dhf[27] = [1,2,0,0,2,0,1,1,1,1,0,2,0,0,2,0,0,2,0,2,0,2,0,2,0,1,1,0,2,0,2,0,1,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,1,1,1,0,2,0,0,3,1];
	 dhf[28] = [1,1,1,1,1,0,0,2,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,0,0,1,1,1,0,0,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,0,2,0,1,1,1,1,1];
	 dhf[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];


	loadString();
	mapNo = 1;
}

function map2(){
	document.getElementById("otherSize").display="none";
	document.getElementById("fullPagePlayArea").display="block";
//			  0					10					20					30					40					50					60
//			   1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 
	dhf[1]  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	dhf[2]  = [1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,1,1,1,1,2,0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,0,1,1,1,1,1,0,2,0,0,0,2,0,0,0,0,0,0,0,0,1];	
	dhf[3]  = [1,0,1,1,1,0,1,0,1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1,2,1,0,1,1,1,0,1];
	dhf[4]  = [1,2,1,1,1,0,1,2,1,0,0,2,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1];
	dhf[5]  = [1,0,1,1,1,0,1,0,1,0,1,1,1,1,2,1,1,1,1,1,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,2,1,1,1,1,1,2,1,1,1,1,0,1,0,1,0,1,1,1,0,1];
	dhf[6]  = [1,2,0,0,0,0,1,2,1,0,1,1,1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,1,1,1,0,1,2,1,0,0,0,0,0,1];
	dhf[7]  = [1,0,1,0,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1];
	dhf[8]  = [1,2,1,0,1,1,1,2,1,0,1,1,1,1,0,1,1,1,1,1,2,1,1,1,2,0,0,2,0,0,0,2,0,0,0,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,0,1,0,1,1,1,0,1,0,1];
	dhf[9]  = [1,0,1,0,0,0,0,0,0,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,0,0,2,0,0,0,0,1,0,1];
	dhf[10] = [1,2,1,0,1,1,1,2,1,0,1,1,1,1,0,1,1,1,1,1,2,1,1,1,0,1,1,0,0,0,0,0,1,1,2,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1];
	dhf[11] = [1,0,1,0,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,2,1,1,0,1,1,1,0,1,1,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,2,1,1,1,0,1,0,1];
	dhf[12] = [1,2,0,0,0,2,0,2,1,0,0,0,0,0,0,1,1,1,1,1,2,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,1,0,1,1,1,1,1,2,0,0,0,0,0,1,0,2,0,2,0,2,0,1];
	dhf[13] = [1,1,1,1,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1];
	dhf[14] = [1,1,1,1,1,1,1,2,1,0,1,1,1,1,0,0,0,2,0,0,0,0,0,0,2,0,0,2,0,0,0,2,0,0,2,0,0,0,0,0,0,0,2,0,0,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1];
	dhf[15] = [0,0,0,2,0,2,0,0,0,2,0,0,3,1,2,1,1,1,1,1,2,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,2,1,1,3,0,0,0,2,0,0,0,0,0,0,0];
	dhf[16] = [1,1,1,1,1,1,1,2,1,0,1,1,1,1,0,1,1,1,1,1,0,0,0,1,0,1,0,1,0,4,0,1,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1];
	dhf[17] = [1,1,1,1,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1];
	dhf[18] = [1,0,0,0,0,0,0,2,1,0,0,0,0,0,0,1,1,1,1,1,2,1,0,1,2,1,0,1,1,1,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0,0,1,2,0,2,0,2,0,2,1];
	dhf[19] = [1,0,1,0,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,2,1,1,1,1,1,2,1,1,1,1,0,1,0,1,1,1,0,1,0,1];
	dhf[20] = [1,0,1,0,1,1,1,2,1,0,1,1,1,1,0,1,1,1,1,1,2,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1];
	dhf[21] = [1,0,1,0,0,0,0,0,0,0,1,1,1,1,2,1,1,1,1,1,0,1,0,0,0,2,0,1,1,1,1,1,0,0,0,0,0,1,1,2,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,2,1];
	dhf[22] = [1,0,1,0,1,1,1,2,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,2,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1];
	dhf[23] = [1,0,1,0,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,0,1,0,1,1,1,0,1,2,1];
	dhf[24] = [1,0,0,0,0,0,1,2,1,0,1,1,1,1,0,0,0,2,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2,0,0,2,0,1,1,1,1,0,1,0,1,0,0,0,0,0,1];
	dhf[25] = [1,0,1,1,1,0,1,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,0,2,0,0,4,0,0,2,0,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,2,1,2,1,1,1,2,1];
	dhf[26] = [1,0,1,1,1,0,1,2,1,0,0,0,0,0,0,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1];
	dhf[27] = [1,0,1,1,1,0,1,0,1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,0,1];
	dhf[28] = [1,0,0,0,0,0,0,2,0,2,0,2,0,2,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
	dhf[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	//				^ Ghosts start in this colum (x = 30)
	
	//player Starting position	
	defaultStarts[1][0] = 30;
    defaultStarts[1][1] = 25;

	//ghost starting position
	defaultStarts[2][0] = 30;
	defaultStarts[2][1] = 16;	
	SATDP();

	mapNo = 2;	
	
	loadString();


	
}

function map3(){
	document.getElementById("otherSize").display="none";
	document.getElementById("fullPagePlayArea").display="block";
//			  0					10					20					30					40					50					60
//			   1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 
	dhf[1] 	= [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	dhf[2] 	= [1,0,0,2,0,0,2,0,0,0,0,2,0,0,2,0,0,0,2,0,0,2,1,1,1,0,2,0,2,0,2,0,2,0,1,1,1,0,2,0,2,0,2,0,2,0,0,2,0,0,2,0,2,0,2,0,2,0,2,1];
	dhf[3] 	= [1,2,1,1,1,1,1,1,0,1,2,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,2,1,1,1,0,1,1,2,1,1,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1];
	dhf[4] 	= [1,0,1,1,1,1,1,1,2,1,0,1,1,1,0,2,0,0,2,0,1,0,1,1,1,2,1,1,1,2,1,1,1,0,1,1,1,2,1,1,0,1,1,1,1,1,1,0,1,1,2,1,1,1,2,1,1,1,2,1];
	dhf[5] 	= [1,2,1,1,1,1,1,1,0,1,2,0,0,1,2,1,1,1,1,1,1,2,0,2,0,0,1,1,1,0,1,1,1,0,2,0,2,0,1,1,2,0,0,0,2,0,2,0,1,1,0,1,1,1,0,1,1,1,0,1];
	dhf[6] 	= [1,0,2,0,0,2,0,0,3,1,0,1,2,0,0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,3,0,2,0,2,1];
	dhf[7] 	= [1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,2,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1];
	dhf[8] 	= [1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1,1,2,0,2,0,0,2,0,2,0,2,0,0,2,0,0,2,0,0,2,0,2,0,2,0,2,0,1,1,2,1,1,1,1,1,1,1,2,1];
	dhf[9] 	= [1,0,1,1,0,1,1,1,1,1,0,1,0,0,2,1,1,1,0,0,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,0,1];
	dhf[10] = [1,2,1,1,0,1,2,0,2,0,2,1,1,1,0,0,2,0,2,1,0,2,0,2,0,0,0,2,1,1,1,2,0,0,2,1,1,2,1,1,2,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,2,1];
	dhf[11] = [1,0,1,1,0,2,0,1,0,1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,0,1];
	dhf[12] = [1,2,1,1,1,1,2,1,0,1,2,0,0,2,0,0,0,0,0,2,0,2,1,1,0,1,1,2,0,2,0,2,1,1,2,0,2,0,1,1,2,1,1,1,1,1,0,0,2,0,2,0,2,0,1,1,1,1,2,1];
	dhf[13] = [1,0,2,0,1,1,0,1,2,0,0,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,0,1,1,2,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,0,2,0,2,0,0,1];
	dhf[14] = [1,1,1,0,1,1,0,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,0,1,1,0,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1];
	dhf[15] = [0,0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,2,0,2,0,2,0,2,0,2,0,0,0];
	dhf[16] = [1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,0,1,1,2,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1];
	dhf[17] = [1,0,0,2,0,0,2,0,2,0,2,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,2,1,1,0,1,1,2,1,1,2,1,1,2,1,1,2,1,1,1,2,0,2,1];
	dhf[18] = [1,0,1,1,1,1,1,1,1,1,2,0,0,2,0,0,0,2,0,0,0,2,1,1,0,1,1,2,0,2,0,2,1,1,2,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,0,1];
	dhf[19] = [1,2,1,1,1,2,0,0,2,0,0,1,1,1,2,1,0,1,1,1,1,0,1,1,2,1,1,0,1,1,1,0,1,1,0,1,1,2,1,1,2,1,1,0,1,1,2,1,0,2,0,0,2,1,1,2,1,1,2,1];
	dhf[20] = [1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,2,1,1,0,0,0,2,0,0,2,0,0,1,1,1,0,0,2,0,2,0,0,1,1,0,1,1,2,1,1,0,2,0,1,1,1,0,1,1,0,1,1,0,1];
	dhf[21] = [1,2,0,2,0,0,1,1,1,1,2,0,2,0,0,1,0,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,2,0,2,0,0,2,0,1,1,1,1,1,2,1,1,0,1,1,2,1];
	dhf[22] = [1,0,1,1,1,2,1,1,1,1,0,1,1,2,1,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,0,2,0,0,1,1,2,1,1,0,1];
	dhf[23] = [1,2,1,1,1,0,1,1,1,1,0,1,1,0,1,1,2,1,2,0,2,0,0,2,0,0,2,1,1,2,1,1,2,0,2,0,2,0,2,0,2,1,0,2,0,2,1,1,2,1,1,1,2,1,1,0,1,1,0,1];
	dhf[24] = [1,0,1,1,1,0,2,0,3,0,2,0,0,2,0,2,0,0,0,1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1,0,1,2,1,1,0,1,1,0,1,1,1,0,1,3,0,2,0,2,1];
	dhf[25] = [1,2,1,1,1,2,1,1,1,1,1,1,1,0,1,1,1,1,2,1,1,2,0,2,0,0,1,2,1,0,1,2,1,2,0,0,2,0,1,1,0,1,0,1,1,0,2,0,0,2,0,2,0,2,0,1,1,1,0,1];
	dhf[26] = [1,0,1,1,1,0,1,1,1,1,1,1,1,2,1,1,1,1,0,0,0,0,1,1,1,0,1,0,1,2,1,0,1,0,1,1,1,0,1,1,2,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,2,1];
	dhf[27] = [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,2,1,2,1,0,1,2,1,0,1,1,1,2,1,1,0,1,2,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1];
	dhf[28] = [1,2,2,0,0,2,0,0,2,0,2,0,2,0,0,2,0,2,0,0,2,2,1,1,1,0,2,0,0,3,0,0,2,0,1,1,1,0,0,0,2,0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,2,1];
	dhf[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	
	
	loadString();
	//player Starting position	
	defaultStarts[1][0] = 26;
    defaultStarts[1][1] = 25;
	
	//ghost starting position
	defaultStarts[2][0] = 31;
	defaultStarts[2][1] = 17;	
	SATDP();	
	
	mapNo = 3;	
}
	
function map4(){
	document.getElementById("otherSize").display="none";
	document.getElementById("fullPagePlayArea").display="block";
//			  0					10					20					30					40					50					60
//			   1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 
		dhf[1]  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
		dhf[2]  = [1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1];	
		dhf[3]  = [1,2,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,2,1,1,1,1,1,1,1,1,1,2,1,2,1,1,0,1];
		dhf[4]  = [1,0,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,2,1];
		dhf[5]  = [1,2,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0,0,0,0,2,1,2,0,2,0,1];
		dhf[6]  = [1,0,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,1,0,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,1];
		dhf[7]  = [1,2,1,2,0,2,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,2,1,2,0,0,0,2,1,0,0,1,2,0,0,0,2,1,2,0,0,2,1,1,1,1,1,1,1,1,1,2,0,2,0,1,0,1];
		dhf[8]  = [1,0,1,0,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,0,2,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,2,1,2,1];
		dhf[9]  = [1,2,1,0,3,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,0,1,2,0,2,0,2,0,0,0,0,2,0,2,0,2,1,0,1,0,2,1,1,1,1,1,1,1,1,1,2,1,3,0,1,0,1];
		dhf[10] = [1,0,1,1,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,0,2,0,2,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,2,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,1];
		dhf[11] = [1,2,0,2,0,2,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1,0,2,1,1,1,1,1,1,1,1,1,2,0,2,0,2,0,1];
		dhf[12] = [1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,0,2,1,2,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,2,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1];
		dhf[13] = [1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,2,1,0,0,1,1,0,0,1,1,0,0,1,2,1,1,1,0,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1];
		dhf[14] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		dhf[15] = [0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0];
		dhf[16] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		dhf[17] = [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,2,1,0,0,1,1,1,1,1,1,0,0,1,2,1,1,1,0,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1];
		dhf[18] = [1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,2,1,2,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,2,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1];
		dhf[19] = [1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1,0,2,0,2,0,2,0,2,0,2,0,2,0,0,2,0,2,1];
		dhf[20] = [1,2,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,2,0,0,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1];
		dhf[21] = [1,0,1,0,2,0,2,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,1,0,1,2,0,2,0,2,0,0,0,0,2,0,2,0,2,1,0,1,0,2,1,1,1,1,1,1,1,1,1,2,0,2,0,1,2,1];
		dhf[22] = [1,2,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,2,1,2,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,2,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,2,1,0,1];
		dhf[23] = [1,0,1,0,3,1,2,1,1,0,1,1,1,1,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,3,0,1,2,1];
		dhf[24] = [1,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,2,0,2,0,2,0,2,1,1,1,1,0,1];
		dhf[25] = [1,0,2,0,2,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,2,0,2,1];
		dhf[26] = [1,2,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,0,1];
		dhf[27] = [1,0,1,1,2,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,2,1];
		dhf[28] = [1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1];
		dhf[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
		
	loadString();
	//player Starting position	
	defaultStarts[1][0] = 34;
    defaultStarts[1][1] = 25;
	
	//ghost starting position
	defaultStarts[2][0] = 34;
	defaultStarts[2][1] = 15;	
	SATDP();

	mapNo = 4;

}

function map5(){
	document.getElementById("otherSize").display="none";
	document.getElementById("fullPagePlayArea").display="block";
//			  0					10					20					30					40					50					60
//			   1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 
	dhf[1]  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	dhf[2]  = [1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1];
	dhf[3]  = [1,2,1,1,1,1,1,2,1,1,0,1,1,1,1,2,1,1,0,1,1,2,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,2,1,1,0,1,1,2,1,1,1,1,0,1,1,1,1,2,1,1,1,1,0,1];
	dhf[4]  = [1,0,1,1,1,1,1,0,1,1,2,1,1,1,1,0,1,1,2,0,2,0,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,0,2,0,2,1,1,0,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,1];
	dhf[5]  = [1,2,0,2,0,2,0,2,1,1,0,1,1,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,0,3,0,2,0,1];
	dhf[6]  = [1,0,1,1,1,1,1,0,1,1,2,1,1,1,1,0,1,1,1,1,1,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,1];
	dhf[7]  = [1,2,1,1,1,1,1,2,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,1,1,1,0,1,1,1,2,1,1,1,1,0,2,0,2,0,2,0,2,0,2,0,2,0,1,1,1,1,2,1,1,1,1,0,1];
	dhf[8]  = [1,0,1,1,1,1,1,0,2,0,1,1,1,1,1,0,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,0,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1,2,1,1,0,2,0,2,0,2,0,2,1];
	dhf[9]  = [1,2,1,1,1,1,1,2,1,2,0,2,0,3,1,2,1,1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,1,2,1,1,1,1,0,1,1,2,1,1,1,1,1,1,0,1];
	dhf[10] = [1,0,2,0,2,0,2,0,1,0,1,1,1,0,1,0,1,1,2,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,1,1,1,1,1,2,1,1,0,1,1,1,1,2,1,1,0,1,1,1,1,1,1,2,1];
	dhf[11] = [1,2,1,1,1,1,1,2,1,2,1,1,1,2,1,2,1,1,0,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,0,1,1,2,1,1,1,1,0,1,1,2,1,1,1,1,1,1,0,1];
	dhf[12] = [1,0,2,0,2,1,1,0,1,0,2,0,2,0,1,0,1,1,2,1,1,0,2,0,2,1,1,1,1,0,1,1,1,1,2,0,2,0,1,1,2,1,1,0,1,1,1,1,2,1,1,0,1,1,1,0,2,0,2,1];
	dhf[13] = [1,1,1,1,0,1,1,2,1,1,0,1,1,1,1,2,1,1,0,1,1,2,1,1,0,2,0,2,0,2,0,2,0,2,0,1,1,2,1,1,0,1,1,2,1,1,1,1,0,1,1,2,1,1,1,2,1,1,1,1];
	dhf[14] = [1,1,1,1,2,1,1,0,1,1,2,1,1,1,1,0,1,1,2,1,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,2,1,1,0,1,1,1,1,2,1,1,0,1,1,1,0,1,1,1,1];
	dhf[15] = [0,0,0,0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,1,1,1,1,2,1,0,1,2,1,1,1,1,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0];
	dhf[16] = [1,1,1,1,2,1,1,0,1,1,2,1,1,1,2,1,1,1,2,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,2,1,1,1,2,1,1,1,2,1,1,0,1,1,1,0,1,1,1,1];
	dhf[17] = [1,1,1,1,0,1,1,2,1,1,0,1,1,1,0,1,1,1,0,1,1,2,1,1,0,2,0,2,0,2,0,2,0,2,0,1,1,2,1,1,0,1,1,1,0,1,1,1,0,1,1,2,1,1,1,2,1,1,1,1];
	dhf[18] = [1,0,2,0,2,1,1,0,1,1,2,1,1,1,2,0,2,0,2,1,1,0,2,0,2,1,1,0,1,1,1,0,1,1,2,0,2,0,1,1,2,0,2,0,2,1,1,1,2,1,1,0,1,1,1,0,2,0,2,1];
	dhf[19] = [1,2,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,0,1,1,2,1,1,0,1,1,2,1,1,1,2,1,1,0,1,1,2,1,1,0,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,0,1];
	dhf[20] = [1,0,2,0,2,0,2,0,1,1,2,0,2,0,2,0,2,0,2,1,1,0,1,1,2,1,1,0,2,0,2,0,1,1,2,1,1,0,1,1,2,0,2,0,2,0,2,0,2,1,1,0,1,1,1,1,1,1,2,1];
	dhf[21] = [1,2,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,0,1,1,2,1,1,0,1,1,2,1,1,1,2,1,1,0,1,1,2,1,1,0,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,0,1];
	dhf[22] = [1,0,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,2,1,1,0,1,1,2,1,1,0,1,1,1,0,1,1,2,1,1,0,1,1,2,1,1,1,1,1,1,1,2,1,1,0,2,0,2,0,2,0,2,1];
	dhf[23] = [1,2,1,1,1,1,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1,1,1,1,2,1,1,1,1,0,1];
	dhf[24] = [1,0,1,1,1,1,1,0,1,1,2,1,1,1,1,0,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,1];
	dhf[25] = [1,2,0,2,0,2,0,3,1,1,0,1,1,1,1,2,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,0,3,0,2,0,1];
	dhf[26] = [1,0,1,1,1,1,1,0,1,1,2,1,1,1,1,0,1,1,2,0,2,0,1,1,2,1,1,0,1,1,1,0,1,1,2,1,1,0,2,0,2,1,1,0,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,1];
	dhf[27] = [1,2,1,1,1,1,1,2,1,1,0,1,1,1,1,2,1,1,0,1,1,2,1,1,0,1,1,2,1,1,1,2,1,1,0,1,1,2,1,1,0,1,1,2,1,1,1,1,0,1,1,1,1,2,1,1,1,1,0,1];
	dhf[28] = [1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,1,0,2,0,2,1,1,0,0,3,0,0,1,1,2,0,2,0,1,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1];
	dhf[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];	
	
	loadString();

	//player Starting position
	defaultStarts[1][0] = 30;
    defaultStarts[1][1] = 20;
	SATDP();
	
	mapNo = 5;	
	
}
}

function map6(){
	document.getElementById("otherSize").style.display="block";
	document.getElementById("fullPagePlayArea").style.display="none";
//			  0					10					20				
//			   1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 
	dhf[1]  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	dhf[2]  = [1,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1];
	dhf[3]  = [1,2,1,1,1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,1,1,2,1];
	dhf[4]  = [1,3,1,1,1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,1,1,3,1];
	dhf[5]  = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1];
	dhf[6]  = [1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1];
	dhf[7]  = [1,2,2,2,2,2,2,2,1,2,1,1,1,1,1,1,1,2,1,2,2,2,2,2,2,2,1];
	dhf[8]  = [1,1,2,1,1,1,1,2,1,2,2,2,2,1,2,2,2,2,1,2,1,1,1,1,2,1,1];
	dhf[9]  = [1,1,2,1,1,1,1,2,1,1,1,1,0,1,0,1,1,1,1,2,1,1,1,1,2,1,1];
	dhf[10] = [1,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,1];
	dhf[11] = [1,1,1,1,1,1,1,2,1,0,1,1,1,0,1,1,1,0,1,2,1,1,1,1,1,1,1];
	dhf[12] = [1,1,1,1,1,1,1,2,1,0,0,0,1,0,1,0,0,0,1,2,1,1,1,1,1,1,1];
	dhf[13] = [0,0,0,0,0,0,0,2,0,0,1,0,1,0,1,0,1,0,0,2,0,0,0,0,0,0,0];
	dhf[14] = [1,1,1,1,1,1,1,2,1,0,1,0,1,1,1,0,1,0,1,2,1,1,1,1,1,1,1];
	dhf[15] = [1,1,2,2,2,2,2,2,1,0,1,0,0,3,0,0,1,0,1,2,2,2,2,2,2,1,1];
	dhf[16] = [1,1,2,1,1,1,1,2,1,0,1,1,1,0,1,1,1,0,1,2,1,1,1,1,2,1,1];
	dhf[17] = [1,1,2,1,1,1,1,2,1,0,0,0,0,0,0,0,0,0,1,2,1,1,1,1,2,1,1];
	dhf[18] = [1,1,2,1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1,2,1,1];
	dhf[19] = [1,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1];
	dhf[20] = [1,2,1,1,1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,1,1,2,1];
	dhf[21] = [1,2,1,1,1,1,1,2,1,1,1,1,2,0,2,1,1,1,1,2,1,1,1,1,1,2,1];
	dhf[22] = [1,3,2,2,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,2,2,3,1];
	dhf[23] = [1,1,1,1,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,1,1,1,1];
	dhf[24] = [1,1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,1];
	dhf[25] = [1,2,2,2,2,2,2,2,1,1,2,2,2,1,2,2,2,1,1,2,2,2,2,2,2,2,1];
	dhf[26] = [1,2,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,2,1];
	dhf[27] = [1,2,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,2,1];
	dhf[28] = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1];
	dhf[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];	

	
	
	mapNo = 6;
	defaultStarts[1][0] = 14;
    defaultStarts[1][1] = 22;
	
	defaultStarts[2][0] = 14;
    defaultStarts[2][1] = 10;

	SATDP();	
	
	loadStringSmall();
	

}

function loadStringSmall(){
	
	collectablesLeft = 0;
	SATDP();
	playerPlot(playerX,playerY);
	
	for (var i = 1; i < 30; i++) {
		for (var c = 0; c < 27; c++) {
			//alert(dhf[i][c] + "  c:" + c + "   i:" + i);
			if (dhf[i][c] ==0) {
				unplot(c+1, i);
				
			}else if(dhf[i][c] == 1){
				wallPlot(c+1, i);

			}else if(dhf[i][c] == 2){
				coinPlot(c+1, i);
				collectablesLeft = collectablesLeft + 1;
				
			}else if(dhf[i][c] == 3){
				powerPlot(c+1, i);
				
			}else if(dhf[i][c] == 4){	
				startPlot(c+1,i);
				
			}else{
				//alert("error occurred: line 333");
			}
		}
	}

}

function loadString(){
	collectablesLeft = 0;
	SATDP();
	playerPlot(playerX,playerY);
	for (var i = 1; i < 30; i++) {
		for (var c = 0; c < 60; c++) {
			//alert(dhf[i][c] + "  c:" + c + "   i:" + i);
			if (dhf[i][c] ==0) {
				unplot(c+1, i);
				
			}else if(dhf[i][c] == 1){
				wallPlot(c+1, i);

			}else if(dhf[i][c] == 2){
				coinPlot(c+1, i);
				collectablesLeft = collectablesLeft + 1;
				
			}else if(dhf[i][c] == 3){
				powerPlot(c+1, i);
				
			}else if(dhf[i][c] == 4){	
				startPlot(c+1,i);
				
			}else{
				//alert("error occurred: line 333");
			}
		}
	}
	//alert("Loaded string");
	
}

function SATDP(){
	//Set All To Default Positions
	playerX = defaultStarts[1][0];
	playerY = defaultStarts[1][1];


		BGP[1][0] = defaultStarts[2][0];
		BGP[1][1] = defaultStarts[2][1];

		BGP[2][0] = defaultStarts[2][0];
		BGP[2][1] = defaultStarts[2][1];
		         
		BGP[3][0] = defaultStarts[2][0];
		BGP[3][1] = defaultStarts[2][1];
		       
		BGP[4][0] = defaultStarts[2][0];
		BGP[4][1] = defaultStarts[2][1];

	
}

/*Cheat Functions*/{
	function changeScoreBy(x){
		score = score + x;
		return score;
	}
	function giveMeLives(x){
		lives = lives + x;
		return Lives;
	}
	function AddLevel(x){
		level = level + x;
		return level;
	}
}

//directions are	"up", "down","left","right"	relative to the screen

var goIfEdge = isEdge();
function isEdge(){
	var isChromium = window.chrome;
	var winNav = window.navigator;
	var vendorName = winNav.vendor;
	var isOpera = typeof window.opr !== "undefined";
	var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
	var isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
	   // is Google Chrome on IOS
	}else if(
	  isChromium !== null &&
	  typeof isChromium !== "undefined" &&
	  vendorName === "Google Inc." &&
	  isOpera === false &&
	  isIEedge === false
	){
		return false;
	} else { 
	   // not Google Chrome 
		if(/Edg/.test(navigator.userAgent)==true){
			return true;

		}else{
			return false;
		}
	}	
}


var playerDirection = "up";


var defaultStarts = [];
{
	defaultStarts[1] = [33,6];//current starting position for the player
	defaultStarts[2] = [14,13];//where the ghost will start
}


var level = 1;
var playerY = 6;
var playerX = 33;
//player start (33,25)

var collectablesLeft = 219;

var lives = 10;
var score = 0;
var stage = 1;

var Hscore = localStorage.getItem("highscorePacMan");
if(Hscore == "undefined"){  Hscore = 10;   }
//document.getElementById("HS").innerHTML =  "<b>" + Hscore + "</b>";	

var powerTime = 6000;

var speed = 200;//max speed 75
var oldSpeed = speed;

var SHOWM = false;

var mapNo = 2;

/*
		Booleans Array
	this array is full of the true or false varibles, condensed into a single array
	
	below are thier meanings / uses
	
	Container NO.	Meaning	
		0			Timers True ? - are the timers allowed to be going
		1			Player is Active / existing
		2			Power UP active?
		3			Play? (true if playing)
*/
var gameStarted = false;
var Booleans = [true,true,false,true,false];
