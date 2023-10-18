import vertex from "./1_shaders/vertex.glsl";
import fragment from "./1_shaders/fragment.glsl";

class WebGL2 {
    private static instance: WebGL2;
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private shaderProgram: WebGLProgram;

    private constructor(canvasID: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasID);
        this.gl = this.canvas.getContext("webgl2");
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

    private createShader(sourceShader: string, type: number): WebGLShader {
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

    private initShaders() {
        const vertexShader = this.createShader(vertex, this.gl.VERTEX_SHADER);
        const fragmentShader = this.createShader(fragment, this.gl.FRAGMENT_SHADER);

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        this.gl.useProgram(this.shaderProgram);
    }

    public getShaderProgram(): WebGLProgram {
        return this.shaderProgram;
    }

    public getGL(): WebGL2RenderingContext {
        return this.gl;
    }
}

const webgl2 = WebGL2.getInstance();
export const shaderProgram = webgl2.getShaderProgram();
export const gl = webgl2.getGL();
