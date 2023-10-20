import { Triangle } from "./triangle";
import { gl, shaderProgram } from "../webgl2";
import { mat4, vec3 } from "gl-matrix";

/**
 * Represents a scene to be rendered in WebGL.
 */
export class Scene {
    /** The uniform location of the projection matrix. */
    private readonly pMatrixUniform: WebGLUniformLocation;

    /** The uniform location of the model view matrix. */
    private readonly mvMatrixUniform: WebGLUniformLocation;

    /** The model view matrix. */
    private readonly modelViewMatrix: mat4;

    /** The projection matrix. */
    private readonly projectionMatrix: mat4;

    /** The triangle to be drawn in the scene. */
    private readonly triangle: Triangle;

    /**
     * Creates a new Scene object.
     */
    public constructor() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        this.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        this.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");

        this.modelViewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();

        // Zusammensetzen eines Dreieck
        const v1 = vec3.create();
        vec3.set(v1, -0.75, 0.75, 0.0);

        const v2 = vec3.create();
        vec3.set(v2, -0.75, -0.75, 0.0);

        const v3 = vec3.create();
        vec3.set(v3, 0.75, -0.75, 0.0);

        this.triangle = new Triangle(v1, v2, v3);
    }

    /**
     * Draws the scene.
     */
    public draw(): void {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.identity(this.modelViewMatrix);
        mat4.identity(this.projectionMatrix);

        gl.uniformMatrix4fv(this.pMatrixUniform, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.mvMatrixUniform, false, this.modelViewMatrix);

        this.triangle.draw();
    }
}
