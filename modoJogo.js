var qualModo;

function modoJogo() {
var comTempo;
	
	this.preload = function () {
		
		game.load.spritesheet("modoJogo", "modoJogo.png", 1000,750); 
		game.load.spritesheet("comTempo", "comTempo.png", 271,41); 
		game.load.spritesheet("semTempo", "semTempo.png", 270,41); 
		carregarSom(false);
		
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
		
		criarSom();
		
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
		
		somComeco.stop();
		qualModo = "tela1";
		game.state.start("tela1");
		
	}
	
	function fadeOutAcabou2() {
		
		somComeco.stop();
		qualModo = "tela2";
		game.state.start("tela2");
		
	}
	function p(pointer) {
		
	}

//https://phaser.io/examples/v2/input/group-input-events	
}
