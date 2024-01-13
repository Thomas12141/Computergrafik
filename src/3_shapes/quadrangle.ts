import {vec2, vec3} from "gl-matrix";
import { gl, shaderProgram } from "../webgl2";
import { Triangle } from "./triangle";
import { Material } from "../4_material_light/material";

/**
 * Represents a quadrangle in 3D space.
 */
export class Quadrangle {
    private vertices: number[];
    private triangle1: Triangle;
    private triangle2: Triangle;
    private vertexPosBuffer: WebGLBuffer;
    private vertexPosAttribute: number;

    /**
     * Creates a new Quadrangle object.
     * @param v1 The first vertex of the quadrangle.
     * @param v2 The second vertex of the quadrangle.
     * @param v3 The third vertex of the quadrangle.
     * @param v4 The fourth vertex of the quadrangle.
     * @param textureps1
     * @param textureps2
     * @param textureps3
     * @param textureps4
     * @param material
     */
    constructor(private v1: vec3, private v2: vec3, private v3: vec3, private v4: vec3, private texturePos1 : vec2 , private texturePos2 : vec2
        , private texturePos3 : vec2, private texturePos4 : vec2 , private material : Material){
            this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2],
            v4[0], v4[1], v4[2]
        ];

        this.triangle1 = new Triangle(v1, v2, v3, texturePos1, texturePos2, texturePos3, material);
        this.triangle2 = new Triangle(v3, v4, v1,texturePos3, texturePos4, texturePos1, material);

     //   this.vertexPosAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
     //   gl.enableVertexAttribArray(this.vertexPosAttribute);
     //   this.initBuffers();
    }

    private initBuffers() {
        this.vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    /**
     * Draws the triangle.
     */
    public draw() {
        this.triangle1.draw();
        this.triangle2.draw();
    }
}
