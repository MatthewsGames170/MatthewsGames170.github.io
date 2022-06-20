
//With special Thanks to Andrew Twigg for helping me cut down 
//the amount of code by about 3200 lines 

/*

 - - - * * *IDEAS* * * - - - 
 have a Database(DB) connected to it
 specifically, connected to a file, which the add new level will try and 
 connect to DB. 
 
 have several methods that allow website to run even when it cannot connect
 
 change font for score button
 padding may be solution for play pause size difference
 
 
*/

{
function pop() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function back(){
	document.getElementById("dieMsg").style.display = "none";
	refresh();
}

function onPageLoad() {
//gets the highscore and displays it 
	document.getElementById("audio_1").controls =false;
  for (i=0; i<6; i++) {
    highscores[i] = localStorage.getItem(`highscore${i}`)
  }
  document.getElementById("highscore").innerHTML = "Highscore: ".concat(Math.max(...highscores));
}

function whichButton(){
	//determine which keyboard key was pressed and do action required by italics
	var y = document.getElementById("output").innerHTML;
	var x = event.key;
	
	/*
		*** KEYS USED ***
		
		UP Arrow 		or W	- 	Player Up
		Down Arrow 		or S	- 	Player Down
		Right Arrow 	or D	-	Move right by one
		
		T 		-	Open cheats menu
		I 		-	Open / close additional buttons
		P 		-	Play / Pause
		K		-	Instant Die	
		F 		- 	Refresh
		R 		-	Refresh
		H 		-	open help menu
		Q		-	change score by 1 000 000 (if admin = true)
		0 to 90	-	Start at special speed
		X 		-	Increase Speed by 10
		Z 		-	Decrease speed by 10
		M 		-	Activate Admin
	*/
	
	if(cheatPageOpen == "false"){
		if (x=="Backspace"){
	
		} else if (x == "z" || x == "Z") {	
			if((waitTime - 10) > -1 &&Admin=="true"){
				waitTime = waitTime - 10;
			}else{
				alert("Sorry, you cannot do this action");			
			}
			
		} else if (x == "x" || x == "X") {
			if(Admin=="true"){
				waitTime = waitTime + 10;
			}else{
				alert("Sorry, you cannot do this action");
			}

		}else if(x=="m" || x=="M"){
			activateAdmin();
		}else if (x =="c"||x=="C"){
			if(colOpen == false){
				colOpen = true;
				P = "false";
				document.getElementById("colourPicker").style.display = "block";
				
			}else{
				colOpen = false;
				document.getElementById("colourPicker").style.display = "none";
				P = "true";				
			}
		}else if (x =="ArrowUp"||x=="w"||x=="W"){
			//if up arrow pressed, go up
			playerUp();
			closeImp();
			
		}else if (x =="ArrowDown"||x=="s"||x=="S"){
			//if down arrow pressed, go down
			playerDown();
			closeImp();		

		}else if (x =="ArrowRight" && buttonPressed == 1||x=="d"&& buttonPressed == 1||x=="D" && buttonPressed == 1){
			if(RightSpeed = true){
				eachTime();
			}
		}else if(x=="~" ||  x=="#"){
			DIE();
		}else if(x == "u" || x=="U"){			
			if(Admin=="true"){
				speedV();
			}
		
		}else if(x == "t" || x=="T"){
			openCheats();
			cheatPageOpen = "true";
		
		}else if(x == "i" || x=="I"){

			if(iopen =="true"){
				iopen="false";
				closeImp();
			}else{
				openImp();
				iopen="true";
			}

		} else if (x == "k" || x == "K") {
			DIE();
		
		}else if(x =="p" || x =="P"){
			if(P == "false"){
				play();
			}else{
				pause();
			}
			
		}else if(x=="f"||x=="F"||x==" "){
			back();
			
		}else if(x=="l"||x=="L"){			
			if(Admin=="true"){
				alert(TQWW);
			}else{
				alert("Sorry, you cannot do this action");
			}
			
		}else if(x=="R"||x=="r"){
			refresh();
			
		}else if(x=="Enter"){
			refresh();
			
		}else if(x=="H"||x=="h"){
			showHelp();	
	
		}else if(x=="q"||x=="Q"){
			if(Admin=="true"){
				score = score + 1000000;
			}else{
				alert("Sorry, you cannot do this action");
			}
			
		//starting keys
		}else if(x=="1"){
			T_beginer();
			
		}else if(x=="2"){
			T_easy();
			
		}else if(x=="3"){
			T_med();
			
		}else if(x=="4"){
			T_hard();
		
		}else if(x=="5"){
			T_VHard();
			
		}else if(x=="6"){
			T_EHard();	
		
		}else {
			//not really needed, just from test code		
			y = y.concat(x);
			document.getElementById("output").innerHTML=y;
		}
	}
}

}

//Highscore stuff here - thanks to Andrew Twigg
{
function displayScore() {
  document.getElementById("score").innerHTML = "Score: ".concat(score);
  document.getElementById("speedS").innerHTML = "Speed: ".concat(waitTime);
  document.getElementById('highscore').innerHTML = "Highscore: ".concat(highscores[currentDifficulty]);  
}

function displayHighscore() {
  if (score > highscores[currentDifficulty]) {
    highscores[currentDifficulty] = score;
	newHS = true;
  }

}
function setHighscore() {

	cheatPageOpen = "true";	//disables the keyboard interaction
	document.getElementById("nameInput").style.display = "block";	//opens the user input for the name
	localStorage.setItem(`highscore${parseInt(currentDifficulty)}`, highscores[currentDifficulty]); 
  
  //localStorage.setItem(`highscore${parseInt(currentDifficulty)}`, getUserName())
}

function resetHighscores() {
  if (Admin == "true") { 
    for (i=0; i<8; i++) {
      localStorage.removeItem(`highscore${i}`);
	  localStorage.removeItem(`HSname${i}`);
      highscores[i] = 0;
    }
    displayHighscore();
  }else{
	alert("Sorry, you do not have Admin Privileges");
	closeImp();
  }
}

function getUserName(){

	var x = document.forms["hsName"]["username"].value;
	//alert(currentDifficulty + x);
	localStorage.setItem(`HSname${parseInt(currentDifficulty)}`,x);	
	newHS = false;
	cheatPageOpen = "false";
	document.getElementByID("nameInput").style.display = "none";	


}

function validateUsername(testThis){
/*
get value
look at the word to determine if it is invalid

functiuon contains to see if it contains certain strings

return value of true or false, true is OK proceed
 
*/
if(testThis)

return x;
}

function decrypt(item){

}

function encrypt(item){

}


function resetHighscores() {
  if (Admin == "true") { 
    for (i=0; i<8; i++) {
		resetHS(i);
    }
    displayHighscore();
  }else{
	alert("Sorry, you do not have Admin Privileges");
	closeImp();
  }
}

}

// Button controls
{
function showHelp(){
	if(help=="false"){
		//open help menu
		help = "true";

		document.getElementById("backDiv").style.display = "block";
	}else{
		//close help menu
		help = "false";
		document.getElementById("backDiv").style.display = "none";
	}
}

function play(){
	P = "true";
	document.getElementById("pause").innerHTML="<b>Pause </b>(P)";
	document.getElementById("play").style.display="none";
}
function pause(){
	P = "false";
	document.getElementById("pause").innerHTML="<b>Play </b>(P)";
	document.getElementById("play").style.display="none";
}

function T_beginer(){
	if (buttonPressed==0){
		currentDifficulty = difficulties.beginner;
		diff = "beginner";
		buttonPressed = 1;
		fadeMain();
		waitTime = 600;		
		ForEachRun();
	}
}
function T_easy(){
	if (buttonPressed==0){
		currentDifficulty = difficulties.easy;
		diff = "easy";
		buttonPressed = 1;
		fadeMain();	
		waitTime = 500;		
		ForEachRun();
	}
}
function T_med(){
	if (buttonPressed==0){
		currentDifficulty = difficulties.medium;
		diff = "Medium";
		buttonPressed = 1;
		fadeMain();	
		waitTime = 400;		
		ForEachRun();
	}
}
function T_hard(){
	if (buttonPressed==0){
		currentDifficulty = difficulties.hard;
		diff = "Hard";
		buttonPressed = 1;
		fadeMain();	
		waitTime = 300;		
		ForEachRun();
	}
}
function T_VHard(){
	if (buttonPressed==0){
		currentDifficulty = difficulties.vhard;
		diff = "VHard";
		buttonPressed = 1;
		fadeMain();	
		waitTime = 200;		
		ForEachRun();
	}
}
function T_EHard(){

	if (buttonPressed==0){
		currentDifficulty = difficulties.ehard;		
		diff = "EHard";
		buttonPressed = 1;
		fadeMain();	
		waitTime = 100;		
		ForEachRun();
	}

}

function T_reset(){
	
	if(buttonPressed==1){
		refresh();
		fadeMain();
		buttonPressed=0;
	}
	

}

function T_IMP(){
	if (buttonPressed==0){
		currentDifficulty = difficulties.impossible;	
		buttonPressed = 1;
		fadeMain();
		waitTime = 5;		
		ForEachRun();
		closeImp();	
	}
}
function T_Slow(){

		if(Admin =="true"){
			if (buttonPressed==0){
				buttonPressed = 1;
				currentDifficulty = difficulties.slow;	
				fadeMain();	
				closeImp();
				waitTime = 1452251598501;		
				ForEachRun();
			}
		}else{
			alert("Sorry, you do not have Admin privileges");
		}
	
}

function openImp(){
	document.getElementById("impBtn").style.display = "block";
	document.getElementById("alternative").style.display = "block";
	document.getElementById("controlArea").style.display = "none";
	document.getElementById("lwich").style.display = "none";
	
}
function closeImp(){
	document.getElementById("impBtn").style.display = "none";
	document.getElementById("alternative").style.display = "none";
	document.getElementById("controlArea").style.display = "block";
	document.getElementById("lwich").style.display = "block";
}

function fadeReset(){
	document.getElementById("btn_reset").style.opacity="0.5";
	
	document.getElementById("btn_beginer").style.opacity="1";
	document.getElementById("btn_easy").style.opacity="1";
	document.getElementById("btn_med").style.opacity="1";
	document.getElementById("btn_hard").style.opacity="1";
	document.getElementById("btn_VHard").style.opacity="1";
	document.getElementById("btn_EHard").style.opacity="1";	
	document.getElementById("btn_imp").style.opacity="1";
	document.getElementById("btn_slow").style.opacity="1";
}
function fadeMain(){
	document.getElementById("btn_reset").style.opacity="1";
	
	document.getElementById("btn_beginer").style.opacity="0.5";
	document.getElementById("btn_easy").style.opacity="0.5";
	document.getElementById("btn_med").style.opacity="0.5";
	document.getElementById("btn_hard").style.opacity="0.5";
	document.getElementById("btn_VHard").style.opacity="0.5";
	document.getElementById("btn_EHard").style.opacity="0.5";
	document.getElementById("btn_imp").style.opacity="0.5";
	document.getElementById("btn_slow").style.opacity="0.5";
}
function refresh(){
	window.location.reload();	
}

function speedV(){

	if(speedV == "false"){
		document.getElementByID(speedS).stlye.display = "block";
		speedV = "true";
		
	}else{
		document.getElementByID(speedS).stlye.display = "none";	
		speedV = "true";
	}

}

}

// -- -- -- from here is code that is vital to game play -- -- --    -- -- --    -- -- --   -- -- --   -- -- --    -- -- -- --

function ERROR(){
	alert("Error detected");
}


