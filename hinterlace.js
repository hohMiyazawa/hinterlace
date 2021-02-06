const inputElementEncode = document.getElementById("infile");

let contextData;
let isSolid;
let isGreyscale;
let canvas = document.getElementById("preview");
let ctx = canvas.getContext("2d");
let canvas_gif = document.getElementById("preview_gif");
let ctx_gif = canvas_gif.getContext("2d");
let canvas_scan = document.getElementById("preview_scan");
let ctx_scan = canvas_scan.getContext("2d");
let img;

let flif_interlace = function(pixels){
	let transformed = [];
	for(let i=0;i<contextData.length;i+=4){
		let R = contextData[i];
		let G = contextData[i + 1];
		let B = contextData[i + 2];
		let Y = (((R + B)>>1) + G)>>1;
		let Co = R - B;
		let Cg = G - ((R + B)>>1);
		transformed[i+0] = Y;
		transformed[i+1] = Co;
		transformed[i+2] = Cb;
		transformed[i+3] = contextData[i+3];
	}
	let scale = 1;
	while(scale < width || scale < height){
		scale *= 2;
	}

	let newData = new Array(contextData.length).fill(0);

}

let drawInterlace = function(){
	let pixelPercentage = parseFloat(document.getElementById("pixelRange").value);
	document.getElementById("val").value = pixelPercentage;

	let newData = new Array(contextData.length).fill(0);
	let pixels = Math.round((pixelPercentage/100) * (contextData.length/4));


	for(let row = 0;row < img.height && pixels;row += 8){
		for(let pos = 0;pos < img.width && pixels;pos += 8){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 8 && row + off_y < img.height;off_y++){
				for(let off_x = 0;off_x < 8 && pos + off_x < img.width;off_x++){
					let rel = ((row + off_y) * img.width + pos + off_x)*4;
					newData[rel] = contextData[anch];
					newData[rel+1] = contextData[anch+1];
					newData[rel+2] = contextData[anch+2];
					newData[rel+3] = contextData[anch+3];
				}
			}
			pixels--;
		}
	}

	for(let row = 0;row < img.height && pixels;row += 8){
		for(let pos = 4;pos < img.width && pixels;pos += 8){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 8 && row + off_y < img.height;off_y++){
				for(let off_x = 0;off_x < 4 && pos + off_x < img.width;off_x++){
					let rel = ((row + off_y) * img.width + pos + off_x)*4;
					newData[rel] = contextData[anch];
					newData[rel+1] = contextData[anch+1];
					newData[rel+2] = contextData[anch+2];
					newData[rel+3] = contextData[anch+3];
				}
			}
			pixels--;
		}
	}

	for(let row = 4;row < img.height && pixels;row += 8){
		for(let pos = 0;pos < img.width && pixels;pos += 4){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 4 && row + off_y < img.height;off_y++){
				for(let off_x = 0;off_x < 4 && pos + off_x < img.width;off_x++){
					let rel = ((row + off_y) * img.width + pos + off_x)*4;
					newData[rel] = contextData[anch];
					newData[rel+1] = contextData[anch+1];
					newData[rel+2] = contextData[anch+2];
					newData[rel+3] = contextData[anch+3];
				}
			}
			pixels--;
		}
	}

	for(let row = 0;row < img.height && pixels;row += 4){
		for(let pos = 2;pos < img.width && pixels;pos += 4){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 4 && row + off_y < img.height;off_y++){
				for(let off_x = 0;off_x < 2 && pos + off_x < img.width;off_x++){
					let rel = ((row + off_y) * img.width + pos + off_x)*4;
					newData[rel] = contextData[anch];
					newData[rel+1] = contextData[anch+1];
					newData[rel+2] = contextData[anch+2];
					newData[rel+3] = contextData[anch+3];
				}
			}
			pixels--;
		}
	}

	for(let row = 2;row < img.height && pixels;row += 4){
		for(let pos = 0;pos < img.width && pixels;pos += 2){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 2 && row + off_y < img.height;off_y++){
				for(let off_x = 0;off_x < 2 && pos + off_x < img.width;off_x++){
					let rel = ((row + off_y) * img.width + pos + off_x)*4;
					newData[rel] = contextData[anch];
					newData[rel+1] = contextData[anch+1];
					newData[rel+2] = contextData[anch+2];
					newData[rel+3] = contextData[anch+3];
				}
			}
			pixels--;
		}
	}

	for(let row = 0;row < img.height && pixels;row += 2){
		for(let pos = 1;pos < img.width && pixels;pos += 2){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 2 && row + off_y < img.height;off_y++){
				for(let off_x = 0;off_x < 1 && pos + off_x < img.width;off_x++){
					let rel = ((row + off_y) * img.width + pos + off_x)*4;
					newData[rel] = contextData[anch];
					newData[rel+1] = contextData[anch+1];
					newData[rel+2] = contextData[anch+2];
					newData[rel+3] = contextData[anch+3];
				}
			}
			pixels--;
		}
	}

	for(let row = 1;row < img.height && pixels;row += 2){
		for(let pos = 0;pos < img.width && pixels;pos += 1){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 1 && row + off_y < img.height;off_y++){
				for(let off_x = 0;off_x < 1 && pos + off_x < img.width;off_x++){
					let rel = ((row + off_y) * img.width + pos + off_x)*4;
					newData[rel] = contextData[anch];
					newData[rel+1] = contextData[anch+1];
					newData[rel+2] = contextData[anch+2];
					newData[rel+3] = contextData[anch+3];
				}
			}
			pixels--;
		}
	}

	canvas.width = img.width;
	canvas.height = img.height;

	let image = new ImageData(new Uint8ClampedArray(newData),img.width);
	ctx.putImageData(image,0,0);

	pixels = Math.round((pixelPercentage/100) * (contextData.length/4));

	let newData_gif = new Array(contextData.length).fill(0);

	for(let row = 0;row < img.height && pixels;row += 8){
		for(let pos = 0;pos < img.width && pixels;pos++){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 8 && row + off_y < img.height;off_y++){
				let rel = ((row + off_y) * img.width + pos)*4;
				newData_gif[rel] = contextData[anch];
				newData_gif[rel+1] = contextData[anch+1];
				newData_gif[rel+2] = contextData[anch+2];
				newData_gif[rel+3] = contextData[anch+3];
			}
			pixels--;
		}
	}

	for(let row = 4;row < img.height && pixels;row += 8){
		for(let pos = 0;pos < img.width && pixels;pos++){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 4 && row + off_y < img.height;off_y++){
				let rel = ((row + off_y) * img.width + pos)*4;
				newData_gif[rel] = contextData[anch];
				newData_gif[rel+1] = contextData[anch+1];
				newData_gif[rel+2] = contextData[anch+2];
				newData_gif[rel+3] = contextData[anch+3];
			}
			pixels--;
		}
	}

	for(let row = 2;row < img.height && pixels;row += 4){
		for(let pos = 0;pos < img.width && pixels;pos++){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 2 && row + off_y < img.height;off_y++){
				let rel = ((row + off_y) * img.width + pos)*4;
				newData_gif[rel] = contextData[anch];
				newData_gif[rel+1] = contextData[anch+1];
				newData_gif[rel+2] = contextData[anch+2];
				newData_gif[rel+3] = contextData[anch+3];
			}
			pixels--;
		}
	}

	for(let row = 1;row < img.height && pixels;row += 2){
		for(let pos = 0;pos < img.width && pixels;pos++){
			let anch = (row * img.width + pos)*4;
			for(let off_y = 0;off_y < 1 && row + off_y < img.height;off_y++){
				let rel = ((row + off_y) * img.width + pos)*4;
				newData_gif[rel] = contextData[anch];
				newData_gif[rel+1] = contextData[anch+1];
				newData_gif[rel+2] = contextData[anch+2];
				newData_gif[rel+3] = contextData[anch+3];
			}
			pixels--;
		}
	}

	canvas_gif.width = img.width;
	canvas_gif.height = img.height;

	let image_gif = new ImageData(new Uint8ClampedArray(newData_gif),img.width);
	ctx_gif.putImageData(image_gif,0,0);

	pixels = Math.round((pixelPercentage/100) * (contextData.length/4));

	let newData_scan = Array.from(contextData).slice(0,pixels*4).concat(new Array(contextData.length - pixels*4).fill(0));

	canvas_scan.width = img.width;
	canvas_scan.height = img.height;

	let image_scan = new ImageData(new Uint8ClampedArray(newData_scan),img.width);
	ctx_scan.putImageData(image_scan,0,0);

	flif_interlace(pixels);
}

