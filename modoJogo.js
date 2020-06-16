var qualModo;

function modoJogo() {
var comTempo;
	
	this.preload = function () {
		game.load.spritesheet("modoJogo", "modoJogo.png", 1000,750); 
		game.load.spritesheet("comTempo", "comTempo.png", 271,41); 
		game.load.spritesheet("semTempo", "semTempo.png", 270,41); 
		game.load.spritesheet("btnSom", "btnSom.png", 50,56);
	};
	
	this.create = function () {
		
		game.add.tileSprite(0, 0, 1000, 750, "modoJogo");	
		
		comTempo = game.add.sprite(368,347, "comTempo");
		comTempo.inputEnabled = true;
		comTempo.input.useHandCursor = true;
	
		comTempo.animations.add("soltoComTempo", [0], 1, true);
		comTempo.animations.add("clickComTempo", [1], 1, true);
		comTempo.events.onInputDown.add(mouse);
	
		semTempo = game.add.sprite(368,437, "semTempo");
		semTempo.inputEnabled = true;
		semTempo.input.useHandCursor = true;
	
		semTempo.animations.add("soltoSemTempo", [0], 1, true);
		semTempo.animations.add("clickSemTempo", [1], 1, true);
		semTempo.events.onInputDown.add(mouse2);
    	game.input.addMoveCallback(p, this);
	
		

		btnSom = game.add.sprite(10,690, "btnSom");
		btnSom.inputEnabled = true;
		btnSom.input.useHandCursor = true;

		btnSom.animations.add("ligado", [0], 1, true);
		btnSom.animations.add("desligado", [1], 1, true);
		btnSom.events.onInputDown.add(mudarSom);

			if(status=="ligado"){
			//	somComeco.play();
				
			}else{
				somComeco.stop();
				btnSom.animations.play("desligado");
			}	
		 

		fadeIn();
	};
	
	this.update = function () {
		if (comTempo.input.pointerOver())
	    {
	        comTempo.animations.play("clickComTempo");	
	    }
	    else
	    {
	        comTempo.animations.play("soltoComTempo");	
	        
	    }
	    
	    if (semTempo.input.pointerOver())
	    {
	        semTempo.animations.play("clickSemTempo");		 
	     }
	    else
	    {

	        semTempo.animations.play("soltoSemTempo");		        
	    }
};
	


	function mouse(){
		somPato.play();
		fadeOut(fadeOutAcabou);
	}
	function mouse2(){
		somPato.play();
		fadeOut(fadeOutAcabou2);
	}

	function fadeOutAcabou() {
		qualModo = "tela1";
		game.state.start("tela1");
		
	}
		function fadeOutAcabou2() {
		qualModo = "tela2";

		game.state.start("tela2");
		
	}
	function p(pointer) {
		
	}
	
	
function render() {

   // game.debug.text("Over: " + comTempo.input.pointerOver(), 32, 32);
    game.debug.text(game.input.mouse.locked, 320, 32);

}

//https://phaser.io/examples/v2/input/group-input-events	
}
