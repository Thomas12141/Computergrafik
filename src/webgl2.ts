//import vertex from "./1_shaders/vertex.glsl";
//import fragment from "./1_shaders/fragment.glsl";
import phongVertexShader from "./4_phong_shader/phong_vertex.glsl";
import phongFragmentShader from "./4_phong_shader/phong_fragment.glsl";

/**
 * A singleton class that provides a WebGL2 context and shader program.
 * @class
 */
class WebGL2 {
    /**
     * The singleton instance of the WebGL2 class.
     * @private
     * @static
     */
    private static instance: WebGL2;
    /**
     * The HTML canvas element used for rendering.
     * @private
     */
    private canvas: HTMLCanvasElement;
    /**
     * The WebGL2 rendering context.
     * @private
     */
    private gl: WebGL2RenderingContext;
    /**
     * The compiled shader program.
     * @private
     */
    private shaderProgram: WebGLProgram;

    /**
     * Creates a new WebGL2 instance.
     * @private
     * @constructor
     * @param {string} canvasID - The ID of the HTML canvas element to use for rendering.
     */
    private constructor(canvasID: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasID);
        this.gl = this.canvas.getContext("webgl2");
        this.initShaders();

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST); // z-Buffer is enabled! otherwise it is drawn in the order of traversion
        this.gl.enable(this.gl.CULL_FACE); // culling is enabled => only objects which are visible are rendered

        console.log(this.gl.getParameter(this.gl.VERSION));
        console.log(this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION));
    }

    /**
     * Returns the singleton instance of the WebGL2 class.
     * @public
     * @static
     * @returns {WebGL2} The singleton instance of the WebGL2 class.
     */
    public static getInstance(): WebGL2 {
        if (!WebGL2.instance) {
            WebGL2.instance = new WebGL2("glCanvas");
        }

        return WebGL2.instance;
    }

    /**
     * Compiles a shader from source code.
     * @private
     * @param {string} sourceShader - The source code of the shader.
     * @param {number} type - The type of the shader (VERTEX_SHADER or FRAGMENT_SHADER).
     * @returns {WebGLShader} The compiled shader.
     * @throws {string} If the shader compilation fails, an error or warning message is thrown.
     */
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

    /**
     * Initializes the vertex and fragment shaders.
     * 
     * Vertex Shader und Fragment Shader werden hier eingebunden!
     * @private
     */
    private initShaders() {
        const vertexShader = this.createShader(phongVertexShader, this.gl.VERTEX_SHADER);
        const fragmentShader = this.createShader(phongFragmentShader, this.gl.FRAGMENT_SHADER);

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        this.gl.useProgram(this.shaderProgram);
    }

    /**
     * Returns the compiled shader program.
     * @public
     * @returns {WebGLProgram} The compiled shader program.
     */
    public getShaderProgram(): WebGLProgram {
        return this.shaderProgram;
    }

    /**
     * Returns the WebGL2 rendering context.
     * @public
     * @returns {WebGL2RenderingContext} The WebGL2 rendering context.
     */
    public getGL(): WebGL2RenderingContext {
        return this.gl;
    }
}

const webgl2 = WebGL2.getInstance();
export const shaderProgram = webgl2.getShaderProgram();
export const gl = webgl2.getGL();
