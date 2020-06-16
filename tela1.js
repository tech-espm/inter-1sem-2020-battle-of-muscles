
var vencedor;

var teclaEsqEstavaPressionada;
var teclaDirEstavaPressionada;

function tela1() {
	
	var texto;
	var teclaEspaco;
	var teclaEsq;
    var teclaDir;
	var barraPesoEsq;
	var fundoTimer;
    var barraPesoDir;
    var estaColidindo;
    var larguraProgressBar = 843, fundoProgressBarX = 79, fundoProgressBarY = 110;
    var progressBarEsqX = 9, progressBarDirX = 851, progressBarY = 8;
    var timer, timerEvent, textoTimer;
    var countdown, countdownEvent, textoCountDown;
    var birl;
	
	this.preload = function () {
		
		
		game.load.spritesheet("fundoTela1", "fundoTela1.jpg", 1000,750); 
		game.load.image("progressBarEsq", "progressBarEsq.png");
		game.load.image("progressBarDir", "progressBarDir.png");
		game.load.spritesheet("patrickPeso", "patrickPeso.png", 500, 422);
		game.load.spritesheet("bobEsponja", "bobEsponjaPeso.png", 489, 411);
		game.load.image("progressBar", "progressBar.png");
		game.load.image("fundoTimer", "fundoTimer.png");
		game.load.audio("birl", "birl.mp3");
		game.load.audio("dj", "dj.mp3");
		game.load.spritesheet("btnSom", "btnSom.png", 50,56);
		
	
	};
	
	this.create = function () {

		

		game.add.tileSprite(0, 0, 1000, 750, "fundoTela1");
		fundoTimer= game.add.image(437, 20, "fundoTimer");
		fundoProgressBar = game.add.image(fundoProgressBarX, fundoProgressBarY, "progressBar");

		var estilo = {
			font: "normal 18px 'Press Start 2P Regular' ",
			fill: "#ffffff"
		};
		var estilo2 = {
			font: "normal 30px 'Press Start 2P Regular' ",
			fill: "#ffffff"
		};
		var estilo3 = {
			font: "normal 30px 'Press Start 2P Regular' ",
			fill: "red"
		};
		
		
		texto = game.add.text(0, 20, "  QUIT", estilo);
		

		texto.inputEnabled = true;
		texto.input.useHandCursor = true;
		vencedor = "nenhum";
		texto.events.onInputDown.add(textoFoiClicado);
		
		teclaEspaco = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
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
		
		// Timer
		timer = game.time.create();
		timerEvent = timer.add(Phaser.Timer.SECOND * 30, endTimer, this);
		textoTimer = game.add.text(487, 40, "30", estilo2);
		textoTimer.visible = false;
		
		
		
		// countdown
		countdown = game.time.create();
		countdownEvent = countdown.add(Phaser.Timer.SECOND * 3.5, endContagem, this);
		textoCountDown = game.add.text(497, 40, "3", estilo3);
		countdown.start();

	//	birl = game.add.audio("birl", 0.2);
		dj = game.add.audio("dj", 0.2);

	
		 somComeco.stop();
		 
		 
		 
		 
		btnSom = game.add.sprite(10,690, "btnSom");	
		btnSom.inputEnabled = true;
		btnSom.input.useHandCursor = true;

		btnSom.animations.add("ligado", [0], 1, true);
		btnSom.animations.add("desligado", [1], 1, true);
		btnSom.events.onInputDown.add(mudarSom2);

		
		 	if(status2=="ligado"){
				batatadoce.play();
				
			}else{
				batatadoce.stop();
				
					btnSom.animations.play("desligado");
			}	
		 
	
		fadeIn();
	};
	
	this.update = function () {
	
		if(countdown.running){
			// texto
			textoCountDown.setText(Math.round((countdownEvent.delay - countdown.ms) / 1000 ));
			teclaEsq.enabled = false;
			teclaDir.enabled = false;
		}
		else{
		   
		}	
		
			
		if(timer.running){
			// texto
		
			teclaEsq.enabled = true;
			teclaDir.enabled = true;
			textoTimer.setText(Math.round((timerEvent.delay - timer.ms) / 1000 ));
			
		}
		else{

		}
			
		
	
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
				game.state.start("gameover");
				vencedor = "direita";
			}
		} else if (teclaDir.isDown == false) {
			teclaDirEstavaPressionada = false;
		}	
		
		/*if ((progressBarEsq.scale.x + progressBarDir.scale.x) > 1) {
			estaColidindo = true;
			if (progressBarEsq.scale.x > progressBarDir.scale.x) {
				progressBarDir.scale.x = 1 - progressBarEsq.scale.x;
			} else {
				progressBarEsq.scale.x = 1 - progressBarDir.scale.x;
			}
		} else {
			estaColidindo = false;
		}*/
				
		if (teclaDir.isDown) {
			bobEsponja.animations.play("cimaBob");
			
		} else {
				bobEsponja.animations.play("baixoBob");
			}			
		
		
	};

	
	function textoFoiClicado() {
	//	dj.play();
    	batatadoce.stop();
		game.state.start("menu");
		
	}
	function fadeOutAcabou() {
	
//		game.state.start("gameover");
		
	}

  function endTimer(){
	// Aqui vai oque acontence se o tempo acabar
	timer.stop();
	batatadoce.stop();
	game.state.start("perdeu");

	
	
  }
   function endContagem(){

	textoTimer.visible = true;
	textoCountDown.visible = false;
	timer.start();
	countdown.stop();
	
  }
  function comecaTimer(){
	timer.start();	
  }
  
	
}
	function mudarSom2 () {
			if(status2=="ligado"){
				// travar o som 
				btnSom.animations.play("desligado");
				status = "desligado";
				status2= "desligado";
				batatadoce.stop();
			}else{
				//liberar o som;
				btnSom.animations.play("ligado");
				status ="ligado";
				status2= "ligado";
				batatadoce.play();
			}	
	}		