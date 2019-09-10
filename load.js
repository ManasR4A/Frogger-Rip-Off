//load state
var Load = new Phaser.Class({
	Extends:Phaser.Scene,

	initialize:function BootScene(){
		Phaser.Scene.call(this,{
			key:'Load',
			active:false //listening resize event
		});
	},
	init:function(){},
	preload:function(){
		this.load.image('bug1', 'assets/Turtle_1.png');
  		this.load.image('bug2', 'assets/Turtle_2.png');
  		this.load.image('bug3', 'assets/Turtle_3.png');
		this.load.image('car1','assets/Car.png');
  		this.load.image('car2','assets/Truck_long.png');
  		this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
  		this.load.image('title','assets/FROGGER_title.png');
  		this.load.image('bush','assets/Green_Bush.png');
 		this.load.image('safe','assets/Safe_Zone.png');
  		this.load.image('log','assets/Medium_Log.png');
		this.load.image('3','assets/3.png');
		this.load.image('2','assets/2.png');
		this.load.image('1','assets/1.png');
	},
	create:function(){
		 var loadText = this.add.text(300,300,'Loading...',{font:'Helvetica',fontSize:'24px',fill:'#fff'});

		 this.scene.start('Play');
	}
})

