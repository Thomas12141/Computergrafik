import { vec3 } from "gl-matrix"
import { gl, shaderProgram } from "../webgl2";

export class Triangle {
    vertices: number[];
    vertexPosBuffer: WebGLBuffer;
    vertexPosAttribute: number;

    constructor(v1: vec3, v2: vec3, v3: vec3) {
        this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2]
        ];

        this.vertexPosAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.vertexPosAttribute);
        this.initBuffers();
    }

    initBuffers() {

        this.vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    }

    draw() {

        //bindBuffer() immer vor vertexAttribPointer() ausführen,
        //damit der gebundene Buffer in die zugehörige Shader Variable geladen wird!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
        gl.vertexAttribPointer(this.vertexPosAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

    }
}
