function perdeu() {
	var texto;
	var texto2;
	this.preload = function () {
		game.stage.backgroundColor = "#000000";
		game.load.image("gameoverIMG", "gameOverImagem.jpg");
		game.load.audio("gameover", "gameover.mp3");
	};
	
	this.create = function () {
		game.add.image(320,220, "gameoverIMG");
		game.load.audio("somPato", "batatadoce.mp3");
		
		
		var estilo = {
			font: "normal 16px 'Press Start 2P Regular'",
			fill: "#ffffff"
		};
		var estilo2 = {
			font: "normal 16px 'Press Start 2P Regular'",
			fill: "red"
		};
		
		texto = game.add.text(380, 340, "JOGAR NOVAMENTE", estilo);
		texto2 = game.add.text(400, 370, "alterar modo", estilo2);

		texto.inputEnabled = true;
		texto.input.useHandCursor = true;
		texto.events.onInputDown.add(textoFoiClicado);
		texto2.inputEnabled = true;
		texto2.input.useHandCursor = true;
		texto2.events.onInputDown.add(texto2FoiClicado);
		gameover = game.add.audio("gameover", 0.2);
		gameover.play();
	};
	
	this.update = function () {
		
	};
	
	function textoFoiClicado() {
		
		if(qualModo == "tela2"){
			game.state.start("tela2");
		}else{
			game.state.start("tela1");
		}
		
		
	}
	function texto2FoiClicado() {
		
		game.state.start("modoJogo");
		
	}
}
