(function (){
	var Synthesizer = (function (){
		var myAudioContext;
		var myCanvas;
		var playing;
		
		var Synthesizer = function(){
			myAudioContext = window.AudioContext;
			myCanvas = document.getElementById('main-synth');
			playing = false;
			
			setupEventListeners();			
		};
		
		var setupEventListeners = function () {
			document.addEventListener('keydown', playSound);
			document.addEventListener('keyup', stopSound);
		};
		
		var playSound = function (event){
			if (!playing) {
				playing = true;
				console.log('Sound playing');
			}	
		};
		
		var stopSound = function (event) {
			if (playing) {
				playing = false;
				console.log('Sound Stopped');
			}
		};
		
		return Synthesizer;
	})();
	
	new Synthesizer;
})();
