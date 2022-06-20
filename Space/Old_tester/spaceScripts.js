

function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var x = event.key;

	if (x =="ArrowUp"||x=="w"||x=="W"){				
		//forward
		//moveForward(speed);
		
	}else if (x =="ArrowDown"||x=="s"||x=="S"){
		//back
		//moveForward(-speed);
		
	}else if (x =="ArrowRight"||x=="d"||x=="D"){
		//rotate right
		//rotate(Aspeed);
		
	}else if (x =="ArrowLeft"||x=="a"||x=="A"){
		//rotate left
		//rotate(-Aspeed);
		
		
	}else if (x=="P"||x=="p"){
		//console.log("P was pressed\n\n\n\n\n HA HA HA HA HA HA HA");
		oy = 0;
		ox = 0;	
		setObjectPosition(oy,ox);
	}else if(x=="R"||x=="r"){
		//moveForward(30);
	}else if(x=="G"||x=="g"){
		if(canGo==true){
			canGo = false;
		}else{
			canGo = true;
		}
		console.log("canGo is now " + canGo);
	
	
	}else if(x=="C"||x=="c"){
		generateListofPointsOfCircle(4,4,3);
	}	
}	
function mouseAction(){
	var mx = event.clientX;
	var my = event.clientY;
	px = mx;
	py = my;
	collision3();
			//-  half of the players width and height
	R[0] = [mx+(pw),my+(ph)]
	R[1] = [mx+(pw),my-(ph)]
	R[2] = [mx-(pw),my-(ph)]
	R[3] = [mx-(pw),my+(ph)]
	setPlayer1Position(mx-(pw),my-(ph));
}	
function setPlayer1Position(x,y){
	document.getElementById("object1").style.top = y;
	document.getElementById("object1").style.left = x;
	
	//Collision2();//calling collision here seems to work
	
	collision3();
	
	//console.log("Player X = " + x  + "\nPlayer Y = " + y);
}	
function setObjectPosition(x,y){
	document.getElementById("object2").style.top = y-40;//conversion facotor
	document.getElementById("object2").style.left = x;
	console.log("Object X = " + x  + "\nObject Y = " + y);
}

var canGo = false;

var px = 0;
var py = 0;
var ph = 40;
var pw = 40;

var oy = 0;
var ox = 0;
var oh = 20;
var ow = 20;

function Collision2(){
	// # # # # # # # # # # #  W O R K S !   # # # # # # # # # # #
	var Col = false;
	/*
	basically looks at two square objcects and determins if they are colliding

	*/
	for(var CX = px;CX<(px+pw);CX++){
		for(var CY = py;CY<(py+ph);CY++){
			var COD = [CX,CY];
			var TB = oy;//top left
			var LB = ox;//top right
			var RB = ox+ow;//bottom left
			var BB = oy+oh;//bottom right
			if(TB < CY && CY < BB && LB < CX && CX < RB){
				console.log("Collision detected between Player and Object 1");
			}
		}
	}
	
	
	return Col;
}

function collision3(){
	/*
		generate/get list of places that object 1 is
		generate/get list of places that object 2 can is
		
		look through the lists to see if any of the points match
		
		you have the positions and dimensions of each
	*/
	var O1 = [];
	O1 = generateListofPointsOfPolygon(SHIPA);
	
	for(var c = 0;c<O1.length;c++){
		for(var d = 0;d<R.length;d++){
			if(O1[c]==R[d]){
				console.log("Collision detected \nType: 3\n");
			}
		}
	}
}


var R = [];
R[0] = [0,0];
R[1] = [0,2];
R[2] = [2,2];
R[3] = [2,0];


var SW = 100;
var SH = 100;
var SX = 0;
var SY = 0;


var SHIPA = [];{
/*For the fighter 1bj.jpg file, these are the percentages that each corner is at
	in SW and SH put in the relative width nd ehight and then this array should be a 
	list of thier positions

		
	BUT THERE NEEDS TO BE ITS COORDINATES TO ENSURE THAT IT IS MORE CLEARLY MARKED

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
	console.log("Generating List of points");
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
			console.log(" a = " + a + "\nb = "+b+"\ns = " + s+"\nand m = "+m);		
			/*
				Need to complete for when m = undefind and perhaps when m = 0
					undefind = striaght line where x = a specfiic single value
						equation would give no results
						the while loop would also not work, as it relise on there being a differnece in the x values
					0 -> the equation would give correct results
			
			*/
			div = 0.1;
			if(m==undefined || m==Infinity || m == -Infinity){
				console.log("M is undefined");
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
						console.log("Generating Y for X = " + x);
						f = [x,y];
						output.push(f);	
						x = x+div;					
					}
				}else{
					x=s;
					while(x<s){
						y = m*(x-a)+b;
						console.log("Generating Y for X = " + x);
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
			console.log("Final a = " + a + "\nb = "+b+"\ns = " + s+"\nand m = "+m);
			//now have equation, y = m(x-a)+b		
			div = 0.1;
			
			if(m==undefined || m==Infinity || m == -Infinity){
				console.log("M is undefined");
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
						console.log("Generating Y for X = " + x);
						f = [x,y];
						output.push(f);	
						x = x+div;					
					}
				}else{
					x=s;
					while(x<s){
						y = m*(x-a)+b;
						console.log("Generating Y for X = " + x);
						f = [x,y];
						x = x+div;
						output.push(f);				
					}
				}
			}
	}	
	/*console.log("\nOutput;\n");	
	for(var c=0;c<output.length;c++){
		console.log(output[c][0]+", "+output[c][1]);
	}*/

	console.log("\nNow for the rounded Output;\n");	
	for(var c=0;c<output.length;c++){
		console.log(myRound(output[c][0],3)+", "+myRound(output[c][1],3));
	}
	return output;
}
	
var div = 0;
function myRound(x,d){/* Round the specifide number (x) to (d) number of decimal places*/return Math.round(x*Math.pow(10,d))/Math.pow(10,d);}


function generateListofPointsOfCircle(cx,cy,r,veiwOutput){
	//like the ploygon, this one generates a list of points that are on the circumfrence of  a circle with center (cx,cy) and radius r
	
	/*based of (x-a)^2 * (y-b)^2 = r^2
		rearranged gives y = b +or- sqrt(r^2 - (x-a)^2)
	
	*/
	console.log("Starting circle stuff");
	var output = [];
	var cvx = 0;
	var Div = 0.1;
	
	while(cvx<1000){

		var G = r*r - (cvx-cx)*(cvx-cx);
		var y = 0;
		//do this if, as the value of G must be positive;
		if(G>0 ||G==0){
			y = cy + Math.sqrt(G);
			f = [cvx,y];
			output.push(f);
			y = cy - Math.sqrt(G);
			f = [cvx,y];
			output.push(f);
		}
		cvx = cvx + div;
	}
	if(veiwOutput==true){
		for(var c=0;c<output.length;c++){
			console.log(myRound(output[c][0],3)+", "+myRound(output[c][1],3));
		}	
	}
	return output;
}

function Atahn(x){
	//a tester for the Math.atan() function
	
	
	console.log("In radians: " + Math.atan(x)+"\nIn degrees: " + (180/Math.PI) * Math.atan(x));
}