//changing dots functions
{
//Andrews version

function unplot(x, y) {
  // credit: Andrew Twigg

  // where x = y and y = x
  // set a specified location to enemy
  // plot works

  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.remove("player", "empty","enemy","powerUp","lazer","slime");
  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.add("empty");
}

function plot(x, y) {
  // credit: Andrew Twigg

  // set a specified location to empty

  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.remove("player", "empty","enemy","powerUp","lazer","slime");
  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.add("enemy");
}

function playerPlot(x, y) {
  // credit: Andrew Twigg

  // set a specified location to player

  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.remove("player", "empty","enemy","powerUp","lazer","slime");
  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.add("player");
}

function powerPlot(x, y) {
  //thanks to Andrew Twigg for this

  // set a specified location to power ups (blue)

  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.remove("player", "empty","enemy","powerUp","lazer","slime");
  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.add("powerUp");
}

function lazerplot(x, y) {
  //thanks to Andrew Twigg for this

  // set a specified location to lazers

  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.remove("player", "empty","enemy","powerUp","lazer","slime");
  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.add("lazer");
}

function slimePlot(x, y) {
  //thanks to Andrew Twigg for this

  // set a specified location to the slime blocks

  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.remove("player", "empty","enemy","powerUp","lazer","slime");
  document
    .querySelector(`.Row${y}`)
    .querySelectorAll(".dot")
    [x - 1].classList.add("slime");
	
}

}


function setColours(){

	//get values from form
	emptyC = document.forms["colourPicker"]["backC"].value;
	playerC = document.forms["colourPicker"]["pc"].value;
	emC = document.forms["colourPicker"]["ec"].value;
	lazC = document.forms["colourPicker"]["lc"].value;
	powerC = document.forms["colourPicker"]["pvc"].value;
	
	alert(playerC);
	document.getElementById("colourPicker").style.display = "none";
}

function defaultCols(){
//enter defualt / old version of colours
 emptyC = "#4ef5b9";
 playerC = "yellow";
 emC = "red";
 lazC = "#D23EFF";
 powerC = "blue";
}

//use local (or session ?) storage for setting colours

//player controls
{
function playerUp(){
//move the player up one block
	if(P == "true"&& Q == "true"){
		if (PlayerY - 1 < 1){

		}else if(dead==0){
			unplot("1",PlayerY);
			PlayerY = PlayerY - 1;
			playSound(0);
			playerPlot("1",PlayerY);
		}

		Collision();
	}
}

function playerDown(){
//move the player down one block
	if(P == "true" && Q == "true"){
		if (PlayerY + 1 > 8){

		}else if(dead==0){
			unplot("1",PlayerY);
			PlayerY = PlayerY + 1;
			playSound(0);
			playerPlot("1",PlayerY);
		}
		Collision();
	}

}

}

//collisions() and its functions
{
function Collision(){

	if (B_X[0][PlayerY - 1] == "1" && death == "true") {
		DIE();
	}else if(B_X[0][PlayerY - 1] == "2"){
		powerUp();	
	}else if(B_X[0][PlayerY - 1] == "4"){
		slime();
	}else if(B_X[0][PlayerY - 1] == "3"){
		lazer();
	}
}

function DIE(){
//what happens when you collide with a block
	if(dead==0){
		dead = 1;
		playSound(1);
		if(newHS == true){	
			setHighscore();
		}else{
			document.getElementById("dieMsg").style.display = "block";
		}
	}
}

function powerUp(){
	var RR = Math.floor(Math.random() * 4);
	var WWT = Math.floor(Math.random() * 5500) + 4524;
	if (RR == 0){
		if(death == "true"){
			waitTime = waitTime + 200;
			setTimeout(qwe,WWT);
		}
		
	}else if (RR == 1){
		if(death == "true"){
			waitTime = waitTime - 30;
			setTimeout(rty,WWT);
		}
	}else if (RR == 2){
		if(death=="true"){
			death == "false";
			setTimeout(uio,WWT);
		}
	}else if (RR == 3){
		score = score + 100
		
	}else if(RR == 4){
		clearPath();
	
	}else{
		score = score - 0.2*score;
	}
}

function slime(){
	waitTime = waitTime + 5000;
}

function lazer(L){
	
	var E = PlayerY - 1;

	B_X[1][E] = "0";
	B_X[2][E] = "0";
	B_X[3][E] = "0";
	B_X[4][E] = "0";
	B_X[5][E] = "0";
	B_X[6][E] = "0";
	light_up_Dots();
	
}

function qwe(){

	waitTime = waitTime - 200;

}
function rty(){
	waitTime = waitTime + 30;

}
function uio(){
	death = "true";
}

}

//best score on impossible with death turned off - 650000 (ish)
//achived a score of 4166 in extremely hard (before speed changing without admin was found)

function resetHS(HS){
	//reset a specific highscore
	var HStoReset = HS;									//set to 100 as default score to beat
	localStorage.setItem(`highscore${parseInt(HStoReset)}`,100); //change the number here to set the numerical part
	localStorage.setItem(`HSname${parseInt(HStoReset)}`,"<i>High score has been reset</i>");//change the string to set the name part 
}

function activateAdmin(){
	
	if(admin == "false"){
		var P = prompt("Entering Admin Mode\n\nPlease enter The Password");
		if(P == "admin_root_start-up_password:(fhsaiej4)!`~@-sheep_-3"){
			if(confirm("Are you sure you want Admin Privilages?")){
				admin = "true";
				console.log("Admin Controls Enabled");
			}
		}else{
			console.log("Are you trying to cheat?");
		}
	}else{
		console.log("Admin Controls Disabled");
		admin = "false";		
	}
	
	
}

//uncomment the below and enter a number (0 to 6) 		(o is beginner, 2 is easy etc to 6 being extremly hard)
//to manually reset a score

	//resetHS(5);
	
	
//all global variables are set up here

//core running functions
{
function light_up_Dots(){
	//Thanks to Andrew for Cutting this down by 300 lines

	for (var i = 0; i < 20; i++) {
		var Len = B_X[0].length;
		for (var c = 0; c < Len; c++) {
			if (B_X[i][c] == "0") {
				unplot(i + 1, c + 1);
				
			}else if(B_X[i][c] =="2"){
				powerPlot(i + 1, c + 1);

			}else if(B_X[i][c] =="4"){
				slimePlot(i + 1, c + 1);
						
			}else if(B_X[i][c] =="3"){
				lazerplot(i + 1, c + 1);
				
			}else{
				plot(i + 1, c + 1);
			}
		}
	}

	
	//alert("activated and done the plotting loops");
}

function ForEachRun(){
	eachTime();
	setTimeout(ForEachRun,waitTime);
}

function eachTime(){
	if(P == "true"){
		if(dead==0){
			Q = "true";
			update_Lines();
			update_X_20();
			light_up_Dots();
			if (dead == 0) {
				displayScore();
				displayHighscore();
			}
			playerPlot(1, PlayerY);
		}
	}else{

	}
}

function update_Lines(){

	for(var c = 0;c<8;c++){
		//alert("loop ".concat(c));
	
		for (var i = 0; i < 19; i++) {
			//thanks to Andrew for this little loop 
			B_X[i][c] = B_X[i + 1][c];
		}
		Collision();
		
		//this section just create a random dot, which is NOT necessarily passable
		/*var R = Math.floor(Math.random() * 2);
		if (R == 0){
			B_X20[c] = "0";			
	
		}else{
			B_X20[c] = "1";			
		}	
		*/

	}

}

}

//get file stuff - not in use
{
function pickFileName(){
	//still making you have to say how many sections there are
	R_19 = Math.floor(Math.random() * (NoRandoms+1));
	CFileName = "codeFor_R".concat(R_19);
	
	
	
	return CFileName;
}

function getFileString(fileFrom){
	
	//get full string from file
	
	
	
	
	
	lst = split(FullString,";");
	lst = lst.pop();
	//lst becomes an array of strings containing
}

function putStringToArray(){
	//use this function each time the random sections are told to run?

	B_X[19] = split(lst[stage], ",");
	
}

}

//Audio stuff
var soundInProgress = false;
var SoundList = [];
//in form [filepath,  duration]
SoundList[0] = ["../Z_Audio/notSo_movement_a.mp3",0.5];//for moving
SoundList[1] = ["../Z_Audio/noSo_die.mp3",2];//for dying

function playSound(n){
	if(soundInProgress==false){
		soundInProgress = true;
		switchSound(n);
		document.getElementById("audio_1").play();
		console.log("Audio now playing sound " + n);
		setTimeout(stopSound,SoundList[n][1]*1000);		
	}
}
function switchSound(n){
	if(n>-0.00000001 && n<SoundList.length){
		document.getElementById("audio_1").src  = SoundList[n][0];
	}else{
		console.log("Container " + n + " does not exist");
	}
}
function stopSound(){
	document.getElementById("audio_1").pause();		
	console.log("Audio now stopped");
	soundInProgress = false;	
}


//run sections

