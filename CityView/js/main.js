/*const config = {
  width: 600,
  height: 600,
  parent:'canvas',
  backgroundColor: 0xaaffaa
}*/
var game;
window.onload = function(){
	const config = {
 	width: 600,
  	height: 600,
  	backgroundColor: 0xaaffaa
  	},

  	game = new Phaser.Game(config);
  	game.scene.add('Load',Load);
  	game.scene.add('Menu',Menu);
  	game.scene.add('Play',Play);
  	game.scene.add('GameOver',GameOver);
  	game.scene.start('Load');
}


