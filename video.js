var World = {
	loaded: false,

	init: function initFn() {
		AR.context.services.sensors = false;
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		// Initialize Tracker
		this.tracker = new AR.Tracker("assets/breakingbad.wtc", {
			onLoaded: this.worldLoaded
		});

		var video = new AR.VideoDrawable("assets/video.mp4", 0.50, {
			offsetY: 0.1,
			onLoaded: function videoLoaded() {
        //playButton.enabled = true;
        video.goutout = false;
	    },
	    onPlaybackStarted: function videoPlaying () {
	        //playButton.enabled = false;
	        //video.enabled = true;
	        video.playing = true;
	    },
	    onFinishedPlaying: function videoFinished () {
	        //playButton.enabled = true;
	        video.playing = false;
	        //video.enabled = false;
	    },
	    onClick: function videoClicked () {
	        if (video.playing) {
	            video.pause();
	            video.playing = false;
	            //playButton.enabled = true;
	        } else {
	            video.resume();
	            video.playing = true;
	            //playButton.enabled = true;
	        }
	    }
		});

		var pageOne = new AR.Trackable2DObject(this.tracker, "*", {
			drawables: {
				cam: [video]
			},
			onEnterFieldOfVision: function onEnterFieldOfVisionFn() {	
				if (video.goutout){
					video.resume();
				}
				else{
					video.play(-1);
				}
			},
			onExitFieldOfVision: function onExitFieldOfVisionFn () {
        video.pause();
        video.goutout = true;
    	}
		});
	},

	worldLoaded: function worldLoadedFn() {
		
	}
};

World.init();