const gameState = {};

const gameConfig = {
    width : 500,
    height : 720,
    backgroundColor : 0x000000,
    scene:{
        preload: preload,
        create: create,
        update: update
    },
}

const game = new Phaser.Game(gameConfig);
leftFlag = 1;
rightFlag = 1;

function preload ()
{
    this.load.image('frog', 'assets/frog.png');
}

function create (){
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.frog = this.add.sprite(gameConfig.width/2, gameConfig.height - 30, 'frog');
}

function update (){
    if (gameState.cursors.left.isDown){
        if (leftFlag == 1){
            if (gameState.frog.x > 50){
                gameState.frog.x -= 50;
            }
            leftFlag = 0;
        }
    }

    if (gameState.cursors.left.isUp){
        if (leftFlag == 0){
            leftFlag = 1;
        }
    }

    if (gameState.cursors.right.isDown){
        if (rightFlag == 1){
            if (gameState.frog.x < 450){
                gameState.frog.x += 50;
            }
            rightFlag = 0;
        }
    }

    if (gameState.cursors.right.isUp){
        if (rightFlag == 0){
            rightFlag = 1;
        }
    }
}






