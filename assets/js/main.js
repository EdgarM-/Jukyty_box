(function () {
	// Utility function (from jQuery implementation)
	var each = function (obj, callback){
		var value,
			i = 0,
			length = obj.length;
		for (; i < length; ++i) {
			value = callback.call(obj[i], i, obj[i]);
			if (value === false) {
				break;
			}
		}
	};

	var Synthesizer = (function () {
		/*
		 * Main variables 
		 */
		
		var MyAudioContext;
		// Use audioCtx for cross browser compatibility
		var audioCtx;
		var myCanvas;
		var playing;
		
		// Synth AudioNodes
		var oscillators = []; // Experimental
		var oscillator;
		var gainNode;
		var soundOut;
		
		/*
		 * Main methods
		 */
		
		// Constructor
		var Synthesizer = function () {
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
			each("osc1 osc2".split(" "), function (num, name) {
				// Populate the oscillator
				oscillators[num] = {
						name: name,
						audioNode: audioCtx.createOscillator(),
						gainNode: audioCtx.createGain()
				};
				// Setup the defaults for the oscillator
				oscillators[num].gainNode.gain.value = 0;
				// Connect the basic components of the oscillator
				oscillators[num].audioNode.connect(oscillators[num].gainNode);
				// Start the oscillator
				//oscillators[num].audioNode.start();
			});

			oscillator = audioCtx.createOscillator();
			oscillator.type = 'triangle';
			
			console.log(oscillators);

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
		
		var playSound = function (event) {
			if (!playing) {
				playing = true;
				// Read the pressed key
				var key = event.which;
				
				oscillator.frequency.value = key * 3;
				gainNode.gain.value = 5;
				
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
		
		/* 
		 * Utility methods
		 */

		return Synthesizer;
	})();
	
	// Instanciate a Synthesizer
	new Synthesizer;
})();
