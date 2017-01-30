// please scroll all the way down to set your image
var imgHairStyle;
var removeBlanks = function (canvas,imgWidth, imgHeight) {
	context = canvas.getContext("2d");
    var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
        data = imageData.data,
        getRBG = function(x, y) {
            var offset = imgWidth * y + x;
            return {
                red:     data[offset * 4],
                green:   data[offset * 4 + 1],
                blue:    data[offset * 4 + 2],
                opacity: data[offset * 4 + 3]
            };
        },
        isWhite = function (rgb) {
            // many images contain noise, as the white is not a pure #fff white
            return rgb.opacity==0 || (rgb.red > 200 && rgb.green > 200 && rgb.blue > 200);
        },
        scanY = function (fromTop) {
            var offset = fromTop ? 1 : -1;
            
            // loop through each row
            for(var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
                
                // loop through each column
                for(var x = 0; x < imgWidth; x++) {
                    var rgb = getRBG(x, y);
                    if (!isWhite(rgb)) {
                        return y;                        
                    }      
                }
            }
            return null; // all image is white
        },
        scanX = function (fromLeft) {
            var offset = fromLeft? 1 : -1;
            
            // loop through each column
            for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
                
                // loop through each row
                for(var y = 0; y < imgHeight; y++) {
                    var rgb = getRBG(x, y);
                    if (!isWhite(rgb)) {
                        return x;                        
                    }      
                }
            }
            return null; // all image is white
        };
    
    var cropTop = scanY(true),
        cropBottom = scanY(false),
        cropLeft = scanX(true),
        cropRight = scanX(false),
        cropWidth = cropRight - cropLeft,
        cropHeight = cropBottom - cropTop;
    
    var $croppedCanvas = $("<canvas>").attr({ width: cropWidth, height: cropHeight });
    
    // finally crop the guy
    $croppedCanvas[0].getContext("2d").drawImage(canvas,
        cropLeft, cropTop, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight);
    console.log(cropTop, cropBottom, cropLeft, cropRight);

    return $croppedCanvas
    //$("body").
    //    append("<p>same image with white spaces cropped:</p>").
    //    append($croppedCanvas);
};
var MaskImage = new Image();
MaskImage.crossOrigin = "anonymous";
MaskImage.onload = function () {
	var $canvas = $("<canvas>"),
    canvas = $canvas[0],
	context;
    $canvas.attr({ width: this.width, height: this.height });
    if ($canvas) {
    	context = canvas.getContext("2d");
        context.drawImage(this, 0, 0);
      //  $("body").append("<p>original image:</p>").append($canvas);
    
        imgHairStyle = removeBlanks(canvas,this.width, this.height);
    } else {
        alert('Get a real browser!');
    }
};

