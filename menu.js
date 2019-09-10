//Menu State
var Menu = new Phaser.Class({
	Extends:Phaser.Scene,
	initialize: function BootScene(){
		Phaser.Scene.call(this,{
			key:'Menu',
			active:false
		});
	},
	init:function(){

	},

	create:function(){
		var title = this.add.sprite(300,200,'title');
		var bushs = this.add.sprite(300,500,'bush');
		//var bush2 = this.add.sprite()
		var instructText = this.add.text(200, 450, 'Press Up to Start', { fontSize: '15px', fill: '#000000' });
		this.cursors = this.input.keyboard.createCursorKeys(); 
	},
	update:function (){
		if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
			this.scene.start('Play');
		}
	}
});


