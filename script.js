//abab8270 Abdifatah Abdi
//paah4127 Pablo Ahaava Pizarro
var myGamePiece;
var myObstacles = [];

var movementLength = 20;
var gameStarted = false;
var input;

var encryptions = ["fojhnb", "seiretsym", "101 0010 - 101 0101 - 100 1110"];
var hints = ["If you want to be done, use the alphabet minus one.", "This problem is cursed but might be solved when reversed.", "This problem needs a pass-key to load, maybe refer to the ASCII-code."];
var answers = ["enigma", "mysteries", "RUN"];

var levelNumber;
var inMenu = true;

var showEncryption = false;
var showHint = false;
var doorUnlocked = false;

var title;
var button;

var feedbackOutput;



//TODO Canvas till höger om spelplanen med feedback.
//Innan varje nivå, en kort historia om typen av kryptering, knapp som startar banan?
//Display av vad spelaren gör och befinner sig. Om man står vid dörren, bild på dörr med krypteringen?
//(Mangaz shit) När man klarar nivån, dörröppnings animation???
//När man står vid ledtråden, bild på den?

function startGame() {
    myGameArea.start();
    feedbackScreen.start();

    myGamePiece = new component(30, 30, "red", 500, 500, "player");
    levelOneHint = new component(50,20,"black",950,150,"hint");
    levelTwoHint = new component(50,20,"black",320,380,"hint");
    levelThreeHint = new component(50,20,"black",200,200,"hint");

    title = document.createElement("h1");
    title.innerHTML = "CryptKeeper";
    title.className = "part";
    title.id = "title";
    
    button = document.createElement("button");
    button.id = "startButton";
    button.className = "part";
    button.innerHTML = "Start";
    
    feedbackOutput = document.createElement("textarea");
    feedbackOutput.id = "feedbackOutput";
    feedbackOutput.className = "part";
    feedbackOutput.rows = 20;
    feedbackOutput.readOnly = true;
    feedbackOutput.style.resize = "none";
    
    document.body.appendChild(title);
    document.body.appendChild(button);
    document.body.appendChild(feedbackOutput);
    createMenu();
    //createInitialLevel();
    //createLevelTwo();
    //createLevelThree();
}
function restartGame(){
    myGameArea.clear();
    feedbackScreen.clear();
    
    levelNumber = 0;
    gameStarted = false;
    inMenu = true;
    
    createMenu();
}

function createMenu (){

    button.style.display = "block";
    title.style.display = "block";
    feedbackOutput.style.display = "none";

    changeCanvasColor(myGameArea, "red");
    changeCanvasColor(feedbackScreen, "orange");

    changeCanvasText(feedbackScreen, "Welcome to CryptKeeper", 30, 300);

    button.addEventListener ("click", function() {
        debugger;
        inMenu = false;
        createInitialLevel();
        button.style.display = "none";
        title.style.display = "none";
        gameStarted = true;
    });

}

function changeCanvasColor(canvasObj, color){
    if(canvasObj.canvas.id == "canvas"){
        myGameArea.clear();
        myGameArea.context.fillStyle = color;
        myGameArea.context.fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);
    }
    else if (canvasObj.canvas.id == "feedbackCanvas"){
        feedbackScreen.clear();
        feedbackScreen.context.fillStyle = color;
        feedbackScreen.context.fillRect(0,0,feedbackScreen.canvas.width,feedbackScreen.canvas.height);
    }
}

function changeCanvasText(canvasObj, text, x, y){
    if(canvasObj.canvas.id == "canvas"){
        myGameArea.context.font = "30px Arial";
        myGameArea.context.strokeText(text, x, y);
    }
    else if (canvasObj.canvas.id == "feedbackCanvas"){
        feedbackScreen.context.font = "30px Arial";
        feedbackScreen.context.strokeText(text, x, y);
    }
}



