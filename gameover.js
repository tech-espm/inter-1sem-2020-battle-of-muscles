function gameover() {
	var patrick;
	var bob;
	
	var texto;
	var texto2;
	var quem;

	
	this.preload = function () {
		
		game.stage.backgroundColor = "#000000";
	//	game.load.spritesheet("gameoverIMG", "gameOverImagem.jpg", 350,150);
		game.load.spritesheet("patrickPeso", "patrickPeso.png", 500, 422);
		game.load.spritesheet("bobEsponja", "bobEsponjaPeso.png", 489, 411);
		game.load.image("fundoBaloes", "fundoBaloes.png");
		game.load.audio("patrick", "patrick.mp3");
		game.load.audio("bob", "bob.mp3");
	};
	
	this.create = function () {
		
		game.add.tileSprite(0, 0, 1000, 750, "fundoBaloes");
     //	gameoverIMG = game.add.sprite(320,200, "gameoverIMG");

		
		var estilo = {
			font: "normal 16px 'Press Start 2P Regular'",
			fill: "#ffffff"
		};
		var estilo2 = {
			font: "normal 16px 'Press Start 2P Regular'",
			fill: "red"
		};
		
		texto = game.add.text(380, 320, "JOGAR NOVAMENTE", estilo);
		texto2 = game.add.text(405, 350, "alterar modo", estilo2);

		
		texto.inputEnabled = true;
		texto.input.useHandCursor = true;
		texto.events.onInputDown.add(textoFoiClicado);
		texto2.inputEnabled = true;
		texto2.input.useHandCursor = true;
		texto2.events.onInputDown.add(texto2FoiClicado);



		
		if(vencedor == 'esquerda'){
			patrickPeso = game.add.sprite(257, 335, "patrickPeso");
			patrickPeso.animations.add("sobeDesce", [0, 1], 3, true);
			patrick = game.add.audio("patrick", 0.2);
			patrick.loop = true;
			patrick.play();
			quem = patrick;


		}else if(vencedor == 'direita'){
		
			bobEsponjaPeso = game.add.sprite(262, 335, "bobEsponja");
			bobEsponjaPeso.animations.add("sobeDesce", [0, 1], 3, true);
			bob = game.add.audio("bob", 0.2);
			bob.loop = true;
			bob.play();
			quem = bob;
		}else{
		
		}
		
		
	};
	
	this.update = function () {
		if(vencedor == 'esquerda'){
			patrickPeso.animations.play("sobeDesce");

		}else if(vencedor == 'direita'){
			bobEsponjaPeso.animations.play("sobeDesce");

			
		}else{
			
		}
	
	
		
	};
	
	function textoFoiClicado() {
	
		if(qualModo == "tela2"){
			quem.stop();
			game.state.start("tela2");
		}else{
			quem.stop();
			game.state.start("tela1");
		}
		
	}
	function texto2FoiClicado() {
		
		quem.stop();
		game.state.start("modoJogo");
		
	}
	
}