let html_encode = function(){
	if(inputElementEncode.files && inputElementEncode.files[0]){
		let fileName = inputElementEncode.files[0].name;
		let FR = new FileReader();
		FR.onload = function(e){
			img = new Image();
			let canvas = document.getElementById("original");
			let ctx = canvas.getContext("2d");
			img.addEventListener("load", function(){
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				contextData = ctx.getImageData(0,0,img.width,img.height).data;
				isSolid = true;
				for(let i=3;i<contextData.length;i+=4){
					if(contextData[i] !== 255){
						isSolid = false;
						break;
					}
				}
				isGreyscale = true;
				for(let i=0;i<contextData.length;i+=4){
					if((contextData[i] !== contextData[i+1]) || (contextData[i] !== contextData[i+2])){
						isGreyscale = false;
						break;
					}
				}
				drawInterlace();
			});
			img.src = e.target.result;
		};       
		FR.readAsDataURL(inputElementEncode.files[0]);
	}
}
inputElementEncode.addEventListener("change",html_encode,false);
document.getElementById("load").addEventListener("click",html_encode,false);
document.getElementById("pixelRange").addEventListener("change",drawInterlace,false);

document.getElementById("animate").addEventListener("click",function(){
	let partial = function(num){
		document.getElementById("pixelRange").value = num;
		drawInterlace();
		num += 0.5;
		if(num <= 100){
			setTimeout(function(){partial(num)},200);
		}
	}
	partial(0);
},false);

let setval = function(num){
	document.getElementById("pixelRange").value = num;
	drawInterlace();
}

document.getElementById("val").addEventListener("change",function(){setval(parseFloat(document.getElementById("val").value))},false);