function update_X_20(){	

	stage = stage + 1 ;
	score = score + 1;
	//level = 1;
	
	if(level==1){

		update_20_for_Lvl_1();
		//level = -1;//enable this to skip to ramdon levels
	}else if(level == 2){
		update_20_for_Lvl_2();
		
	}else{	
		if (level == -1){
			R_20 = Math.floor(Math.random() * (NoRandoms+1));

			TQWW = SQWW;
			SQWW = R_20;	
			level = -2;
			stage = 0;
		
			
			/*
			Ideally,  something along the lines of ;
			
			> pick random file (name) from those in storage
			> call getFileString() to read the file and upload its contents
			
			>if a file is alread loaded, call putStringToArray() and load the stages row.
			
			
			------
			this would require the stages to be controled else where and to be exacly N stages in each random section 
			- which would happen as every stage (worthwhile converting) would have to be put through the makeCode
			
			
			
			all files will be in Section_files folder
			
			*/			
			
		}else{

			
			if(R_20 == 1)        {update_20_for_R1();			
			}else if (R_20 == 2) {update_20_for_R2();
			}else if (R_20 == 3) {update_20_for_R3();
			}else if (R_20 == 4) {update_20_for_R4();
			}else if (R_20 == 5) {update_20_for_R5();	
			}else if (R_20 == 6) {update_20_for_R6();	
			}else if (R_20 == 7) {update_20_for_R7();	
			}else if (R_20 == 8) {update_20_for_R8();	
			}else if (R_20 == 9) {update_20_for_R9();
			
			}else if (R_20 == 10){update_20_for_R10();	
			}else if (R_20 == 11){update_20_for_R11();			
			}else if (R_20 == 12){update_20_for_R12();	
			}else if (R_20 == 13){update_20_for_R13();
			}else if (R_20 == 14){update_20_for_R14();
			}else if (R_20 == 15){update_20_for_R15();
			}else if (R_20 == 16){update_20_for_R16();
			}else if (R_20 == 17){update_20_for_R17();
			}else if (R_20 == 18){update_20_for_R18();
			}else if (R_20 == 19){update_20_for_R19();
			
			}else if (R_20 == 20){update_20_for_R20();
			}else if (R_20 == 21){update_20_for_R21();
			}else if (R_20 == 22){update_20_for_R22();
			}else if (R_20 == 23){update_20_for_R23();
			}else if (R_20 == 24){update_20_for_R24();
			}else if (R_20 == 25){update_20_for_R25();
			}else if (R_20 == 26){update_20_for_R26();
			}else if (R_20 == 27){update_20_for_R27();
			}else if (R_20 == 28){update_20_for_R28();
			}else if (R_20 == 29){update_20_for_R29();
			
			}else if (R_20 == 30){update_20_for_R30();
			}else if (R_20 == 31){update_20_for_R31();
			}else if (R_20 == 32){update_20_for_R32();
			}else if (R_20 == 33){update_20_for_R33();
			}else if (R_20 == 34){update_20_for_R34();
			}else if (R_20 == 35 && currentDifficulty < 5){update_20_for_R35();
			}else if (R_20 == 36){update_20_for_R36();
			}else if (R_20 == 37){update_20_for_R37();
			}else if (R_20 == 38){update_20_for_R38();
			}else if (R_20 == 39){update_20_for_R39();
			
			}else if (R_20 == 40){update_20_for_R40();
			}else if (R_20 == 41){update_20_for_R41();
			}else if (R_20 == 42){update_20_for_R42();
			}else if (R_20 == 43){update_20_for_R43();
			}else if (R_20 == 44){update_20_for_R44();
			}else if (R_20 == 45){update_20_for_R45();
			}else if (R_20 == 46){update_20_for_R46();
			}else if (R_20 == 47){update_20_for_R47();
			}else if (R_20 == 48){update_20_for_R48();
			}else if (R_20 == 49){update_20_for_R49();
			
			}else if (R_20 == 50){update_20_for_R50();
			}else if (R_20 == 51){update_20_for_R51();
			}else if (R_20 == 52){update_20_for_R52();
			}else if (R_20 == 53){update_20_for_R53();
			}else if (R_20 == 54){update_20_for_R54();
			}else if (R_20 == 55){update_20_for_R55();
			}else if (R_20 == 56){update_20_for_R56();
			}else if (R_20 == 57){update_20_for_R57();
			}else if (R_20 == 58){update_20_for_R58();
			}else if (R_20 == 59){update_20_for_R59();

			}else if (R_20 == 60){update_20_for_R60();
			}else if (R_20 == 61){update_20_for_R61();
			}else if (R_20 == 62){update_20_for_R62();
			}else if (R_20 == 63){update_20_for_R63();
			}else if (R_20 == 64){update_20_for_R64();
			}else if (R_20 == 65){update_20_for_R65();
			}else if (R_20 == 66){update_20_for_R66();
			}else if (R_20 == 67){update_20_for_R67();
			}else if (R_20 == 68){update_20_for_R68();
			}else if (R_20 == 69){update_20_for_R69();
	
			}else if (R_20 == 70){update_20_for_R70();
			}else if (R_20 == 71){update_20_for_R71();
			}else if (R_20 == 72){update_20_for_R72();
			}else if (R_20 == 73){update_20_for_R73();
			}else if (R_20 == 74){update_20_for_R74();
			}else if (R_20 == 75){update_20_for_R75();
			}else if (R_20 == 76){update_20_for_R76();
			}else if (R_20 == 77){update_20_for_R77();
			}else if (R_20 == 78){update_20_for_R78();
			}else if (R_20 == 79){update_20_for_R79();

			}else if (R_20 == 80){update_20_for_R80();
			}else if (R_20 == 81){update_20_for_R81();
			}else if (R_20 == 82){update_20_for_R82();
			}else if (R_20 == 83){update_20_for_R83();
			}else if (R_20 == 84){update_20_for_R84();
			}else if (R_20 == 85){update_20_for_R85();
			}else if (R_20 == 86){update_20_for_R86();
			}else if (R_20 == 87){update_20_for_R87();
			}else if (R_20 == 88){update_20_for_R88();
			}else if (R_20 == 89){update_20_for_R89();

			}else if (R_20 == 90){update_20_for_R90();
			}else if (R_20 == 91){update_20_for_R91();
			}else if (R_20 == 92){update_20_for_R92();
			}else if (R_20 == 93){update_20_for_R93();
			}else if (R_20 == 94){update_20_for_R94();
			}else if (R_20 == 95){update_20_for_R95();
			}else if (R_20 == 96){update_20_for_R96();
			}else if (R_20 == 97){update_20_for_R97();
			}else if (R_20 == 98){update_20_for_R98();
			}else if (R_20 == 99){update_20_for_R99();			

			}else if (R_20 == 100){update_20_for_R100();
			}else if (R_20 == 101){update_20_for_R101();
			}else if (R_20 == 102){update_20_for_R102();
			}else if (R_20 == 103){update_20_for_R103();
			}else if (R_20 == 104){update_20_for_R104();
			}else if (R_20 == 105){update_20_for_R105();
			}else if (R_20 == 106){update_20_for_R106();
			}else if (R_20 == 107){update_20_for_R107();
			}else if (R_20 == 108){update_20_for_R108();
			}else if (R_20 == 109){update_20_for_R109();

			}else if (R_20 == 110){update_20_for_R110();
			}else if (R_20 == 111){update_20_for_R111();
			}else if (R_20 == 112){update_20_for_R112();
			}else if (R_20 == 113){update_20_for_R113();
			}else if (R_20 == 114){update_20_for_R114();
			}else if (R_20 == 115){update_20_for_R115();
			}else if (R_20 == 116){update_20_for_R116();
			}else if (R_20 == 117){update_20_for_R117();
			}else if (R_20 == 118){update_20_for_R118();
			}else if (R_20 == 119){update_20_for_R119();

			
			}else{
				update_20_for_R0();
			}
		
			//B_X[19] = split(lst[stage], ",");
		
		}
	}
}



{
{
function update_20_for_Lvl_1() {
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 3) {
    B_X[19] = ["0", "0", "0", "0", " ", "0", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["1", "0", "0", "3", "0", "0", "1", "1"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 11) {
    B_X[19] = ["0", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "0", "0", "0", "0", "2", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 22) {
    B_X[19] = ["1", "1", "1", "1", "0", "0", "0", "0"];
  } else if (stage == 23) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 24) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 25) {
    B_X[19] = ["0", "0", "0", "1", "1", "1", "1", "0"];
  } else if (stage == 26) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 27) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 28) {
    B_X[19] = ["1", "1", "0", "0", "0", "1", "1", "0"];
  } else if (stage == 29) {
    B_X[19] = ["1", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 30) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 31) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 32) {
    B_X[19] = ["0", "1", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 33) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 34) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 35) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 36) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 37) {
    B_X[19] = ["0", "1", "1", "1", "1", "1", "1", "0"];
  } else if (stage == 38) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 39) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 40) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 41) {
    B_X[19] = ["1", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 42) {
    B_X[19] = ["1", "1", "0", "0", "1", "1", "1", "1"];
  } else if (stage == 43) {
    B_X[19] = ["1", "1", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 44) {
    B_X[19] = ["1", "0", "0", "0", "1", "1", "1", "1"];
  } else if (stage == 45) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "1", "1"];
  } else if (stage == 46) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 47) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 48) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 49) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 50) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 51) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 52) {
    B_X[19] = ["0", "1", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 53) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 54) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 55) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 56) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 57) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 58) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 59) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 60) {
    B_X[19] = ["0", "0", "0", "1", "0", "1", "1", "1"];
  } else if (stage == 61) {
    B_X[19] = ["0", "0", "1", "1", "0", "0", "1", "1"];
  } else if (stage == 62) {
    B_X[19] = ["0", "1", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 63) {
    B_X[19] = ["0", "1", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 64) {
    B_X[19] = ["0", "1", "1", "1", "0", "0", "0", "1"];
  } else if (stage == 65) {
    B_X[19] = ["0", "1", "1", "1", "0", "0", "0", "1"];
  } else if (stage == 66) {
    B_X[19] = ["0", "0", "1", "1", "0", "1", "0", "1"];
  } else if (stage == 67) {
    B_X[19] = ["0", "0", "1", "1", "0", "1", "0", "1"];
  } else if (stage == 68) {
    B_X[19] = ["1", "0", "1", "0", "0", "1", "0", "1"];
  } else if (stage == 69) {
    B_X[19] = ["1", "0", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 70) {
    B_X[19] = ["1", "0", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 71) {
    B_X[19] = ["0", "0", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 72) {
    B_X[19] = ["0", "0", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 73) {
    B_X[19] = ["0", "1", "1", "0", "1", "0", "0", "1"];
  } else if (stage == 74) {
    B_X[19] = ["0", "1", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 75) {
    B_X[19] = ["0", "1", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 76) {
    B_X[19] = ["0", "1", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 77) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 78) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 79) {
    B_X[19] = ["0", "0", "1", "1", "0", "0", "0", "0"];
  } else if (stage == 80) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 81) {
    B_X[19] = ["0", "1", "0", "0", "1", "1", "0", "0"];
  } else if (stage == 82) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "0"];
  } else if (stage == 83) {
    B_X[19] = ["3", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 84) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 85) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "0"];
  } else if (stage == 86) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 87) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "1", "0"];
  } else if (stage == 88) {
    B_X[19] = ["2", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 89) {
    B_X[19] = ["1", "1", "1", "1", "1", "0", "1", "0"];
  } else if (stage == 90) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 91) {
    B_X[19] = ["0", "1", "1", "4", "4", "4", "1", "0"];
  } else if (stage == 92) {
    B_X[19] = ["0", "0", "1", "4", "4", "4", "1", "0"];
  } else if (stage == 93) {
    B_X[19] = ["1", "0", "1", "1", "1", "1", "1", "0"];
  } else if (stage == 94) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 95) {
    B_X[19] = ["0", "1", "0", "0", "1", "0", "0", "1"];
  } else if (stage == 96) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 97) {
    B_X[19] = ["0", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 98) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 99) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 100) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
    level = 2;
    stage = 0;
  }
}

function update_20_for_Lvl_2() {
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "1", "0"];
  } else if (stage == 3) {
    B_X[19] = ["1", "1", "1", "0", " ", "0", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "1", "1", "1", "0", "0", "1", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "1", "1", "1", "0", "0", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["0", "1", "1", "1", "0", "0", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "1", "1", "1", "0", "0", "0"];
  } else if (stage == 11) {
    B_X[19] = ["0", "0", "1", "1", "1", "0", "0", "1"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "1", "1", "1", "0", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "0", "0", "1", "1", "1", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "0", "1", "1", "1", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["1", "0", "0", "1", "1", "1", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "1", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "1", "0", "0", "1", "1", "1", "0"];
  } else if (stage == 22) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 23) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 24) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "1", "1"];
  } else if (stage == 25) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 26) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 27) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 28) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 29) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 30) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 31) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 32) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 33) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 34) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 35) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 36) {
    B_X[19] = ["1", "1", "0", "1", "1", "0", "1", "1"];
  } else if (stage == 37) {
    B_X[19] = ["1", "1", "0", "1", "1", "0", "1", "1"];
  } else if (stage == 38) {
    B_X[19] = ["1", "1", "0", "1", "1", "0", "1", "1"];
  } else if (stage == 39) {
    B_X[19] = ["1", "0", "0", "1", "1", "0", "0", "1"];
  } else if (stage == 40) {
    B_X[19] = ["1", "0", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 41) {
    B_X[19] = ["1", "0", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 42) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 43) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 44) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 45) {
    B_X[19] = ["0", "1", "1", "0", "1", "1", "0", "0"];
  } else if (stage == 46) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 47) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "1"];
  } else if (stage == 48) {
    B_X[19] = ["1", "0", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 49) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 50) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "1", "0"];
  } else if (stage == 51) {
    B_X[19] = ["0", "1", "0", "0", "1", "1", "1", "0"];
  } else if (stage == 52) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "1", "0"];
  } else if (stage == 53) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 54) {
    B_X[19] = ["1", "0", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 55) {
    B_X[19] = ["1", "0", "0", "1", "0", "1", "1", "0"];
  } else if (stage == 56) {
    B_X[19] = ["1", "0", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 57) {
    B_X[19] = ["1", "1", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 58) {
    B_X[19] = ["1", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 59) {
    B_X[19] = ["1", "1", "0", "1", "1", "1", "0", "0"];
  } else if (stage == 60) {
    B_X[19] = ["1", "0", "0", "1", "0", "0", "0", "1"];
  } else if (stage == 61) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "0", "1"];
  } else if (stage == 62) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "1", "1"];
  } else if (stage == 63) {
    B_X[19] = ["0", "1", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 64) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "1", "1"];
  } else if (stage == 65) {
    B_X[19] = ["0", "0", "0", "1", "1", "1", "1", "1"];
  } else if (stage == 66) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 67) {
    B_X[19] = ["0", "1", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 68) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 69) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 70) {
    B_X[19] = ["0", "0", "0", "1", "1", "1", "1", "1"];
  } else if (stage == 71) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "1", "1"];
  } else if (stage == 72) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 73) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 74) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 75) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 76) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 77) {
    B_X[19] = ["0", "0", "1", "1", "0", "0", "1", "1"];
  } else if (stage == 78) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 79) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 80) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 81) {
    B_X[19] = ["1", "1", "0", "0", "1", "1", "0", "0"];
  } else if (stage == 82) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 83) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 84) {
    B_X[19] = ["1", "1", "1", "1", "1", "1", "0", "0"];
  } else if (stage == 85) {
    B_X[19] = ["1", "1", "1", "1", "1", "1", "1", "0"];
  } else if (stage == 86) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 87) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 88) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 89) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 90) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "2"];
  } else if (stage == 91) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 92) {
    B_X[19] = ["0", "1", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 93) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 94) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 95) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 96) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 97) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 98) {
    B_X[19] = ["1", "1", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 99) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 100) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
    level = level + 1;
    stage = 0;
  }
}

