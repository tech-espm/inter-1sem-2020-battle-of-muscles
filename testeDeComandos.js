function testeDeComandos() {
	var teclaEsq;
	var teclaDir;
	
	this.preload = function () {

		game.load.spritesheet("botao", "botao2.png", 249,109);
		game.load.spritesheet("testeComandos", "testeComandos.png", 1000,750); 
		game.load.image("fraseTesteComandos", "fraseTesteComandos.png");
		game.load.spritesheet("spriteD", "spriteD.png", 143,144); 
		game.load.spritesheet("spriteL", "spriteL.png", 144,144);
		carregarSom(false);
		
	};
	
	this.create = function () {
		
		game.add.tileSprite(0, 0, 1000, 750, "testeComandos");
		frase = game.add.sprite(5,100, "fraseTesteComandos");	
		
		spriteD = game.add.sprite(50,300, "spriteD");	
		spriteL = game.add.sprite(807,300, "spriteL");
		
		
		teclaEsq = game.input.keyboard.addKey(Phaser.KeyCode.D);
		teclaDir = game.input.keyboard.addKey(Phaser.KeyCode.L);
		
		spriteD.animations.add("semD", [0], 1, true);
		spriteD.animations.add("comD", [1], 1, true);
		
		spriteL.animations.add("semL", [0], 1, true);
		spriteL.animations.add("comL", [1], 1, true);
		
		botao = game.add.sprite(400,605, "botao");	
		botao.inputEnabled = true;
		
		botao.input.useHandCursor = true;
	
		botao.events.onInputDown.add(botaoFoiClicado);
		botao.animations.add("cimaBotão", [0], 1, true);
		botao.animations.add("baixoBotao", [1], 1, true);
		
		botao.events.onInputDown.add(mouse);
		
		criarSom();
		
		fadeIn();
		
	};
	
	this.update = function () {
		if (teclaEsq.isDown) {
			spriteD.animations.play("comD");
			
		} else {
				spriteD.animations.play("semD");
		}
		
		if (teclaDir.isDown) {
			spriteL.animations.play("comL");
			
		} else {
				spriteL.animations.play("semL");
		}
	};
	
	function botaoFoiClicado() {
		
		fadeOut(fadeOutAcabou);
	
	}
	function mouse(){
		botao.animations.play("baixoBotao");
		somPato.play();
		
	}

	
	function fadeOutAcabou() {
		
		somComeco.stop();
		game.state.start("modoJogo");
		
	}
}
