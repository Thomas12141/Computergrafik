import { vec3 } from "gl-matrix";
import { gl, shaderProgram } from "../webgl2";
import { Quadrangle } from "./quadrangle";
import { SGNode } from "../2_scenegraph/sgnode";
import { Material } from "../4_material_light/material";

/**
 * Represents a cuboid in 3D space.
 */
export class Cuboid extends SGNode {
    private vertices: number[];
    private quadrangles: Quadrangle[];
    private vertexPosBuffer: WebGLBuffer;
    private vertexPosAttribute: number;

    constructor(private width: GLfloat, private height: GLfloat, private length: GLfloat,private material : Material){
        super();

        const v1 = vec3.create();
        vec3.set(v1, -0.5*width, 0.5*height, 0.5*length);

        const v2 = vec3.create();
        vec3.set(v2, -0.5*width, -0.5*height, 0.5*length);

        const v3 = vec3.create();
        vec3.set(v3, 0.5*width, -0.5*height, 0.5*length);

        const v4 = vec3.create();
        vec3.set(v4, 0.5*width, 0.5*height, 0.5*length);

        const v5 = vec3.create();
        vec3.set(v5, -0.5*width, 0.5*height, -0.5*length);

        const v6 = vec3.create();
        vec3.set(v6, -0.5*width, -0.5*height, -0.5*length);

        const v7 = vec3.create();
        vec3.set(v7, 0.5*width, -0.5*height, -0.5*length);

        const v8 = vec3.create();
        vec3.set(v8, 0.5*width, 0.5*height, -0.5*length);

        this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2],
            v4[0], v4[1], v4[2],
            v5[0], v5[1], v5[2],
            v6[0], v6[1], v6[2],
            v7[0], v7[1], v7[2],
            v8[0], v8[1], v8[2]
        ];
                // Normalen beachten; gegen den Uhrzeigersinn
                const front: Quadrangle = new Quadrangle(v1, v2, v3, v4,material);
                const back: Quadrangle = new Quadrangle(v8, v7, v6, v5,material);
                const top: Quadrangle = new Quadrangle(v5, v1, v4, v8,material);
                const bottom: Quadrangle = new Quadrangle(v2, v6, v7, v3,material);
                const left: Quadrangle = new Quadrangle(v5, v6, v2, v1,material);
                const right: Quadrangle = new Quadrangle(v4, v3, v7, v8,material);
        
                this.quadrangles = [
                    front,
                    back,
                    top,
                    bottom,
                    left,
                    right
                ];
        
              //  this.vertexPosAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
              //  gl.enableVertexAttribArray(this.vertexPosAttribute);
             //   this.initBuffers();

             this.material = new Material([0.25, 0.25, 0.25, 1.0], [0.2, 0.2, 0.2, 1.0], [0.54, 0.54, 0.54, 1.0], [0.66, 0.66, 0.66, 1.0], 32.0);

    }

 /*  private initBuffers() {
        this.vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }
    */

    /**
     * Draws the cuboid.
     */
    public draw() {
        this.quadrangles.forEach(quadrangle => {
            quadrangle.draw();
        });
    }
}
