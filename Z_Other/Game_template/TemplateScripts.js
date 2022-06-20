

var  GameMap = []; /*This varible stores what teh background should be*/
{
	GameMap[1]  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	GameMap[2]  = [1,0,2,0,2,0,2,0,2,0,2,0,2,1];	
	GameMap[3]  = [1,2,1,1,1,1,1,2,1,2,1,1,0,1];
	GameMap[4]  = [1,0,1,1,1,1,1,0,1,0,1,1,2,1];
	GameMap[5]  = [1,2,0,2,0,0,0,2,1,2,0,2,0,1];
	GameMap[6]  = [1,0,1,1,1,1,1,0,1,1,1,1,2,1];
	GameMap[7]  = [1,2,1,2,1,1,1,2,0,2,0,1,0,1];
	GameMap[8]  = [1,0,1,0,1,1,1,0,1,1,2,1,2,1];
	GameMap[9]  = [1,2,1,0,1,1,1,2,1,3,0,1,0,1];
	GameMap[10] = [1,0,1,1,1,1,1,0,1,1,1,1,2,1];
	GameMap[11] = [1,2,0,2,1,1,1,2,0,2,0,2,0,1];
	GameMap[12] = [1,1,1,1,1,1,1,0,1,1,1,1,1,1];
	GameMap[13] = [1,1,1,1,1,1,1,2,1,1,1,1,1,1];
	GameMap[14] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	GameMap[15] = [0,0,2,0,0,2,0,2,0,0,0,0,0,0];
	GameMap[16] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	GameMap[17] = [1,1,1,1,1,1,1,2,1,1,1,1,1,1];
	GameMap[18] = [1,1,1,1,1,1,1,0,1,1,1,1,1,1];
	GameMap[19] = [1,0,2,0,0,2,0,2,0,0,2,0,2,1];
	GameMap[20] = [1,2,1,1,1,1,1,0,1,1,1,1,0,1];
	GameMap[21] = [1,0,1,0,1,1,1,2,0,2,0,1,2,1];
	GameMap[22] = [1,2,1,0,1,1,1,0,1,1,2,1,0,1];
	GameMap[23] = [1,0,1,0,1,1,1,0,1,3,0,1,2,1];
	GameMap[24] = [1,2,1,1,0,2,0,2,1,1,1,1,0,1];
	GameMap[25] = [1,0,2,0,1,1,1,0,1,0,2,0,2,1];
	GameMap[26] = [1,2,1,1,1,1,1,2,1,2,1,1,0,1];
	GameMap[27] = [1,0,1,1,1,1,1,0,1,0,1,1,2,1];
	GameMap[28] = [1,2,0,2,0,2,0,2,0,2,0,2,0,1];
	GameMap[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
}	


//plot Functions
/*These fucntions are needed to change the colour of the table*/

function plot(x, y){
	//this function save some space. It creates the id of the target to change the styling
	id = CreateID(x,y);	
	
	//add or remove class names in the first line 
	document.getElementById(id).classList.remove("plot","unplot");
	//where is says 'plot', change it to the class name you want to make 
	document.getElementById(id).classList.add("plot");
	
}

function unplot(x, y){
	
	id = CreateID(x,y);
	document.getElementById(id).classList.remove("plot","unplot");
	document.getElementById(id).classList.add("unplot");
	
}

function CreateID(x,y){
//saves space
	var ID = "btn";
	ID = ID.concat(y);
	ID = ID.concat("_");
	ID = ID.concat(x);

return ID;
}

function testPosition(x,y){
//This function returns true if you can exist at a certain position

	var unblocked = true;
	
		//change the '1' in '==1' to the same value as the stuff that you cannot pass through
	if(GameMap[y][x-1]==1){
		unblocked = false;
	}else{
		unblocked = true;
	}
	
	return unblocked;
}

function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	
	if (x =="ArrowUp"||x=="w"||x=="W"){				
		
	}else if (x =="ArrowDown"||x=="s"||x=="S"){	

	}else if (x =="ArrowRight"||x=="d"||x=="D"){

	}else if (x =="ArrowLeft"||x=="a"||x=="A"){
	
	//add the keyboard characters in the "". there are two, becuase often A or a would be used. 
	}else if (x==""||x==""){
	
	}
}

function loadString(){
//set each table cell in the table to the value stored in the record 
	for (var i = 1; i < GameMap.length; i++) {
		for (var c = 0; c < GameMap[i].length; c++) {

			if (GameMap[i][c] ==0) {
				unplot(c+1, i);
			
			//copy the following and alter the values and function name to add a different colour/styling
			}else if(GameMap[i][c] == 1){
				plot(c+1, i);

			}else{
			}
		}
	}
	
}