function createInitialLevel (){
    feedbackOutput.style.display = "block";
    myGamePiece.setStartPosition((myGameArea.canvas.width / 2)+200, (myGameArea.canvas.height / 2)+150);
    changeCanvasColor(myGameArea, "gray");
    changeCanvasColor(feedbackScreen, "orange");
    clearObstacleList();
    input = createInput();
    levelNumber = 0;
    addToObstacleList(levelOneHint);
    addToObstacleList(new component(500,30,"blue",200,0,"door"));
    addToObstacleList(new component(100, 820, "#FF7912", 0,0, "obstacle"));
    addToObstacleList(new component(1200, 100, "#FF7912", 300,0, "obstacle"));
    addToObstacleList(new component(1200,200,"#FF7912",100,620,"obstacle"));
    addToObstacleList(new component(100,520,"#FF7912",1100,100,"obstacle"));

}

function createLevelTwo(){
    doorUnlocked = false;
    clearObstacleList();
    myGamePiece.setStartPosition((myGameArea.canvas.width / 2)+200, (myGameArea.canvas.height / 2)+300);
    input = createInput();
    levelNumber = 1;
    addToObstacleList(levelTwoHint);
    addToObstacleList(new component(500, 30, "blue", 900, 0, "door"));
    addToObstacleList(new component(300, 820, "#FF7912", 0,0, "obstacle"));
    addToObstacleList(new component(300,820,"#FF7912",980,0,"obstacle"));
    addToObstacleList(new component(500,40,"#FF7912",500,500,"obstacle"));
    addToObstacleList(new component(500,30,"#FF7912",400,300,"obstacle"));
    addToObstacleList(new component(50,300,"#FF7912",400,300,"obstacle"));
    addToObstacleList(new component(200,30,"#FF7912",200,300,"obstacle"));

}

function createLevelThree(){
    doorUnlocked = false;
    clearObstacleList();
    myGamePiece.setStartPosition((myGameArea.canvas.width / 2)+200, (myGameArea.canvas.height / 2)+100);
    input = createInput();
    levelNumber = 2;
    addToObstacleList(levelThreeHint);
    addToObstacleList(new component(60,70,"blue",1220,50,"door"));
    addToObstacleList(new component(100, 400, "#FF7912", 300,150, "obstacle"));
    addToObstacleList(new component(100, 560, "#FF7912", 1180,120, "obstacle"));
    addToObstacleList(new component(50, 300, "#FF7912", 0,0, "obstacle"));
    addToObstacleList(new component(50, 380, "#FF7912", 0,300, "obstacle"));
    addToObstacleList(new component(780,100,"#FF7912",400,200,"obstacle"));
    addToObstacleList(new component(1280,50,"#FF7912",0,0,"obstacle"));
    addToObstacleList(new component(1280,50,"#FF7912",0,680,"obstacle"));
    addToObstacleList(new component(200,50,"#FF7912",0,300,"obstacle"));


}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (i = 0; i < 6; i++) {3
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


function addToObstacleList(obj){
    myObstacles.push(obj);
}

function clearObstacleList(){
    myObstacles.length = 0;
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 820;
        this.canvas.id = "canvas";
        this.canvas.className = "part";
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);  
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var feedbackScreen = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 820;
        this.canvas.id = "feedbackCanvas";
        this.canvas.className = "part";
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateFeedback, 20);
    },
    clear : function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}


