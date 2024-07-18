import { vec3 } from "gl-matrix";
import { gl, shaderProgram } from "../webgl2";
import { Triangle } from "./triangle";
import { SGNode } from "../2_scenegraph/sgnode";
import { Material } from "../4_material_light/material";

/**
 * Represents a quadrangle in 3D space.
 */
export class Circle extends SGNode {
    private amountVertices = 100;
    private vertices: number[];
    private triangles: Triangle[];

    private vertexPosBuffer: WebGLBuffer;
    private vertexPosAttribute: number;

    /**
     * Creates a new Circle object.
     */
    constructor(private radius: number) {
        super();

        this.vertices = [];
        this.triangles = [];

        // drei erste Vertices

        const angle = (2*Math.PI)/this.amountVertices;

        // erste Koordinate ist der Nullpunkt
        const v1 = vec3.create();
        vec3.set(v1, 0.0, 0.0, 0.0);
        const v2 = vec3.create();
        // vec3.set(v2, radius*Math.cos(0*angle), radius*Math.sin(0*angle), this.zValue);
        const v3 = vec3.create();

        // Polarkoordinaten        
        for (let vertex = 0; vertex < this.amountVertices; vertex++) {
            vec3.set(v2, radius*Math.cos(vertex*angle), radius*Math.sin(vertex*angle), 0.0);
            vec3.set(v3, radius*Math.cos((vertex+1)*angle), radius*Math.sin((vertex+1)*angle), 0.0);

         //   const triangle = new Triangle(v1, v2, v3,new Material([0.25, 0.25, 0.25, 1.0], [0.2, 0.2, 0.2, 1.0], [0.54, 0.54, 0.54, 1.0], [0.66, 0.66, 0.66, 1.0], 32.0));
          //  this.triangles.push(triangle);
        }

        this.vertexPosAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.vertexPosAttribute);
        this.initBuffers();
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
        for (const triangle of this.triangles) {
            triangle.draw();
        }
    }
}
