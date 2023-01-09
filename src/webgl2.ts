import vertex from './shaders/vertex.glsl';
import fragment from "./shaders/fragment.glsl";

class WebGL2 {
    
    gl:WebGL2RenderingContext;
    shaderProgram: WebGLProgram;

    private canvas: HTMLCanvasElement;
    private static instance: WebGL2;

    private constructor(canvasID: string) {
        
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasID);
        this.gl = this.canvas.getContext('webgl2');
        this.initShaders();

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
 
        console.log(this.gl.getParameter(this.gl.VERSION));
        console.log(this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION));
        
    }

    public static getInstance(): WebGL2 {
        if (!WebGL2.instance) {
            WebGL2.instance = new WebGL2("glCanvas");
        }

        return WebGL2.instance;
    }

    createShaders(sourceShader: string, type: number) {

        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, sourceShader);
        this.gl.compileShader(shader);
        const message = this.gl.getShaderInfoLog(shader);

        if (message.length > 0) {
            /* message may be an error or a warning */
            throw message;
        }

        return shader;
    }

    initShaders() {

        const vertexShader = this.createShaders(vertex, this.gl.VERTEX_SHADER);
        const fragmentShader = this.createShaders(fragment, this.gl.FRAGMENT_SHADER);

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        this.gl.useProgram(this.shaderProgram);

    }
}

export const shaderProgram = WebGL2.getInstance().shaderProgram;
export const gl = WebGL2.getInstance().gl;
