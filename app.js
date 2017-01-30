
 		var isImage = false
 		var modelImage = new Image();
 		modelImage.onload = function () {

 		}
 		modelImage.src ="model0.jpg"
        function selectmask(source) {
            console.log(source);
            MaskImage.src = "wigs/"+source + ".png";
        }

        function onFailure(err) {
            alert("The following error occured: " + err.name);
        }

        jQuery(document).ready(function () {

            var video = document.querySelector('#webcam');
            var button = document.querySelector('#screenshot-button');
            var canvas = document.querySelector('#screenshot-canvas');
            var ctx = canvas.getContext('2d');
 		if(!isImage){
	            navigator.getUserMedia = (navigator.getUserMedia ||
	                            navigator.webkitGetUserMedia ||
	                            navigator.mozGetUserMedia ||
	                            navigator.msGetUserMedia);
	            if (navigator.getUserMedia) {
	                navigator.getUserMedia
	                            (
	                              { video: true },
	                              function (localMediaStream) {
	                                  video.src = window.URL.createObjectURL(localMediaStream);
	                              }, onFailure);
	            }
	            else {
	                onFailure();
	            }
 			}else{

            }
            //button.addEventListener('click', snapshot, false);
            var previousPosition;
            setInterval(snapshot, 1000);
            function snapshot() {
            	if(!isImage){
	                canvas.width = video.videoWidth;
	                canvas.height = video.videoHeight;
	                ctx.drawImage(video, 0, 0);
            	}else{
            		canvas.width = 300
            		canvas.height = 400
					ctx.drawImage(modelImage,0,0,modelImage.width,modelImage.height,0,0,canvas.width,canvas.height)
            	}
                var position = ccv.detect_objects({ "canvas": canvas,
                    "cascade": cascade,
                    "interval": 2,
                    "min_neighbors": 1
                });

            	//if(position[0].confidence<4){
            	//	position = previousPosition
            	//}

                for (var i = 0; i < position.length; i++) {
                	console.log(position,imgHairStyle[0])

                    ctx.drawImage(imgHairStyle[0],
                    		position[i].x - 40,
                    		position[i].y - 110,
                    		position[i].width+ 100,
                    		position[i].height+285);
                }
                previousPosition = position
            }
        });
