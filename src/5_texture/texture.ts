import { gl, shaderProgram } from "../webgl2";
//Beispiel Laden von jpg
//import myImage from '../../assets/earth.jpg'
//let texture = new Texture(myImage)

export class Texture {
	public texture: WebGLTexture;
	public image: HTMLImageElement;

    constructor(src: string) {
       
        this.texture = gl.createTexture();

        this.image = new Image();
        this.image.src = src;
        this.image.onload =  () => {
            Texture.loadTexture(this.image, this.texture);
            console.log("Texture " + src + " loaded.");
        };
        this.image.onerror =  () => {
            console.warn("Could not load texture: " + src);
        };
    }

    private static loadTexture(image:TexImageSource, texture:WebGLTexture) {
       
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        //Erlaube alle Größen von Texturen
        //(idealerweise haben Texturen die Seitengröße x^2)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    draw(): void {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
    }
}


