var ball = {
    pos_x : 0,
    pos_y : 0,
    speed_x : 0,
    speed_y : 0
};

var upperPanel = {
    pos_x : 0
};


var lowerPanel = {
    pos_x : 0
};

var game = {
    score_player1 : 0,
    score_player2 : 0
}

var mainSpeed = 6;

function onLoad(){
    var gameFPS = 30; // set FPS to be refreshed
    var refreshRate = 1000 / gameFPS;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    function drawBackground(){

        context.fillStyle = '#333333';
        context.fillRect(0,0, canvas.width, canvas.height);

        context.strokeStyle = "#cccccc";
        context.beginPath();
        context.moveTo(0, 240);
        context.lineTo(canvas.width, 240);
        context.stroke();
    }

    function drawUpperPanel(label_x){
        context.fillStyle = "#cccccc";
        context.fillRect(label_x, 10, 100, 10);

    }

    function drawDownPanel(label_x){
        context.fillStyle = "#cccccc";
        context.fillRect(label_x, canvas.height - 20, 100, 10 );

    }

    function drawBall(label_x, label_y){
        context.fillStyle = '#cccccc';
        context.beginPath();
        context.arc(label_x,label_y,10,0, Math.PI * 2, true);
        context.fill();
    }

    function updateBall(){
        if(ball.pos_x > canvas.width || ball.pos_x < 0){
            ball.speed_x = -ball.speed_x;
        }

        if(ball.pos_y <= 25 && ball.pos_x >= upperPanel.pos_x && ball.pos_x <= (upperPanel.pos_x + 100)){
            ball.speed_y = -ball.speed_y;
            ball.speed_x = ((ball.pos_x - 50) - upperPanel.pos_x) / 10;
        }

        if(ball.pos_y >= canvas.height - 25 && ball.pos_x >= lowerPanel.pos_x && ball.pos_x <= (lowerPanel.pos_x + 100)){
            ball.speed_y = -ball.speed_y;
            ball.speed_x = ((ball.pos_x - 50) - lowerPanel.pos_x) / 10;
        }


        ball.pos_x += ball.speed_x;
        ball.pos_y += ball.speed_y;
    }

    function updateLowerPanel(){
        if(ball.pos_x - 30 < lowerPanel.pos_x){
            lowerPanel.pos_x-= mainSpeed / 2;
        } else if (ball.pos_x + 30 > lowerPanel.pos_x) {
            lowerPanel.pos_x+= mainSpeed / 2;
        }
    }

    function updateScore(){
        if (ball.pos_y < 0){
            game.score_player2 += 1;
            startBall(1);
        }

        if(ball.pos_y > canvas.height){
            game.score_player1 += 1;
            startBall(0);
        }
    }

    function mainLogic(){
        updateBall();
        updateUpperPanel();
        updateLowerPanel();
        updateScore();

    }

    function updateUpperPanel(){
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    upperPanel.pos_x -= mainSpeed;
                    break;
                case 39:
                    upperPanel.pos_x += mainSpeed;
                    break;
            }
        };


    }

    function drawScore(s_player1, s_player2){
        context.fillStyle = "#cccccc";
        context.font="20px Georgia";
        context.fillText(s_player1, 15, 220);
        context.fillText(s_player2, 15, 270);
    }

    function pongGame(){
        mainLogic();

        drawBackground();
        drawUpperPanel(upperPanel.pos_x);
        drawDownPanel(lowerPanel.pos_x);
        drawBall(ball.pos_x,ball.pos_y);
        drawScore(game.score_player1, game.score_player2);
    }

    function startPanels(){
        upperPanel.pos_x = canvas.width / 2 - 50;
        lowerPanel.pos_x = canvas.width / 2 - 50;
    }

    function startBall(status){
        ball.pos_x = canvas.width / 2;
        ball.pos_y = canvas.height / 2;

        while(ball.speed_x == 0) {
            ball.speed_x = Math.ceil(Math.random() * mainSpeed * 2) - mainSpeed;
        }


        if(status == 1){
            ball.speed_y = mainSpeed;
        } else {
            ball.speed_y = -mainSpeed;
        }


    }

    function startGame(){
        startBall();
        startPanels();
    }

    startGame();
    window.setInterval(pongGame, refreshRate);
}