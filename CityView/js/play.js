const gameState = {};
var width =600;
var height = 600;
var playerLife = 3;
var flag = 0;
var Play = new Phaser.Class({
  Extends:Phaser.Scene,
  initialize: function BootScene(){
    Phaser.Scene.call(this,{
      key:'Play',
      active:false
    });
  },
  init:function(){
    gameState.road1 = this.add.rectangle(width / 2, 150, width, 200, 0x00bfff);
    gameState.road2 = this.add.rectangle(width / 2, 400, width, 200, 0xbbbbbb);
    gameState.safeRoad1 = this.add.sprite(300,275,'safe').setDisplaySize(600,50);
  //  gameState.safeRoad2 = this.add.sprite(300,325,'safe').setDisplaySize(600,50);
    gameState.bushBottom = this.add.sprite(300,525,'safe').setDisplaySize(600,50).setAngle(180);
    //gameState.bushTop = this.add.sprite(300,25,'bush').setDisplaySize(600,50);
    gameState.bushTop = this.add.sprite(300,25,'bush');
   // gameState.bushTop = this.add.sprite(450,25,'bush');
    life = this.add.text(0, 575, 'Player Life:'+playerLife, { fontSize: '15px', fill: '#000000' });
  },

  create:function () {
    gameState.active = true;
    gameState.cursors = this.input.keyboard.createCursorKeys();
    //create space key



    gameState.enemies = this.add.group();
    //logs
    gameState.logs = this.add.group();

    function makeBug() {
      const lane = this.lane;

      const isEven = Boolean(lane % 2);
      const startY = height - (25 + (lane * 50));
      const bugs = ['','', 'car1', 'car2','car2','car1','','bug1','bug2','bug3','bug1'];
      const bugChoice = bugs[lane % bugs.length];

      let startX, angle;

      if (isEven) {
        startX = width;
        angle = 90;
      } else {
        startX = 0;
        angle = -90;
      }
      //creat enemy & log
      if(lane>6){

        const log = gameState.logs.create(startX, startY, bugChoice).setAngle(angle).setDisplaySize(22,150);

        log.speed = this.speed;
      }else{
        const enemy = gameState.enemies.create(startX, startY, bugChoice).setAngle(angle);
        enemy.speed = this.speed;
      }
      
    }

    const lanes = [ 2, 3, 4, 5, 7, 8, 9,10];
    const speeds = [3, 3, 5, 4, 2, 3, 3, 2];
    const delays = [0.05, 1, 1, 0.05, 0.5, 0.75, 0.75, 0.5];
    //bug&log's creation Events
    gameState.bugCreationEvents = [];
    gameState.logCreationEvents = [];

    //bug:
    for (let i = 0; i < lanes.length; i++) {
      if(i>5){
        gameState.logCreationEvents.push(this.time.addEvent({
        //here to control the num of lane
          delay: delays[i] * 600 +800,
          callback: makeBug,
          callbackScope: { lane: lanes[i], speed: speeds[i] },
          loop: true,
        }))
      }else{
        gameState.bugCreationEvents.push(this.time.addEvent({
        //here to control the num of lane
          delay: delays[i] * 800 +1000,
          callback: makeBug,
          callbackScope: { lane: lanes[i], speed: speeds[i] },
          loop: true,
        }))
      }
      
    }

    gameState.player = this.add.sprite(width / 2, height - 75, 'codey').setDisplaySize(35,35);

    this.input.on('pointerup', () => {
      if (gameState.active === false) {
        this.scene.restart();
    }
  })
},

update:function(time) {
  Phaser.Input.Keyboard.KeyCodes.SPACE
  if (gameState.active) {
    if (time > 3000) {
      // if(Phaser.Input.Keyboard.JustDown(gameState.cursors.)){
      //   gameState.player.y-=50;
      // }

      if (Phaser.Input.Keyboard.JustDown(gameState.cursors.left) && gameState.player.x > 25) {
        gameState.player.x -= 50;
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.right) && gameState.player.x < 575) {
        gameState.player.x += 50;
      }

      if (Phaser.Input.Keyboard.JustDown(gameState.cursors.up) && gameState.player.y > 25) {
        if(gameState.player.y-50<=25 && gameState.player.x>=125 &&gameState.player.x<=175
          ||gameState.player.x>=275&&gameState.player.x<=325
          || gameState.player.x>=425&&gameState.player.x<=475)
        {
          gameState.player.y -= 50;
        }
        else if(gameState.player.y-50>25){
          gameState.player.y -= 50;
        }
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.down) && gameState.player.y < 525) {
        gameState.player.y += 50;
      }

      //press space to jump
      if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.player.y > 25) {
        if(gameState.player.y-100<=25 && gameState.player.x>=125 &&gameState.player.x<=175
          ||gameState.player.x>=275&&gameState.player.x<=325
          || gameState.player.x>=425&&gameState.player.x<=475)
        {
          gameState.player.y -= 100;
        }
        else if(gameState.player.y-100>25){
          gameState.player.y -= 100;
        }
      }
      // } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.down) && gameState.player.y < 525) {
      //   gameState.player.y += 50;
      // }
    }

    const playerRect = gameState.player.getBounds();

    gameState.enemies.getChildren().forEach(bug => {
      if (bug.angle === 90) {
        bug.x -= bug.speed;
      } else if (bug.angle === -90) {
        bug.x += bug.speed;
      }
       if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, bug.getBounds())) {
        gameState.active = false;

        //this.add.text(300, 300, 'Game Over!', { fontSize: '15px', fill: '#000000' })
        for (let e of gameState.bugCreationEvents) {
          e.destroy();
        }
        for(let e of gameState.logCreationEvents){
        	e.destroy();
        }
        playerLife-=1;
        if(playerLife == 0)
        {
          playerLife = 3;
          life.destroy();
          this.scene.start('GameOver',{status:0});
        }
        else{
          life.destroy();
          this.scene.restart();
        }
      }
    })

    var xPostion = gameState.player.x;
    flag = 0;
    gameState.logs.getChildren().forEach(log => {
      if (log.angle === 90) {
        log.x -= log.speed;
      } else if (log.angle === -90) {
        log.x += log.speed;
      }
      if (flag === 0 &&gameState.player.y === log.y && gameState.player.x>=log.x-gameState.player.width 
        && gameState.player.x<= log.x+gameState.player.width) {
      	flag =1;
        if (log.angle === 90) {
          gameState.player.x -= log.speed;
        } else if (log.angle === -90) {
          gameState.player.x += log.speed;
        }
        if(gameState.player.x<25||gameState.player.x>575){
          gameState.active = false;
          for (let e of gameState.logCreationEvents) {
            e.destroy();
          }
          for(let e of gameState.bugCreationEvents){
          	e.destroy();
          }
          playerLife-=1;
          if(playerLife == 0)
          {
            playerLife = 3;
            this.scene.start('GameOver',{status:0});
          }
          else{
            life.destroy();
            flag =1;
            this.scene.restart();
          }
        }
      }
   })
    gameState.logs.getChildren().forEach(log => {
    	if(flag ===0&&gameState.player.y === log.y){
    	  gameState.active = false;
          for (let e of gameState.logCreationEvents) {
            e.destroy();
          }
          for(let e of gameState.bugCreationEvents){
          	e.destroy();
          }
          playerLife-=1;
          if(playerLife == 0)
          {
            playerLife = 3;
            flag =1;
            this.scene.start('GameOver',{status:0});
          }
          else{
            life.destroy();
            flag =1;
            this.scene.restart();
          }
      }
    })
    flag = 0;
    if (gameState.player.y === 25) {

      //this.add.text(300, 300, 'You Won!', { fontSize: '15px', fill: '#000000' });
      gameState.active = false;

      for (let e of gameState.bugCreationEvents) {
        e.destroy();
      }
      for(let e of gameState.logCreationEvents){
      	e.destroy();
      }
      this.scene.start('GameOver',{status:1});
    }
  }
}
});


