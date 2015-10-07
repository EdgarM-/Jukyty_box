(function (){
	var Synthesizer = (function (){
		/*
		 * Main variables 
		 */
		
		var MyAudioContext;
		// Use audioCtx for cross browser compatibility
		var audioCtx;
		var myCanvas;
		var playing;
		
		// Synth AudioNodes
		var oscillator;
		var gainNode;
		var soundOut;
		
		/*
		 * Main methods
		 */
		
		// Constructor
		var Synthesizer = function(){
			// Initializing main variables and Web Audio context
			MyAudioContext = window.AudioContext || window.webkitAudioContext;
			audioCtx = new MyAudioContext();
			myCanvas = document.getElementById('main-synth');
			// Prevents sound overlap at press.
			playing = false;
			
			setupAudioNodes();
			 
			setupEventListeners();		
		};
		
		var setupAudioNodes = function () {
			// Oscillator setup
			oscillator = audioCtx.createOscillator();
			oscillator.type = 'sine';
			
			// Gain setup
			gainNode = audioCtx.createGain();
			gainNode.gain.value = 0;
			
			// Destination init
			soundOut = audioCtx.destination;
			
			// Routing
			gainNode.connect(soundOut);
			oscillator.connect(gainNode);
			
			oscillator.start();
		};
		
		var setupEventListeners = function () {
			document.addEventListener('keydown', playSound);
			document.addEventListener('keyup', stopSound);
		};
		
		var playSound = function (event){
			if (!playing) {
				playing = true;
				// Read the pressed key
				var key = event.which;
				
				oscillator.frequency.value = key * 2;
				gainNode.gain.value = 1;
				
				console.log('Sound playing');
			}	
		};
		
		var stopSound = function (event) {
			if (playing) {
				playing = false;
				
				gainNode.gain.value = 0;
				
				console.log('Sound Stopped');
			}
		};
		
		return Synthesizer;
	})();
	
	// Instanciate a Synthesizer
	new Synthesizer;
})();