function update_20_for_E() {
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 3) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 11) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 22) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 23) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 24) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 25) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 26) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 27) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 28) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 29) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 30) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
    level = -1;
    stage = 0;
  }
}
}
// the random sections
{
{
function update_20_for_R0() {
  //occurs
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 3) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 4) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 5) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["1", "0", "0", "1", "1", "0", "0", "1"];
  } else if (stage == 9) {
    B_X[19] = ["1", "0", "0", "1", "1", "0", "0", "1"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 11) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "1", "1", "0", "0", "1", "1", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "1", "1", "0", "0", "1", "1", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;
    stage = 0;
  }
}

function update_20_for_R1() {
  //occurs
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 3) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 8) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 11) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 22) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "0", "0"];
  } else if (stage == 23) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 24) {
    B_X[19] = ["1", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 25) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 26) {
    B_X[19] = ["0", "0", "0", "1", "1", "1", "0", "0"];
  } else if (stage == 27) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 28) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 29) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "1"];
  } else if (stage == 30) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
    level = -1;
    stage = 0;
  }
}

function update_20_for_R2() {
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 3) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 8) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 11) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "1", "1", "1", "1", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 19) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 22) {
    B_X[19] = ["1", "0", "1", "1", "0", "1", "0", "1"];
  } else if (stage == 23) {
    B_X[19] = ["1", "0", "1", "0", "0", "1", "0", "1"];
  } else if (stage == 24) {
    B_X[19] = ["1", "0", "1", "0", "0", "1", "0", "1"];
  } else if (stage == 25) {
    B_X[19] = ["1", "0", "1", "0", "0", "1", "0", "1"];
  } else if (stage == 26) {
    B_X[19] = ["1", "0", "1", "0", "1", "1", "0", "1"];
  } else if (stage == 27) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 28) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 29) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 30) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
    level = -1;
    stage = 0;
  }
}

function update_20_for_R3() {
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 3) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 11) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 14) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "1", "1", "0", "0", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;

    stage = 0;
  }
}

function update_20_for_R4() {
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 3) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 5) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 6) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "1", "0", "1", "0", "1", "0", "1"];
  } else if (stage == 10) {
    B_X[19] = ["0", "1", "0", "1", "0", "1", "0", "1"];
  } else if (stage == 11) {
    B_X[19] = ["0", "1", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "1", "0", "1", "0", "1", "1", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "1", "0", "1", "0", "0", "1", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "1", "0", "0", "1", "0", "1", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "1", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 18) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 19) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;
    stage = 0;
  }
}