function createInput(){
    var input = document.createElement("input");
    input.type = "text";
    input.id = "myInput";
    input.className = "part";
    input.style.width = "300px";
    input.style.height = "30px";
    input.style.fontSize = "large";
    input.autocomplete = "off";
    input.placeholder = "Type your answer here";
    document.body.appendChild(input);
    return input;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.topspeed = 10;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.color = color;
    

    this.update = function() {
        ctx = myGameArea.context;
        feedbackCtx = feedbackScreen.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if(this.type == "obstacle"){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        else if(this.type == "story"){
            feedbackCtx.font = this.width + " " + this.height;
            feedbackCtx.fillStyle = this.color;
            feedbackCtx.fillText(this.text, this.width, this.height);
        }
        else if(this.type == "player"){
            changeCanvasColor(myGameArea, "gray");
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }


    }

    this.setStartPosition = function(x, y){
        this.speedX = x;
        this.speedY = y;
    }

    this.move = function() {
        this.x = this.speedX;
        this.y = this.speedY;
        this.hitBorder();
    }
    this.hitBorder = function() {
        var bottom = myGameArea.canvas.height - this.height;
        var top = 0;
        var left = 0;
        var right = myGameArea.canvas.width - this.width;
        if (this.y > bottom) {
            this.y = bottom;
        }
        if(this.y < top){
            this.y = top;
        }

        if(this.x < left){
            this.x = left;
        }

        if(this.x > right){
            this.x = right;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;  

        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }

        if(mybottom>othertop&&myleft<otherright){
            return "southwest"
        }
        if(mybottom>othertop&&myright<otherleft){
            return "southeast";
        }
        if(mytop< otherbottom&& myleft< otherright){
            return "northwest";
        }
        if(mytop< otherbottom && myright < otherleft){
            return "northeast";
        }

        if(mybottom > othertop){
            return "south";

        }
        if(mytop < otherbottom){
            return "north";
        }
        if(myleft < otherright){
            return "west";
        }
        
        if(myright < otherleft){
            return "east";
        }

        if(collisionstring.length == 0){
            return null;
        }
        
    }
}

function collisionCheckRectRect(rectOne, rectTwo){

    var x1=rectOne.x, y1 = rectOne.y, height1 = rectOne.height, width1 = rectOne.width;
    var x2=rectTwo.x, y2 = rectTwo.y, height2 = rectTwo.height, width2 = rectTwo.width; 

    return x1 < x2+width2 && x2 < x1+width1 && y1 < y2+height2 && y2 < y1+height1;
}



function crashCheck(player, obj){
    if(collisionCheckRectRect(player,obj)){

        if(obj.type =="door"){
            showEncryption = true;
            if(doorUnlocked){
                if(levelNumber==0){
                    createLevelTwo();
                    return true;     
                 }
                 if(levelNumber ==1){
                     createLevelThree();
                     return true;
                 }
                 if(levelNumber ==2){  
                     restartGame();
                     return true;
                 }
            }      
            return true;
        }
        
        if(obj.type == "obstacle"){
            
            myGamePiece.x = myGameArea.canvas.width / 2;
            myGamePiece.y = myGameArea.canvas.height / 2;
            restartGame();
            return true;
        }

        if(obj.type =="hint"){
            showHint = true;
            return true;
        }
    }

return false;
}


function updateFeedback(){
    changeCanvasColor(feedbackScreen, "orange");
    if(showEncryption){
        feedbackOutput.style.display = "block";
        feedbackOutput.value = encryptions[levelNumber];
        input.disabled = false;
        showEncryption = false;
        return;
    }

    if(showHint){
        feedbackOutput.style.display = "block";
        feedbackOutput.value = hints[levelNumber];
        showHint = false;
        return;
    }
    feedbackScreen.clear();
    feedbackScreen.canvas.style.backgroundImage = "url(info.png)";
    feedbackOutput.style.display = "none";
}

function updateGameArea() {

    if(inMenu){
        return;
    }

    for (i = 0; i < myObstacles.length; i += 1) {
       if(crashCheck(myGamePiece, myObstacles[i])){
        break;
       }  
    }
  

    myGamePiece.move();
    myGamePiece.update();
    
    for(i =0;i<myObstacles.length;i++){
        myObstacles[i].update();
    }
    
}


function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}


document.addEventListener('keydown', function(ev){
    
    //Kollar om input elementet är fokuserat.
    if(input == document.activeElement){
        
        //Om spelaren trycker ENTER
        if(ev.keyCode == 13){
            if(input.value == answers[levelNumber]){
                feedbackOutput.value = "CORRECT";
                doorUnlocked = true;

                for(i = 0; i < myObstacles.length; i++){
                    if(myObstacles[i].type == "door"){
                        myObstacles[i].color = "green";
                    }
                }
            }
            else{
                feedbackOutput.value = "WRONG";
            }
        }

        //Hoppar ur funktionen så att spelaren inte kan röra på sig när man skriver i input.
        return;
    }

    //Sätter input fältet till disabled
    

    if(ev.keyCode == 65) {
        moveleft();
    }
    else if(ev.keyCode == 68){
        moveright();
    }
    else if(ev.keyCode == 87){
        moveup();
    }
    else if(ev.keyCode == 83){
        movedown();
    }
});

function moveup() {
    myGamePiece.speedY -= movementLength; 
}

function movedown() {
    myGamePiece.speedY += movementLength; 
}

function moveleft() {
    myGamePiece.speedX -= movementLength; 
}

function moveright() {
    myGamePiece.speedX += movementLength; 
}