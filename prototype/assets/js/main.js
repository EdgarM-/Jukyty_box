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
	
	// Keyboard to note to frequency mapping
	var notes = {
		81:  262, // q C4
		50:  278, // 2 
		87:  294, // w 
		51:  311, // 3
		69:  330, // e
		82:  349, // r
		53:  370, // 5
		84:  392, // t
		54:  415, // 6
		89:  440, // y
		55:  466, // 7
		85:  494, // u E4
		73:  523, // i C5
		57:  554, // 9
		79:  587, // o
		48:  622, // 0
		80:  659, // p E5
		65:  104, // a G2#
		90:  110, // z
		83:  117, // s
		88:  124, // x E2
		67:  131, // c C3
		70:  139, // f
		86:  147, // v
		71:  156, // g
		66:  165, // b
		78:  175, // n
		74:  185, // j
		77:  196, // m
		75:  208, // k
		188: 220, // ,
		76:  233, // l
		190: 247  // . E3
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
				// Read the pressed key
				var key = event.which;
				if(notes[key]) {
					playing = true;
					
					oscillator.frequency.value = notes[key];
					gainNode.gain.value = 5;
					
					console.log('Sound playing ' + key);
				}
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
