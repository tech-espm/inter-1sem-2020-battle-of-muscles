
var telas = ["menu", "tela1","tela2", "gameover", "testeDeComandos", "perdeu", "modoJogo"];
var larguraJogo = 1000;
var alturaJogo = 750;
var statusSom = 0;
var batatadoce;
var somPato;
var somComeco;
var btnSom;

function carregarSom(telaDeJogo) {
 	game.load.spritesheet("btnSom", "btnSom.png", 50,56);
	game.load.audio("somPato", "cuak_01.mp3");
	if (telaDeJogo) {
		game.load.audio("somComeco", "batataDoce.mp3");
	} else {
		game.load.audio("somComeco", "comeco.mp3");
	}
}

function criarSom() {
	
	btnSom = game.add.sprite(10,690, "btnSom");
	btnSom.inputEnabled = true;
	btnSom.input.useHandCursor = true;
	
	btnSom.animations.add("ligado", [0], 1, true);
	btnSom.animations.add("desligado", [1], 1, true);
	btnSom.events.onInputDown.add(mudarSom);
	
	somComeco = game.add.audio("somComeco", 0.2);
	
	batatadoce = game.add.audio("batatadoce", 0.15);
	
	if(statusSom){
		somComeco.play();
	}else{
		somComeco.stop();
		btnSom.animations.play("desligado");
	}	
	
	somPato = game.add.audio("somPato", 0.2);
	
}

function mudarSom() {
	if(statusSom){
		// travar o som 
		btnSom.animations.play("desligado");
		statusSom = 0;
		somComeco.stop();
	}else{
		//liberar o som;
		btnSom.animations.play("ligado");
		statusSom = 1;
		somComeco.play();
	}
}

function menu() {
	
	var texto;
	var counter = 0;

	
	this.preload = function () {
		
		game.load.spritesheet("fundoCapa", "fundoCapa.png", 1000,750); 
     	game.load.spritesheet("botao", "botao2.png", 250,109);
     	carregarSom(false);
		
	};
	
	this.create = function () {
		
		game.add.tileSprite(0, 0, 1000, 750, "fundoCapa");
		botao = game.add.sprite(370,620, "botao");
		
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
		game.state.start("testeDeComandos");
	}
	
	
	
	

	
}