function update_20_for_R5() {
  //Calum G`s
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["0", "0", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["0", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 3) {
    B_X[19] = ["0", "0", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 4) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "1", "1", "0", "0", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 8) {
    B_X[19] = ["1", "1", "1", "0", "0", "1", "1", "1"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "0", "0", "1", "1", "1", "1"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 11) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 12) {
    B_X[19] = ["0", "0", "0", "1", "1", "1", "1", "1"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "0", "1", "2", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["1", "1", "0", "0", "1", "0", "0", "1"];
  } else if (stage == 15) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "1", "1", "1", "1", "0", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["3", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["1", "0", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 19) {
    B_X[19] = ["1", "1", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 20) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;

    stage = 0;
  }
}

function update_20_for_R6() {
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 2) {
    B_X[19] = ["1", "1", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 3) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "1", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "0", "0", "0", "1", "0", "1", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "1", "0", "0", "1", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "0", "0", "1", "0", "1", "1", "0"];
  } else if (stage == 8) {
    B_X[19] = ["0", "1", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["0", "1", "0", "1", "1", "1", "0", "0"];
  } else if (stage == 11) {
    B_X[19] = ["0", "1", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "1", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "1", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "1", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["0", "1", "1", "0", "1", "0", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "1", "0", "1", "0", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "0", "1", "0", "1", "0", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "1", "1", "0", "1", "1", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["1", "1", "0", "0", "0", "1", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;

    stage = 0;
  }
}

function update_20_for_R7() {
  //This section was made by Hello There
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["1", "0", "1", "0", "0", "1", "0", "1"];
  } else if (stage == 2) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "1"];
  } else if (stage == 3) {
    B_X[19] = ["0", "1", "1", "0", "1", "1", "0", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "1", "0"];
  } else if (stage == 5) {
    B_X[19] = ["1", "0", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["1", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 7) {
    B_X[19] = ["1", "1", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["1", "0", "0", "1", "0", "1", "0", "1"];
  } else if (stage == 9) {
    B_X[19] = ["1", "0", "0", "1", "3", "1", "0", "1"];
  } else if (stage == 10) {
    B_X[19] = ["1", "1", "0", "1", "1", "1", "0", "1"];
  } else if (stage == 11) {
    B_X[19] = ["1", "1", "0", "0", "1", "0", "0", "1"];
  } else if (stage == 12) {
    B_X[19] = ["1", "1", "1", "0", "1", "0", "1", "1"];
  } else if (stage == 13) {
    B_X[19] = ["1", "1", "0", "0", "1", "0", "0", "1"];
  } else if (stage == 14) {
    B_X[19] = ["1", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["1", "1", "1", "1", "0", "0", "1", "0"];
  } else if (stage == 16) {
    B_X[19] = ["1", "1", "1", "1", "1", "0", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["1", "1", "1", "1", "1", "1", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "1"];
  } else if (stage == 19) {
    B_X[19] = ["1", "1", "0", "0", "0", "1", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;

    stage = 0;
  }
}

function update_20_for_R8() {
  //This section was made by Matthew, with Idea from Andrew (twigg)
  if (stage == 0)         {B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1)  {B_X[19] = ["1", "1", "0", "1", "1", "1", "1", "1"];
  } else if (stage == 2)  {B_X[19] = ["1", "1", "0", "1", "1", "1", "1", "1"];
  } else if (stage == 3)  {B_X[19] = ["1", "1", "0", "1", "1", "1", "1", "1"];
  } else if (stage == 4)  {B_X[19] = ["1", "1", "0", "0", "0", "1", "1", "1"];
  } else if (stage == 5)  {B_X[19] = ["1", "1", "1", "1", "0", "1", "1", "1"];
  } else if (stage == 6)  {B_X[19] = ["1", "1", "1", "1", "0", "1", "1", "1"];
  } else if (stage == 7)  {B_X[19] = ["1", "1", "1", "1", "0", "1", "1", "1"];
  } else if (stage == 8)  {B_X[19] = ["1", "1", "1", "0", "0", "0", "1", "1"];
  } else if (stage == 9)  {B_X[19] = ["1", "1", "1", "0", "1", "0", "1", "1"];
  } else if (stage == 10) {B_X[19] = ["1", "0", "0", "0", "1", "0", "1", "1"];
  } else if (stage == 11) {B_X[19] = ["1", "0", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 12) {B_X[19] = ["1", "0", "1", "1", "1", "0", "0", "1"];
  } else if (stage == 13) {B_X[19] = ["1", "0", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 14) {B_X[19] = ["0", "0", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 15) {B_X[19] = ["0", "1", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 16) {B_X[19] = ["0", "0", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 17) {B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "1"];
  } else if (stage == 18) {B_X[19] = ["1", "1", "1", "0", "1", "0", "0", "1"];
  } else if (stage == 19) {B_X[19] = ["0", "0", "1", "0", "1", "0", "1", "1"];
  } else if (stage == 20) {B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;
	stage = 0;
  }
}

function update_20_for_R9() {
  //This section was made by Bob is brilliant
  if (stage == 0) {B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {B_X[19] = ["1", "1", "0", "1", "1", "1", "1", "1"];
  } else if (stage == 2) {B_X[19] = ["0", "1", "0", "1", "1", "1", "0", "0"];
  } else if (stage == 3) {B_X[19] = ["0", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 4) {B_X[19] = ["0", "1", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 5) {B_X[19] = ["0", "0", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 6) {B_X[19] = ["1", "1", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 7) {B_X[19] = ["1", "0", "2", "0", "0", "1", "1", "1"];
  } else if (stage == 8) {B_X[19] = ["0", "0", "1", "1", "0", "0", "0", "0"];
  } else if (stage == 9) {B_X[19] = ["0", "1", "0", "0", "1", "1", "0", "0"];
  } else if (stage == 10) {B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 11) {B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 12) {B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 13) {B_X[19] = ["0", "1", "1", "1", "1", "1", "1", "0"];
  } else if (stage == 14) {B_X[19] = ["0", "0", "0", "0", "1", "0", "0", "0"];
  } else if (stage == 15) {B_X[19] = ["1", "1", "1", "0", "1", "0", "1", "1"];
  } else if (stage == 16) {B_X[19] = ["0", "0", "1", "0", "0", "0", "1", "0"];
  } else if (stage == 17) {B_X[19] = ["0", "0", "1", "1", "2", "1", "1", "0"];
  } else if (stage == 18) {B_X[19] = ["0", "0", "0", "1", "0", "1", "0", "3"];
  } else if (stage == 19) {B_X[19] = ["0", "1", "1", "0", "0", "0", "1", "1"];
  } else if (stage == 20) {B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 21) {B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;

    stage = 0;
  }
}

}
{

function update_20_for_R10() {
  //This section was made by
  if (stage == 0)         {B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1)  {B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 2)  {B_X[19] = ["1", "1", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 3)  {B_X[19] = ["1", "1", "1", "0", "0", "1", "1", "1"];
  } else if (stage == 4)  {B_X[19] = ["1", "1", "1", "0", "1", "1", "1", "1"];
  } else if (stage == 5)  {B_X[19] = ["1", "1", "1", "0", "1", "1", "1", "1"];
  } else if (stage == 6)  {B_X[19] = ["1", "1", "1", "0", "0", "0", "0", "1"];
  } else if (stage == 7)  {B_X[19] = ["1", "0", "0", "0", "1", "1", "0", "1"];
  } else if (stage == 8)  {B_X[19] = ["1", "0", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 9)  {B_X[19] = ["1", "0", "1", "1", "1", "0", "0", "1"];
  } else if (stage == 10) {B_X[19] = ["1", "0", "0", "1", "0", "0", "1", "1"];
  } else if (stage == 11) {B_X[19] = ["1", "1", "0", "1", "0", "0", "1", "1"];
  } else if (stage == 12) {B_X[19] = ["1", "1", "0", "1", "0", "1", "1", "1"];
  } else if (stage == 13) {B_X[19] = ["1", "1", "0", "1", "0", "1", "1", "1"];
  } else if (stage == 14) {B_X[19] = ["1", "1", "0", "0", "0", "0", "1", "1"];
  } else if (stage == 15) {B_X[19] = ["1", "1", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 16) {B_X[19] = ["1", "1", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 17) {B_X[19] = ["1", "1", "1", "1", "1", "0", "1", "1"];
  } else if (stage == 18) {B_X[19] = ["1", "1", "1", "0", "0", "0", "1", "1"];
  } else if (stage == 19) {B_X[19] = ["1", "0", "0", "0", "1", "1", "1", "1"];
  } else if (stage == 20) {B_X[19] = ["1", "0", "1", "1", "1", "1", "1", "1"];
  } else if (stage == 21) {B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;

    stage = 0;
  }
}

function update_20_for_R11() {
  //This section was made by
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 2) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 3) {
    B_X[19] = ["1", "0", "1", "0", "1", "0", "1", "0"];
  } else if (stage == 4) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "1", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 8) {
    B_X[19] = ["0", "1", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "1", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 11) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 12) {
    B_X[19] = ["0", "1", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 13) {
    B_X[19] = ["0", "0", "1", "0", "1", "0", "0", "0"];
  } else if (stage == 14) {
    B_X[19] = ["0", "0", "1", "0", "1", "0", "0", "0"];
  } else if (stage == 15) {
    B_X[19] = ["1", "1", "1", "0", "1", "1", "0", "0"];
  } else if (stage == 16) {
    B_X[19] = ["1", "0", "0", "0", "0", "1", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["1", "0", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["1", "0", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 19) {
    B_X[19] = ["1", "0", "0", "1", "0", "0", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["1", "1", "0", "1", "1", "0", "1", "0"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
	level = -1;
    stage = 0;
  }
}

/*
function update_20_for_R11a(){
  //This section was made by
  if (stage == 0) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
  } else if (stage == 1) {
    B_X[19] = ["1", "1", "0", "1", "1", "0", "1", "1"];
  } else if (stage == 2) {
    B_X[19] = ["1", "1", "0", "1", "0", "0", "1", "0"];
  } else if (stage == 3) {
    B_X[19] = ["1", "0", "0", "1", "0", "1", "1", "0"];
  } else if (stage == 4) {
    B_X[19] = ["1", "0", "0", "1", "0", "1", "0", "0"];
  } else if (stage == 5) {
    B_X[19] = ["0", "0", "1", "1", "0", "1", "0", "0"];
  } else if (stage == 6) {
    B_X[19] = ["0", "1", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 7) {
    B_X[19] = ["0", "1", "1", "0", "1", "1", "1", "1"];
  } else if (stage == 8) {
    B_X[19] = ["0", "0", "1", "0", "0", "0", "0", "0"];
  } else if (stage == 9) {
    B_X[19] = ["0", "0", "0", "1", "1", "0", "0", "0"];
  } else if (stage == 10) {
    B_X[19] = ["1", "1", "0", "1", "0", "0", "1", "0"];
  } else if (stage == 11) {
    B_X[19] = ["1", "0", "0", "1", "0", "0", "0", "0"];
  } else if (stage == 12) {
    B_X[19] = ["1", "0", "1", "1", "1", "1", "0", "1"];
  } else if (stage == 13) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 14) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 15) {
    B_X[19] = ["1", "1", "1", "0", "0", "1", "1", "1"];
  } else if (stage == 16) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 17) {
    B_X[19] = ["0", "0", "1", "0", "0", "1", "0", "0"];
  } else if (stage == 18) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 19) {
    B_X[19] = ["0", "1", "0", "0", "0", "0", "1", "0"];
  } else if (stage == 20) {
    B_X[19] = ["1", "0", "0", "0", "0", "0", "0", "1"];
  } else if (stage == 21) {
    B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];

    level = -1;

    stage = 0;
  }
}
*/

function update_20_for_R12(){
//This section was made by Matthew
if(stage == 0){

B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 2){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 3){

B_X[19] = ["0","1","1","1","1","1","1","0"];
}else if(stage == 4){

B_X[19] = ["0","0","0","1","1","0","0","0"];
}else if(stage == 5){

B_X[19] = ["0","0","0","1","1","0","0","0"];
}else if(stage == 6){

B_X[19] = ["0","0","0","1","1","0","0","0"];
}else if(stage == 7){

B_X[19] = ["0","0","0","1","1","0","0","0"];
}else if(stage == 8){

B_X[19] = ["0","0","0","1","1","0","0","0"];
}else if(stage == 9){

B_X[19] = ["0","1","1","1","1","1","1","0"];
}else if(stage == 10){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 11){

B_X[19] = ["1","0","0","0","0","0","0","0"];
}else if(stage == 12){

B_X[19] = ["1","1","0","0","0","0","0","1"];
}else if(stage == 13){

B_X[19] = ["1","1","1","0","0","0","1","1"];
}else if(stage == 14){

B_X[19] = ["1","1","1","1","0","1","1","1"];
}else if(stage == 15){

B_X[19] = ["1","1","1","1","0","1","1","1"];
}else if(stage == 16){

B_X[19] = ["1","1","1","1","0","1","1","1"];
}else if(stage == 17){

B_X[19] = ["1","1","1","1","0","0","1","1"];
}else if(stage == 18){

B_X[19] = ["1","1","1","1","1","0","1","1"];
}else if(stage == 19){

B_X[19] = ["1","1","1","1","0","0","1","1"];
}else if(stage == 20){

B_X[19] = ["1","1","1","1","0","1","1","1"];
}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R13(){
//This section was made by
if(stage == 0){

B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){

B_X[19] = ["1","1","0","0","0","0","1","1"];
}else if(stage == 2){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 3){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 4){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 5){

B_X[19] = ["0","0","1","1","0","0","0","0"];
}else if(stage == 6){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 7){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 8){

B_X[19] = ["0","0","0","0","1","1","0","0"];
}else if(stage == 9){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 10){

B_X[19] = ["1","1","0","0","0","0","0","0"];
}else if(stage == 11){

B_X[19] = ["0","0","0","0","0","0","1","1"];
}else if(stage == 12){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 13){

B_X[19] = ["0","0","0","0","1","1","0","0"];
}else if(stage == 14){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 15){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 16){

B_X[19] = ["0","0","1","1","0","0","0","0"];
}else if(stage == 17){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 18){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 19){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 20){

B_X[19] = ["1","1","0","0","0","0","1","1"];
}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R14(){
//This section was made by Matthew
if(stage == 0){

B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){

B_X[19] = ["0","0","0","0","0","0","0","1"];
}else if(stage == 2){

B_X[19] = ["0","0","0","0","0","0","1","0"];
}else if(stage == 3){

B_X[19] = ["0","0","0","0","0","1","0","0"];
}else if(stage == 4){

B_X[19] = ["0","0","0","0","1","0","0","0"];
}else if(stage == 5){

B_X[19] = ["0","0","0","1","0","0","0","0"];
}else if(stage == 6){

B_X[19] = ["0","0","1","0","0","0","0","0"];
}else if(stage == 7){

B_X[19] = ["0","1","0","0","0","0","0","0"];
}else if(stage == 8){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 9){

B_X[19] = ["1","0","0","0","0","0","0","0"];
}else if(stage == 10){

B_X[19] = ["0","1","0","0","0","0","0","0"];
}else if(stage == 11){

B_X[19] = ["0","0","1","0","0","0","0","0"];
}else if(stage == 12){

B_X[19] = ["0","0","0","1","0","0","0","0"];
}else if(stage == 13){

B_X[19] = ["0","0","0","0","1","0","0","0"];
}else if(stage == 14){

B_X[19] = ["0","0","0","0","0","1","0","0"];
}else if(stage == 15){

B_X[19] = ["0","0","0","0","0","0","1","0"];
}else if(stage == 16){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 17){

B_X[19] = ["0","0","0","0","0","0","0","1"];
}else if(stage == 18){

B_X[19] = ["0","0","0","0","0","0","1","1"];
}else if(stage == 19){

B_X[19] = ["0","0","0","1","0","1","1","1"];
}else if(stage == 20){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R15(){
//This section was made by Matthew
if(stage == 0){

B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 2){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 3){

B_X[19] = ["0","1","0","0","0","0","1","0"];
}else if(stage == 4){

B_X[19] = ["1","1","0","0","0","0","1","1"];
}else if(stage == 5){

B_X[19] = ["0","1","0","0","0","0","1","0"];
}else if(stage == 6){

B_X[19] = ["0","0","1","0","0","1","0","0"];
}else if(stage == 7){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 8){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 9){

B_X[19] = ["0","0","0","1","0","1","0","0"];
}else if(stage == 10){

B_X[19] = ["0","0","1","0","0","0","1","0"];
}else if(stage == 11){

B_X[19] = ["0","0","0","0","1","0","0","0"];
}else if(stage == 12){

B_X[19] = ["0","0","1","0","0","0","1","0"];
}else if(stage == 13){

B_X[19] = ["0","0","0","1","0","1","0","0"];
}else if(stage == 14){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 15){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 16){

B_X[19] = ["0","0","1","0","0","1","0","0"];
}else if(stage == 17){

B_X[19] = ["0","1","0","0","0","0","1","0"];
}else if(stage == 18){

B_X[19] = ["1","1","0","0","0","0","1","1"];
}else if(stage == 19){

B_X[19] = ["0","1","0","0","0","0","1","0"];
}else if(stage == 20){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R16(){
//This section was made by Matthew
if(stage == 0){

B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 2){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 3){

B_X[19] = ["0","0","1","0","0","0","0","0"];
}else if(stage == 4){

B_X[19] = ["0","0","1","0","1","0","1","0"];
}else if(stage == 5){

B_X[19] = ["1","0","0","0","1","0","1","0"];
}else if(stage == 6){

B_X[19] = ["1","0","0","0","0","0","0","0"];
}else if(stage == 7){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 8){

B_X[19] = ["0","0","1","0","0","0","0","0"];
}else if(stage == 9){

B_X[19] = ["0","0","1","0","1","0","1","0"];
}else if(stage == 10){

B_X[19] = ["0","0","0","0","1","0","1","0"];
}else if(stage == 11){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 12){

B_X[19] = ["0","1","0","0","0","0","0","0"];
}else if(stage == 13){

B_X[19] = ["0","1","0","0","0","0","0","1"];
}else if(stage == 14){

B_X[19] = ["0","0","0","0","0","1","0","1"];
}else if(stage == 15){

B_X[19] = ["0","0","0","1","0","1","0","0"];
}else if(stage == 16){

B_X[19] = ["0","0","0","1","0","0","0","0"];
}else if(stage == 17){

B_X[19] = ["0","0","0","0","0","0","1","0"];
}else if(stage == 18){

B_X[19] = ["0","0","0","0","0","0","1","0"];
}else if(stage == 19){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 20){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R17(){
//This section was made by Matthew
if(stage == 0){

B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){

B_X[19] = ["1","1","0","0","0","0","0","0"];
}else if(stage == 2){

B_X[19] = ["1","1","0","0","0","0","0","0"];
}else if(stage == 3){

B_X[19] = ["0","0","0","0","0","0","1","1"];
}else if(stage == 4){

B_X[19] = ["0","0","0","0","0","0","1","1"];
}else if(stage == 5){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 6){

B_X[19] = ["0","0","1","1","0","0","0","0"];
}else if(stage == 7){

B_X[19] = ["0","0","1","1","0","0","0","0"];
}else if(stage == 8){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 9){

B_X[19] = ["0","0","0","0","1","1","0","0"];
}else if(stage == 10){

B_X[19] = ["0","0","0","0","1","1","0","0"];
}else if(stage == 11){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 12){

B_X[19] = ["0","1","1","0","0","0","0","0"];
}else if(stage == 13){

B_X[19] = ["0","1","1","0","0","0","0","0"];
}else if(stage == 14){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 15){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 16){

B_X[19] = ["0","0","0","0","0","0","1","1"];
}else if(stage == 17){

B_X[19] = ["0","0","0","0","0","0","1","1"];
}else if(stage == 18){

B_X[19] = ["0","0","1","1","0","0","0","0"];
}else if(stage == 19){

B_X[19] = ["0","0","1","1","0","0","0","0"];
}else if(stage == 20){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R18(){
//This section was made by Matthew
if(stage == 0){

B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 2){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 3){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 4){

B_X[19] = ["1","0","0","0","0","0","0","0"];
}else if(stage == 5){

B_X[19] = ["1","0","0","0","0","0","0","0"];
}else if(stage == 6){

B_X[19] = ["0","1","0","0","0","0","0","0"];
}else if(stage == 7){

B_X[19] = ["0","1","0","0","0","0","0","0"];
}else if(stage == 8){

B_X[19] = ["0","0","1","0","0","0","0","0"];
}else if(stage == 9){

B_X[19] = ["0","0","0","1","1","0","0","0"];
}else if(stage == 10){

B_X[19] = ["0","0","0","0","0","1","1","0"];
}else if(stage == 11){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 12){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 13){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 14){

B_X[19] = ["0","0","0","0","0","0","0","0"];
}else if(stage == 15){

B_X[19] = ["0","0","0","0","0","0","1","1"];
}else if(stage == 16){

B_X[19] = ["0","0","0","0","0","1","0","0"];
}else if(stage == 17){

B_X[19] = ["0","0","0","0","1","0","0","0"];
}else if(stage == 18){

B_X[19] = ["0","0","0","0","1","0","0","0"];
}else if(stage == 19){

B_X[19] = ["0","0","0","1","0","0","0","0"];
}else if(stage == 20){

B_X[19] = ["0","0","0","1","0","0","0","0"];
}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R19(){
//This section was made by
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","1","0","1","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["1","0","0","0","1","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","0","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 18){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{

function update_20_for_R20(){
//This section was made by
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 16){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R21(){
//This section was made by
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","0","1","0","0","1","1","0"];

}else if(stage == 3){B_X[19] = ["1","1","1","0","0","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 11){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","0","1","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["1","1","1","0","0","1","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R22(){
//This section was made by
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 6){B_X[19] = ["0","0","1","1","1","1","1","1"];

}else if(stage == 7){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","1","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["1","1","1","1","1","0","0","0"];

}else if(stage == 16){B_X[19] = ["1","1","1","1","1","1","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R23(){
//This section was made by
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","1","1","1","1","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","1","1","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R24(){
//This section was made by Harriet
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","1","1","1","1","0","0","1"];

}else if(stage == 3){B_X[19] = ["1","1","1","1","1","0","1","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["1","1","1","1","1","0","0","1"];

}else if(stage == 6){B_X[19] = ["1","1","1","1","1","1","0","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 9){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 10){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 11){B_X[19] = ["1","1","1","1","0","1","1","1"];

}else if(stage == 12){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 13){B_X[19] = ["3","0","0","0","0","0","0","3"];

}else if(stage == 14){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 15){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 16){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 17){B_X[19] = ["1","1","1","1","0","0","0","1"];

}else if(stage == 18){B_X[19] = ["1","1","1","1","1","1","0","1"];

}else if(stage == 19){B_X[19] = ["1","1","1","1","1","0","0","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R25(){
//This section was made by Andrew - co-creator
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","2","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","1","1","0","0","0","1"];

}else if(stage == 5){B_X[19] = ["1","1","1","1","1","0","1","1"];

}else if(stage == 6){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 7){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 9){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 10){B_X[19] = ["1","1","0","1","1","1","1","1"];

}else if(stage == 11){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 12){B_X[19] = ["1","1","1","1","2","1","1","1"];

}else if(stage == 13){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 14){B_X[19] = ["1","1","0","0","1","1","1","1"];

}else if(stage == 15){B_X[19] = ["1","1","0","1","1","1","1","1"];

}else if(stage == 16){B_X[19] = ["1","1","0","1","1","1","1","1"];

}else if(stage == 17){B_X[19] = ["1","1","0","0","1","1","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R26(){
//This section was made by
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["2","1","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","1","1","0","0","0","0","1"];

}else if(stage == 5){B_X[19] = ["0","1","1","1","0","0","1","1"];

}else if(stage == 6){B_X[19] = ["0","1","1","1","0","1","1","1"];

}else if(stage == 7){B_X[19] = ["0","1","1","1","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["0","1","1","1","0","2","0","1"];

}else if(stage == 9){B_X[19] = ["0","1","1","1","1","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","1","0","0","1"];

}else if(stage == 11){B_X[19] = ["2","0","1","1","0","0","0","1"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","0","1","1","1"];

}else if(stage == 13){B_X[19] = ["1","1","0","1","0","0","0","1"];

}else if(stage == 14){B_X[19] = ["1","1","0","1","1","1","0","1"];

}else if(stage == 15){B_X[19] = ["1","1","0","1","1","1","0","1"];

}else if(stage == 16){B_X[19] = ["1","0","0","1","1","0","0","1"];

}else if(stage == 17){B_X[19] = ["1","0","1","1","1","0","0","1"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R27(){
//This section was made by Matthew - class random
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","1","0","0","0","0","0","1"];

}else if(stage == 3){B_X[19] = ["1","0","0","0","0","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 7){B_X[19] = ["0","1","0","0","0","0","0","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","1","0","2"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 11){B_X[19] = ["0","1","1","0","0","1","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 13){B_X[19] = ["1","0","0","0","1","0","0","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["2","1","1","0","0","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","0","1","0"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","1","0","0","0","1","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R28(){
//This section was made by Matthew - simple class
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R29(){
//This section was made by Matthew - class annoying
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["1","0","1","1","1","0","1","0"];

}else if(stage == 4){B_X[19] = ["1","0","0","1","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["1","0","0","1","0","0","1","0"];

}else if(stage == 6){B_X[19] = ["1","0","0","1","0","0","1","0"];

}else if(stage == 7){B_X[19] = ["1","0","0","1","0","0","1","0"];

}else if(stage == 8){B_X[19] = ["1","0","1","1","1","0","1","0"];

}else if(stage == 9){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 11){B_X[19] = ["1","1","0","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["1","1","1","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["1","1","1","1","0","0","1","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","1","1","0","1","0"];

}else if(stage == 15){B_X[19] = ["1","0","0","0","0","0","1","2"];

}else if(stage == 16){B_X[19] = ["1","0","0","0","0","0","1","2"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","0","1","1","2"];

}else if(stage == 18){B_X[19] = ["1","0","0","0","1","1","1","0"];

}else if(stage == 19){B_X[19] = ["1","0","0","1","1","1","1","0"];

}else if(stage == 20){B_X[19] = ["1","0","1","1","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{

function update_20_for_R30(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["1","1","0","0","0","1","1","0"];

}else if(stage == 4){B_X[19] = ["1","1","1","0","1","1","1","0"];

}else if(stage == 5){B_X[19] = ["1","1","1","0","1","1","1","0"];

}else if(stage == 6){B_X[19] = ["1","1","0","0","0","1","1","0"];

}else if(stage == 7){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["1","0","0","0","0","0","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 12){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","1","0","0","1","1","1"];

}else if(stage == 14){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","1","1","1","1","0","1"];

}else if(stage == 16){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","1","0","0","1","1","1"];

}else if(stage == 18){B_X[19] = ["1","0","1","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["1","0","1","1","1","0","0","1"];

}else if(stage == 20){B_X[19] = ["1","0","1","0","0","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R31(){
//This section was made by MAtthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 5){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 6){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["1","0","0","1","1","0","0","1"];

}else if(stage == 10){B_X[19] = ["1","0","0","1","1","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 14){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 15){B_X[19] = ["1","0","0","1","1","0","0","1"];

}else if(stage == 16){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 17){B_X[19] = ["0","1","0","1","1","0","1","0"];

}else if(stage == 18){B_X[19] = ["0","1","0","1","1","0","1","0"];

}else if(stage == 19){B_X[19] = ["0","1","1","1","1","0","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R32(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","1","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["1","1","1","1","1","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["1","1","1","1","1","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","1","0","0","0","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","1","0","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","1","0","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","0","1","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","1","0","1","1","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R33(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","3","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","2","1","1","1","1","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","2","0","0","1","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 15){B_X[19] = ["1","1","1","0","0","0","0","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","1","1","0","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","1","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R34(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 18){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R35(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","1","1","1","1","1","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","1","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","1","0","1","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","0","0","0","1","0","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R36(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 15){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 16){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 19){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 20){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R37(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 2){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 3){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 4){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 5){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 6){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 7){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 12){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 16){B_X[19] = ["0","1","1","1","0","0","1","1"];

}else if(stage == 17){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R38(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","0","1","1","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","1","0","1","1","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 5){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 7){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 10){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 15){B_X[19] = ["3","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","1","1","1","0","1","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R39(){
//This section was made by THE EVIL KING BOB
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 3){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 4){B_X[19] = ["0","0","1","1","1","1","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 6){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 7){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","1","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 14){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 15){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 18){B_X[19] = ["1","0","0","0","0","1","0","0"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{

function update_20_for_R40(){
//This section was made by THE EVIL KING BOB
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","3","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","1","1","1","1","0","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R41(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 2){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","1","1","0","0","1","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","1","0","0","1","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 20){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R42(){
//This section was made by The Dot
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 6){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","1","1","1","1","1","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R43(){
//This section was made by The Dot
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","1","1","1","1","1","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R44(){
//This section was made by The Dot
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","1","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","1","0","0","1","0","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R45(){
//This section was made by The Dot
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 2){B_X[19] = ["0","1","0","1","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","0","1","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R46(){
//This section was made by The Dot
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 2){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","0","0","1","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R47(){
//This section was made by JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 6){B_X[19] = ["0","1","1","1","1","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","1","0","1","1","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R48(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 3){B_X[19] = ["1","0","0","0","0","1","0","0"];

}else if(stage == 4){B_X[19] = ["1","0","0","0","0","1","0","0"];

}else if(stage == 5){B_X[19] = ["1","0","0","1","1","1","0","0"];

}else if(stage == 6){B_X[19] = ["1","0","0","1","1","1","1","1"];

}else if(stage == 7){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","1","0","1","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","0","1","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","0","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","1","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","0","1","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","0","1","1","1","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","0","1","1","1","0"];

}else if(stage == 15){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 16){B_X[19] = ["1","0","1","1","1","0","1","0"];

}else if(stage == 17){B_X[19] = ["1","0","1","1","1","0","1","0"];

}else if(stage == 18){B_X[19] = ["1","0","0","1","0","0","1","0"];

}else if(stage == 19){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 20){B_X[19] = ["1","0","1","1","1","0","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R49(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{

function update_20_for_R50(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R51(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 6){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 7){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 13){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R52(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R53(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 8){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R54(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","0","0","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","1","1"];

}else if(stage == 3){B_X[19] = ["1","1","1","0","0","0","0","1"];

}else if(stage == 4){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 5){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["1","1","1","1","0","0","0","1"];

}else if(stage == 7){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 8){B_X[19] = ["1","0","0","0","1","1","1","1"];

}else if(stage == 9){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 11){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 12){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 13){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 14){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 15){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 16){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 17){B_X[19] = ["1","0","0","1","1","0","0","1"];

}else if(stage == 18){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 19){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 20){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R55(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["1","1","1","0","0","0","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","0","0","0","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R56(){
//This section was made by ROCKET
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 4){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 5){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R57(){
//This section was made by JAM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","1","1","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","1","0","0","1"];

}else if(stage == 8){B_X[19] = ["1","0","0","1","1","0","1","1"];

}else if(stage == 9){B_X[19] = ["1","1","0","0","1","0","1","1"];

}else if(stage == 10){B_X[19] = ["1","0","0","1","1","0","1","1"];

}else if(stage == 11){B_X[19] = ["0","0","1","1","1","0","0","1"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 14){B_X[19] = ["0","1","0","1","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","0","1","1","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["1","1","0","1","0","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R58(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","2"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R59(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 10){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 12){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{
function update_20_for_R60(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 9){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R61(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R62(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R63(){
//This section was made by Matthew - class random
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 3){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 4){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 5){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 7){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","1","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R64(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","1","0","1","0","1","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","1","0","1","0","1","0","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R65(){
//This section was made by Tommy
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 3){B_X[19] = ["1","0","1","0","1","0","0","1"];

}else if(stage == 4){B_X[19] = ["1","0","1","0","1","0","0","1"];

}else if(stage == 5){B_X[19] = ["1","0","1","1","1","0","0","1"];

}else if(stage == 6){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 7){B_X[19] = ["1","0","0","0","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 11){B_X[19] = ["0","0","1","1","1","1","1","1"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 14){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 15){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 16){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 19){B_X[19] = ["1","0","0","0","1","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R66(){
//This section was made by Tommy
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","1","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["1","1","0","1","0","1","0","1"];

}else if(stage == 3){B_X[19] = ["1","0","0","1","0","0","0","1"];

}else if(stage == 4){B_X[19] = ["0","0","1","0","0","0","0","1"];

}else if(stage == 5){B_X[19] = ["0","0","1","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","0","0","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 8){B_X[19] = ["1","0","0","0","0","1","0","1"];

}else if(stage == 9){B_X[19] = ["1","0","0","0","1","1","0","1"];

}else if(stage == 10){B_X[19] = ["1","0","1","1","1","1","0","1"];

}else if(stage == 11){B_X[19] = ["1","0","1","1","1","1","0","1"];

}else if(stage == 12){B_X[19] = ["1","0","1","1","1","1","0","1"];

}else if(stage == 13){B_X[19] = ["1","0","1","1","1","1","0","1"];

}else if(stage == 14){B_X[19] = ["1","0","1","1","1","1","0","1"];

}else if(stage == 15){B_X[19] = ["1","0","1","1","1","0","0","1"];

}else if(stage == 16){B_X[19] = ["1","0","1","1","0","0","1","1"];

}else if(stage == 17){B_X[19] = ["1","0","1","0","0","1","1","1"];

}else if(stage == 18){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 19){B_X[19] = ["1","0","0","0","1","1","1","1"];

}else if(stage == 20){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R67(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","0","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["1","0","1","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R68(){
//This section was made by The one true flappy dot
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","1","1","1","1","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","0","1","1","1","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","3"];

}else if(stage == 11){B_X[19] = ["1","1","1","1","1","0","1","1"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","1","1","1","1","0","1","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R69(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 9){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{

function update_20_for_R70(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R71(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","1","1","0","0","1","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R72(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","0","1","1","0","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["1","1","0","1","1","0","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","0","1","1","0","1","1"];

}else if(stage == 9){B_X[19] = ["0","2","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["1","1","0","0","1","1","1","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","1","0","0","0","1","1"];

}else if(stage == 13){B_X[19] = ["2","0","0","0","0","0","0","3"];

}else if(stage == 14){B_X[19] = ["1","1","0","1","1","0","1","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["1","1","0","1","1","0","1","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","1","1","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["1","1","0","1","1","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R73(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","1","0","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R74(){
//This section was made by Callum
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","0","1","1","0"];

}else if(stage == 8){B_X[19] = ["0","1","1","1","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","1","1","1","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","0","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","0","1","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 15){B_X[19] = ["1","0","0","0","1","0","1","0"];

}else if(stage == 16){B_X[19] = ["1","1","0","0","1","0","1","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","1","0","1","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","1","0","1","0"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","1","0","1","0"];

}else if(stage == 20){B_X[19] = ["1","1","0","0","1","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R75(){
//This section was made by Callum
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","1","0","1","0","1","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","0","1","0","1","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["1","0","1","0","1","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","1","0","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","1","1","1","0","0","1","1"];

}else if(stage == 11){B_X[19] = ["0","1","1","1","0","0","1","1"];

}else if(stage == 12){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","1","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","1","1","0","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","1","1","0","0","1","0"];

}else if(stage == 18){B_X[19] = ["0","1","1","0","0","0","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R76(){
//This section was made by Callum
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 2){B_X[19] = ["0","1","1","1","1","1","0","1"];

}else if(stage == 3){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 4){B_X[19] = ["0","1","1","1","1","1","0","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","1","0","1","1","1","0","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 9){B_X[19] = ["0","1","1","0","0","1","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 12){B_X[19] = ["0","1","1","0","0","1","0","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 14){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 15){B_X[19] = ["1","1","1","1","0","1","1","1"];

}else if(stage == 16){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","1","0","0","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R77(){
//This section was made by Callum
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","0","0","1","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["1","0","0","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R78(){
//This section was made by Callum
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","1","0","0","1","1","0"];

}else if(stage == 2){B_X[19] = ["1","1","0","0","1","1","0","0"];

}else if(stage == 3){B_X[19] = ["1","0","0","1","1","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","0","0","1","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 7){B_X[19] = ["0","1","1","0","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","1","1","0","0","0","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","0","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","1","0","0","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","1","0","0","1","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 19){B_X[19] = ["0","1","1","0","0","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","1","0","0","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R79(){
//This section was made by Callum
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 2){B_X[19] = ["1","1","0","0","0","1","1","1"];

}else if(stage == 3){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 4){B_X[19] = ["1","0","1","1","0","0","0","1"];

}else if(stage == 5){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["1","0","0","0","0","1","0","1"];

}else if(stage == 7){B_X[19] = ["1","0","0","0","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 9){B_X[19] = ["1","0","0","0","1","1","0","1"];

}else if(stage == 10){B_X[19] = ["1","0","0","1","1","0","0","1"];

}else if(stage == 11){B_X[19] = ["1","0","1","1","0","0","0","1"];

}else if(stage == 12){B_X[19] = ["1","0","1","0","0","0","0","1"];

}else if(stage == 13){B_X[19] = ["1","0","1","1","0","0","0","1"];

}else if(stage == 14){B_X[19] = ["1","0","0","1","1","0","0","1"];

}else if(stage == 15){B_X[19] = ["1","0","0","0","1","1","0","1"];

}else if(stage == 16){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","0","0","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","0","0","0","0","0","1"];

}else if(stage == 19){B_X[19] = ["1","1","1","0","0","0","0","1"];

}else if(stage == 20){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{

function update_20_for_R80(){
//This section was made by Callum
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","1","0","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","1","0","0","1"];

}else if(stage == 5){B_X[19] = ["0","1","0","0","1","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","1","1","0","1","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","1","1","1","1","1","0"];

}else if(stage == 9){B_X[19] = ["0","1","0","0","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","1","0","0","0","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","0","0","1"];

}else if(stage == 12){B_X[19] = ["0","0","1","1","1","1","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","1","1","1","1","0","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 19){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 20){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R81(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","3"];

}else if(stage == 3){B_X[19] = ["1","1","1","1","1","1","0","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["1","1","1","1","1","0","1","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["1","1","1","1","2","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","3","0","0"];

}else if(stage == 9){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["1","1","1","1","0","1","1","1"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["1","1","1","0","1","1","1","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["1","1","0","1","1","1","1","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","0","1","1","1","1","1","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R82(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","1","1","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","0","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["1","0","0","1","0","0","1","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R83(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","1","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R84(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","1","1","0","0","0","1","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R85(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","0","0","1","0","1","0"];

}else if(stage == 2){B_X[19] = ["0","1","0","1","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["0","1","0","1","0","1","0","0"];

}else if(stage == 4){B_X[19] = ["1","0","0","1","0","1","0","1"];

}else if(stage == 5){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 6){B_X[19] = ["1","0","1","0","1","0","0","1"];

}else if(stage == 7){B_X[19] = ["0","0","1","0","1","0","1","0"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","1","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","1","0","1","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["3","1","0","1","0","1","0","0"];

}else if(stage == 11){B_X[19] = ["1","0","3","1","0","1","0","1"];

}else if(stage == 12){B_X[19] = ["1","0","1","0","2","1","0","1"];

}else if(stage == 13){B_X[19] = ["1","0","1","0","1","0","0","1"];

}else if(stage == 14){B_X[19] = ["0","0","1","0","1","0","1","0"];

}else if(stage == 15){B_X[19] = ["0","1","0","0","1","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","1","0","0","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","0","1","0","1","0","0"];

}else if(stage == 18){B_X[19] = ["1","0","0","1","0","1","0","1"];

}else if(stage == 19){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 20){B_X[19] = ["1","0","1","0","1","0","0","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R86(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 6){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 10){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 11){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","1","1","1","1","1","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R87(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 4){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["1","0","0","1","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["1","0","0","1","1","1","1","1"];

}else if(stage == 8){B_X[19] = ["1","0","0","1","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","0","0","1","0"];

}else if(stage == 11){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","1","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R88(){
//This section was made by Easy Gary
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","1","0","0","0","0","0","1"];

}else if(stage == 18){B_X[19] = ["1","0","0","0","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R89(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","1","1","0","1"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["1","1","0","0","1","1","1","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["1","1","0","0","0","0","0","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{
function update_20_for_R90(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","0","0","0","1"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","0","0","0","1"];

}else if(stage == 9){B_X[19] = ["0","0","1","1","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["1","0","0","0","1","1","0","0"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 18){B_X[19] = ["1","0","0","0","1","1","0","0"];

}else if(stage == 19){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R91(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","1","0","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","0","1","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","1","1","0","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","1","1","0","1","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","1","1","0","1"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R92(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 5){B_X[19] = ["0","1","0","0","0","0","1","1"];

}else if(stage == 6){B_X[19] = ["0","0","1","0","0","0","0","1"];

}else if(stage == 7){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","1","1","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","1","1","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 14){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","1","0","0","0","0","1"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","0","0","1","1"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","0","1","1","1"];

}else if(stage == 18){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R93(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 4){B_X[19] = ["0","1","1","1","1","1","0","0"];

}else if(stage == 5){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R94(){
//This section was made by Bob is brilliant
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","1","0","0","1","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","0","0","1","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["1","1","1","1","0","0","1","1"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","1","0","0","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R95(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","1","0","1","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","0","1","0","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 9){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","1","0","0"];

}else if(stage == 12){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","0","1","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["1","1","0","1","0","0","0","1"];

}else if(stage == 15){B_X[19] = ["0","1","0","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","1","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","1","0","0","0","1","0","0"];

}else if(stage == 18){B_X[19] = ["0","1","1","0","0","1","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R96(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 2){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","1","0","0","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","1","1","0","1"];

}else if(stage == 7){B_X[19] = ["0","0","1","0","0","0","0","1"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","0","0","1","1"];

}else if(stage == 9){B_X[19] = ["1","0","0","0","0","1","0","0"];

}else if(stage == 10){B_X[19] = ["1","0","1","1","1","0","0","0"];

}else if(stage == 11){B_X[19] = ["1","0","1","1","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["1","0","0","0","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["1","0","0","0","0","1","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","1","0","0","0","0","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 17){B_X[19] = ["0","0","0","1","0","1","0","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","0","1","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R97(){
//This section was made by Hello There
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","0","0","0","1"];

}else if(stage == 12){B_X[19] = ["0","1","1","1","0","1","1","1"];

}else if(stage == 13){B_X[19] = ["0","1","0","0","0","1","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 16){B_X[19] = ["1","0","0","0","0","1","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R98(){
//This section was made by Bob is brilliant
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","1","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","1","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","1","1","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","1","1","1","1","0","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R99(){
//This section was made by one more to go, one More to go!,
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 2){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 3){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 15){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 16){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","1","1","1","1","1","0"];

}else if(stage == 19){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 20){B_X[19] = ["1","0","0","0","0","0","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{

function update_20_for_R100(){
//This section was made by MATTHEW AT 100
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","1","1","1","1","1","1","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 8){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 15){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 17){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R101(){
//This section was made by Anonymous
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","1","1","1","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 3){B_X[19] = ["0","2","0","0","0","0","1","0"];

}else if(stage == 4){B_X[19] = ["1","2","1","1","1","1","1","0"];

}else if(stage == 5){B_X[19] = ["0","2","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","1","0","1","1","1","3"];

}else if(stage == 7){B_X[19] = ["0","0","1","0","2","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","1","0","1","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","1","1","1","4","1"];

}else if(stage == 13){B_X[19] = ["0","0","1","3","2","3","2","3"];

}else if(stage == 14){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","1","0","1","1","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","1","1","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R102(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 2){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 3){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 7){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","1","1"];

}else if(stage == 15){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","1","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","1","1","0","0"];

}else if(stage == 19){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 20){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R103(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","1","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","1","1"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","1","0","0","0","1"];

}else if(stage == 10){B_X[19] = ["0","1","1","1","1","2","2","1"];

}else if(stage == 11){B_X[19] = ["0","1","1","1","1","0","0","1"];

}else if(stage == 12){B_X[19] = ["0","1","1","1","1","0","0","1"];

}else if(stage == 13){B_X[19] = ["0","1","1","1","1","0","0","1"];

}else if(stage == 14){B_X[19] = ["0","1","1","1","1","0","0","1"];

}else if(stage == 15){B_X[19] = ["0","1","1","0","0","0","0","1"];

}else if(stage == 16){B_X[19] = ["3","1","1","0","0","1","0","1"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","0","1","0","1"];

}else if(stage == 18){B_X[19] = ["1","1","1","1","0","1","0","1"];

}else if(stage == 19){B_X[19] = ["0","1","1","0","0","1","0","1"];

}else if(stage == 20){B_X[19] = ["0","0","1","0","1","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R104(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","2","1","2","2","1","2","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["2","1","2","1","1","2","1","2"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["3","1","3","1","1","3","1","3"];

}else if(stage == 15){B_X[19] = ["1","1","1","1","1","1","1","1"];

}else if(stage == 16){B_X[19] = ["1","1","1","1","1","1","1","1"];

}else if(stage == 17){B_X[19] = ["1","1","1","1","1","1","1","1"];

}else if(stage == 18){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R105(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["3","0","0","0","0","0","0","3"];

}else if(stage == 2){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 6){B_X[19] = ["2","0","0","0","0","0","0","2"];

}else if(stage == 7){B_X[19] = ["3","2","0","0","0","0","2","3"];

}else if(stage == 8){B_X[19] = ["0","3","2","0","0","2","3","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","2","2","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","2","2","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","2","1","1","2","0","0"];

}else if(stage == 12){B_X[19] = ["0","2","1","3","3","1","2","0"];

}else if(stage == 13){B_X[19] = ["2","0","1","3","3","1","0","2"];

}else if(stage == 14){B_X[19] = ["2","0","0","1","1","0","0","2"];

}else if(stage == 15){B_X[19] = ["3","2","0","0","0","0","2","3"];

}else if(stage == 16){B_X[19] = ["0","0","2","0","0","2","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","2","2","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","2","2","0","0","0"];

}else if(stage == 19){B_X[19] = ["2","0","2","0","0","2","0","2"];

}else if(stage == 20){B_X[19] = ["0","2","0","0","0","0","2","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R106(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["3","0","0","0","0","0","0","3"];

}else if(stage == 4){B_X[19] = ["1","3","0","0","0","0","3","1"];

}else if(stage == 5){B_X[19] = ["1","1","3","2","2","3","1","1"];

}else if(stage == 6){B_X[19] = ["1","1","1","2","2","1","1","1"];

}else if(stage == 7){B_X[19] = ["1","1","1","2","2","1","1","1"];

}else if(stage == 8){B_X[19] = ["0","1","1","3","3","1","1","0"];

}else if(stage == 9){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 17){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 18){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 19){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R107(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","0","1","0","1","0","1"];

}else if(stage == 2){B_X[19] = ["0","1","0","1","0","1","0","1"];

}else if(stage == 3){B_X[19] = ["0","1","0","1","0","1","0","1"];

}else if(stage == 4){B_X[19] = ["0","1","0","1","0","1","0","1"];

}else if(stage == 5){B_X[19] = ["0","1","0","1","0","1","0","1"];

}else if(stage == 6){B_X[19] = ["1","1","0","1","0","1","0","0"];

}else if(stage == 7){B_X[19] = ["1","1","3","1","0","1","1","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","1","0","2","1","2"];

}else if(stage == 9){B_X[19] = ["1","1","1","1","1","2","1","2"];

}else if(stage == 10){B_X[19] = ["1","2","1","2","1","3","1","3"];

}else if(stage == 11){B_X[19] = ["1","2","3","2","1","0","1","0"];

}else if(stage == 12){B_X[19] = ["1","2","1","2","1","0","1","0"];

}else if(stage == 13){B_X[19] = ["1","1","1","1","1","1","1","1"];

}else if(stage == 14){B_X[19] = ["1","2","0","3","1","0","1","0"];

}else if(stage == 15){B_X[19] = ["1","2","0","1","0","0","1","0"];

}else if(stage == 16){B_X[19] = ["1","2","1","0","1","1","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","0","0","1","0","0","0"];

}else if(stage == 18){B_X[19] = ["1","1","0","1","0","0","0","1"];

}else if(stage == 19){B_X[19] = ["1","1","0","1","0","0","1","1"];

}else if(stage == 20){B_X[19] = ["1","1","0","1","0","1","1","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R108(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","1","0","1","1","0","1","0"];

}else if(stage == 2){B_X[19] = ["0","1","2","1","1","2","1","0"];

}else if(stage == 3){B_X[19] = ["1","1","0","1","1","0","1","1"];

}else if(stage == 4){B_X[19] = ["0","0","0","1","1","0","0","3"];

}else if(stage == 5){B_X[19] = ["2","0","0","0","1","0","1","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","1","0","1","0","0"];

}else if(stage == 8){B_X[19] = ["1","1","1","1","0","1","1","1"];

}else if(stage == 9){B_X[19] = ["0","0","1","1","0","1","1","0"];

}else if(stage == 10){B_X[19] = ["0","0","1","1","0","0","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","1","3","0","2","1","2"];

}else if(stage == 12){B_X[19] = ["0","0","1","1","1","0","1","1"];

}else if(stage == 13){B_X[19] = ["1","1","1","1","1","0","1","0"];

}else if(stage == 14){B_X[19] = ["0","1","0","0","1","3","1","0"];

}else if(stage == 15){B_X[19] = ["0","0","0","0","1","0","1","0"];

}else if(stage == 16){B_X[19] = ["0","0","0","1","1","2","1","1"];

}else if(stage == 17){B_X[19] = ["1","0","0","0","1","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","1","1","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","0","1","1","1","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","1","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R109(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","3"];

}else if(stage == 3){B_X[19] = ["1","3","1","1","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","1","1","1","1","1","2"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","1","1","1","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","1","0","1"];

}else if(stage == 9){B_X[19] = ["1","1","1","0","0","1","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","1","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","1","1","1","1","0","0","1"];

}else if(stage == 14){B_X[19] = ["0","0","0","1","2","0","1","1"];

}else if(stage == 15){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 16){B_X[19] = ["1","0","0","1","1","1","0","0"];

}else if(stage == 17){B_X[19] = ["1","1","0","1","1","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","1","0","1","1","1"];

}else if(stage == 20){B_X[19] = ["0","0","0","1","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
{
function update_20_for_R110(){
//This section was made by SLOW Sam
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","2","1","2","2","1","2","1"];

}else if(stage == 4){B_X[19] = ["1","1","1","2","2","1","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","1","2","2","1","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","1","2","2","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","1","3","2","2","3","1","0"];

}else if(stage == 8){B_X[19] = ["1","0","2","2","2","2","0","1"];

}else if(stage == 9){B_X[19] = ["0","0","2","2","2","2","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","2","2","2","2","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","2","2","2","2","0","0"];

}else if(stage == 12){B_X[19] = ["1","0","2","2","2","2","0","1"];

}else if(stage == 13){B_X[19] = ["0","1","3","2","2","3","1","0"];

}else if(stage == 14){B_X[19] = ["0","1","1","2","2","1","1","0"];

}else if(stage == 15){B_X[19] = ["0","1","1","2","2","1","1","0"];

}else if(stage == 16){B_X[19] = ["0","1","1","2","2","1","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","1","2","2","1","1","0"];

}else if(stage == 18){B_X[19] = ["0","1","0","2","2","0","1","0"];

}else if(stage == 19){B_X[19] = ["0","1","0","2","2","0","1","0"];

}else if(stage == 20){B_X[19] = ["0","1","0","2","2","0","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R111(){
//This section was made by THE FACE
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 2){B_X[19] = ["0","1","3","1","3","1","1","0"];

}else if(stage == 3){B_X[19] = ["0","1","1","1","1","3","1","0"];

}else if(stage == 4){B_X[19] = ["0","1","1","1","1","3","1","0"];

}else if(stage == 5){B_X[19] = ["0","1","3","1","3","1","1","0"];

}else if(stage == 6){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 16){B_X[19] = ["0","1","2","1","1","2","1","0"];

}else if(stage == 17){B_X[19] = ["0","1","1","3","1","2","1","0"];

}else if(stage == 18){B_X[19] = ["0","1","2","1","1","2","1","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","1","1","1","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R112(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","1","3","3","1","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","3","0","0","3","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","1","0","0","0","0","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["1","3","1","1","1","1","3","1"];

}else if(stage == 10){B_X[19] = ["1","2","1","1","1","1","2","1"];

}else if(stage == 11){B_X[19] = ["1","2","3","1","1","3","2","1"];

}else if(stage == 12){B_X[19] = ["1","2","1","1","1","1","2","1"];

}else if(stage == 13){B_X[19] = ["3","2","1","1","1","1","2","3"];

}else if(stage == 14){B_X[19] = ["1","2","1","1","1","1","2","1"];

}else if(stage == 15){B_X[19] = ["1","1","1","1","1","1","1","1"];

}else if(stage == 16){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 17){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 18){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 19){B_X[19] = ["1","1","1","0","0","1","1","1"];

}else if(stage == 20){B_X[19] = ["3","3","3","2","2","3","3","3"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R113(){
//This section was made by Power JIM
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 5){B_X[19] = ["3","3","3","1","1","3","3","3"];

}else if(stage == 6){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 7){B_X[19] = ["1","1","1","2","2","1","1","1"];

}else if(stage == 8){B_X[19] = ["2","2","2","2","2","2","2","2"];

}else if(stage == 9){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 14){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 15){B_X[19] = ["1","0","0","0","0","0","0","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 20){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

function update_20_for_R114(){
//This section was made by Matthew
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["2","2","1","0","0","1","2","2"];

}else if(stage == 3){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 4){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 5){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 8){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 9){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 10){B_X[19] = ["1","0","1","0","0","1","0","1"];

}else if(stage == 11){B_X[19] = ["0","1","0","0","0","0","1","0"];

}else if(stage == 12){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 14){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 16){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","1","0","0","1","0","0"];

}else if(stage == 18){B_X[19] = ["0","0","0","1","1","0","0","0"];

}else if(stage == 19){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}
}
function update_20_for_R115(){
//This section was made by Julie
if(stage == 0){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 1){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 2){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 3){B_X[19] = ["1","0","0","0","0","0","0","0"];

}else if(stage == 4){B_X[19] = ["1","0","1","0","0","0","1","1"];

}else if(stage == 5){B_X[19] = ["0","0","1","0","0","0","0","1"];

}else if(stage == 6){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 7){B_X[19] = ["0","0","1","1","1","0","0","0"];

}else if(stage == 8){B_X[19] = ["1","0","0","1","0","1","0","0"];

}else if(stage == 9){B_X[19] = ["1","0","0","1","0","0","0","0"];

}else if(stage == 10){B_X[19] = ["0","0","0","0","0","0","0","1"];

}else if(stage == 11){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 12){B_X[19] = ["0","0","1","0","1","0","0","0"];

}else if(stage == 13){B_X[19] = ["0","0","1","0","1","1","1","0"];

}else if(stage == 14){B_X[19] = ["0","1","0","0","0","0","0","0"];

}else if(stage == 15){B_X[19] = ["0","1","0","0","1","1","0","1"];

}else if(stage == 16){B_X[19] = ["0","0","0","0","0","0","0","0"];

}else if(stage == 17){B_X[19] = ["0","0","1","0","0","0","1","0"];

}else if(stage == 18){B_X[19] = ["1","0","1","0","0","0","1","0"];

}else if(stage == 19){B_X[19] = ["1","0","1","0","0","0","0","0"];

}else if(stage == 20){B_X[19] = ["0","0","0","0","1","0","0","1"];

}else if(stage == 21){B_X[19] = ["0","0","0","0","0","0","0","0"];

level = -1;

stage = 0;

}
}

}
}
const NoRandoms = 115;

var death = "true";
var Admin = "false";
var changeSpeed = "true";

var cheatPageOpen = "false";
var iopen = "false";
var help = "false";
var waitTime = 300;

var TQWW = 0;
var SQWW = 0;

var colOpen = false;
var newHS = false;
var RightSpeed = true;
var speedV = "false";
var highscores = [];
var currentDifficulty = 0;
var diff = 0;
var stage = 0;
var level = 1;
var score = 0;
var dead = 0;
var onQ = 0;
var Q = "false";
var buttonPressed = 0;
var PlayerY = 4;
var P = "true";
var R_20 = 1;

//thanks to Andrew for figuring this bit out
var B_X = [];
{
B_X[0]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[1]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[2]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[3]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[4]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[5]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[6]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[7]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[8]  = ["0", "1", "0", "0", "0", "0", "0", "0"];
B_X[9]  = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[10] = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[11] = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[12] = ["0", "0", "0", "1", "0", "0", "0", "0"];
B_X[13] = ["0", "0", "1", "0", "0", "0", "0", "0"];
B_X[14] = ["0", "0", "0", "0", "0", "0", "1", "0"];
B_X[15] = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[16] = ["0", "0", "0", "0", "1", "1", "0", "0"];
B_X[17] = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[18] = ["0", "0", "0", "0", "0", "0", "0", "0"];
B_X[19] = ["0", "0", "0", "0", "0", "0", "0", "0"];
}

const difficulties = {
  beginner: 0,
  easy: 1,
  medium: 2,
  hard: 3,
  vhard: 4,
  ehard: 5,
  slow: 6,
  impossible: 7,
}