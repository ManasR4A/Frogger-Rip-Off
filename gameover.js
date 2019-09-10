var GameOver = new Phaser.Class({
	Extends:Phaser.Scene,
	initialize: function BootScene(){
		Phaser.Scene.call(this,{
			key:'GameOver',
			active:false
		});
	},
	init:function(data){
		this.Play = this.scene.get('Play');
	},

	create:function(data){
		if(data.status === 0 ){
        	this.add.text(250, 300, 'Game Over!', { fontSize: '15px', fill: '#000000' })

		}else{
			this.add.text(250, 300, 'You Won!', { fontSize: '15px', fill: '#000000' });
		}
		this.add.text(200, 475, 'Press Up to Play Again!', { fontSize: '15px', fill: '#000000' });
		this.cursors = this.input.keyboard.createCursorKeys(); 
	},
	update:function (){
		if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
			this.scene.start('Play');
		}
	}
});