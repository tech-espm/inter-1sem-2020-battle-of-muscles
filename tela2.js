

function tela2() {
	
	var texto;
	var teclaEsq;
    var teclaDir;
	var barraPesoEsq;
    var barraPesoDir;
    var estaColidindo;
    var larguraProgressBar = 843, fundoProgressBarX = 79, fundoProgressBarY = 110;
    var progressBarEsqX = 9, progressBarDirX = 851, progressBarY = 8;
  //  var timer, timerEvent, textoTimer;
	
	this.preload = function () {
		
		
		game.load.spritesheet("fundoTela1", "fundoTela1.jpg", 1000,750); 
		game.load.image("progressBarEsq", "progressBarEsq.png");
		game.load.image("progressBarDir", "progressBarDir.png");
		game.load.spritesheet("patrickPeso", "patrickPeso.png", 500, 422);
		game.load.spritesheet("bobEsponja", "bobEsponjaPeso.png", 489, 411);
		game.load.image("progressBar", "progressBar.png");
	//	game.load.image("fundoTimer", "fundoTimer.png");


	};
	
	this.create = function () {
	
		game.add.tileSprite(0, 0, 1000, 750, "fundoTela1");
	//	game.add.image(437, 20, "fundoTimer");
		fundoProgressBar = game.add.image(fundoProgressBarX, fundoProgressBarY, "progressBar");

		var estilo = {
			font: "normal 18px 'Press Start 2P Regular' ",
			fill: "#ffffff"
		};
		var estilo2 = {
			font: "normal 30px 'Press Start 2P Regular' ",
			fill: "#ffffff"
		};
		
		
		texto = game.add.text(0, 20, "  QUIT", estilo);
		

		texto.inputEnabled = true;
		texto.input.useHandCursor = true;
		vencedor = "nenhum";
		texto.events.onInputDown.add(textoFoiClicado);
		
		
		teclaEsq = game.input.keyboard.addKey(Phaser.KeyCode.D);
		teclaDir = game.input.keyboard.addKey(Phaser.KeyCode.L);

		progressBarEsq = game.add.image(fundoProgressBarX + progressBarEsqX, fundoProgressBarY + progressBarY, "progressBarEsq");
		//escolhendo quem fica fixo ( a parte de cima ou a de baixo)
		progressBarEsq.anchor.x = 0;
		progressBarEsq.anchor.y = 0;

		progressBarDir = game.add.image(fundoProgressBarX + progressBarDirX, fundoProgressBarY + progressBarY, "progressBarDir");
		progressBarDir.anchor.x = 1;
		progressBarDir.anchor.y = 0;
	
		progressBarEsq.scale.x = 0;
		progressBarDir.scale.x = 0;
		
		teclaEsqEstavaPressionada = false;
		teclaDirEstavaPressionada = false;

		//criando o personagem na tela e suas animações
		patrickPeso = game.add.sprite(30, 190, "patrickPeso");
		patrickPeso.animations.add("baixoPatrick", [0], 1, true);
		patrickPeso.animations.add("cimaPatrick", [1], 1, true);
		
		bobEsponja = game.add.sprite(500, 200, "bobEsponja");
		bobEsponja.animations.add("baixoBob", [0], 1, true);
		bobEsponja.animations.add("cimaBob", [1], 1, true);
		
		estaColidindo = false;
		
		somComeco.stop();
		batatadoce.loop = true;
		batatadoce.play();
		
	
		fadeIn();
	};
	
	this.update = function () {
		

		progressBarEsq.scale.x = progressBarEsq.scale.x - 0.0005;
		if (progressBarEsq.scale.x < 0) {
			progressBarEsq.scale.x = 0;
		
			}
			
		if (teclaEsq.isDown == true && teclaEsqEstavaPressionada == false) {
			teclaEsqEstavaPressionada = true;
			
		    
		    
			progressBarEsq.scale.x = progressBarEsq.scale.x + 0.015;
			if ((progressBarEsq.scale.x + progressBarDir.scale.x) > 1) {
				if (progressBarEsq.scale.x >= progressBarDir.scale.x) {
					progressBarDir.scale.x = 1 - progressBarEsq.scale.x - 0.1;
				} else {
					progressBarDir.scale.x = 1 - progressBarEsq.scale.x - 0.05;
				}
				if (progressBarDir.scale.x < 0) {
					progressBarDir.scale.x = 0;
				}
			}
			
			if (progressBarEsq.scale.x >= 1) {
				progressBarEsq.scale.x = 1;
				vencedor = "esquerda";
				qualModo = "tela2";
				game.state.start("gameover");
				
			}
		} else if (teclaEsq.isDown == false) {
			teclaEsqEstavaPressionada = false;
		}	
			
		if (teclaEsq.isDown) {
			patrickPeso.animations.play("cimaPatrick");
			
		} else {
				patrickPeso.animations.play("baixoPatrick");
		}
		
			
			
		progressBarDir.scale.x = progressBarDir.scale.x - 0.0005;
		if (progressBarDir.scale.x < 0) {
			progressBarDir.scale.x = 0;
			}
			
		if (teclaDir.isDown == true && teclaDirEstavaPressionada == false) {
			teclaDirEstavaPressionada = true;
			progressBarDir.scale.x = progressBarDir.scale.x + 0.015;
			if ((progressBarEsq.scale.x + progressBarDir.scale.x) > 1) {
				if (progressBarDir.scale.x >= progressBarEsq.scale.x) {
					progressBarEsq.scale.x = 1 - progressBarDir.scale.x - 0.1;
				} else {
					progressBarEsq.scale.x = 1 - progressBarDir.scale.x - 0.05;
				}
				if (progressBarEsq.scale.x < 0) {
					progressBarEsq.scale.x = 0;
				}
			}
			if (progressBarDir.scale.x >= 1) {
				progressBarDir.scale.x = 1; 
		//		fadeOut(fadeOutAcabou);
				qualModo = "tela2";
				game.state.start("gameover");
				vencedor = "direita";
			}
		} else if (teclaDir.isDown == false) {
			teclaDirEstavaPressionada = false;
		}	
		
				
		if (teclaDir.isDown) {
			bobEsponja.animations.play("cimaBob");
			
		} else {
				bobEsponja.animations.play("baixoBob");
			}			
		
		
	};

	
	
	function textoFoiClicado() {
		batatadoce.stop();
		game.state.start("menu");
		
	}
	function fadeOutAcabou() {
	
//		game.state.start("gameover");
		
	}

  
  
  
	
}