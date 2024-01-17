import {mat4, vec2, vec3} from "gl-matrix";
import { gl, shaderProgram } from "../webgl2";
import { Material } from "../4_material_light/material";
import { Texture } from "../5_texture/texture";

/**
 * Represents a triangle in 3D space.
 */
export class Triangle {
    private vertices: number[];
    private vertexPosBuffer: WebGLBuffer;
    private vertexPosAttribute: number;

    private triangleMaterial : Material;

    private normal : number[];
    private normalPosBuffer: WebGLBuffer;
    private normalPosAttribute: number;

    private textureCoordinates: number[];
    private texturePosBuffer: WebGLBuffer;
    private texturePosAttribute: number;
  

    

    /**
     * Creates a new Triangle object.
     * @param v1 The first vertex of the triangle.
     * @param v2 The second vertex of the triangle.
     * @param v3 The third vertex of the triangle.
     */
    constructor(private v1: vec3, private v2: vec3, private v3: vec3, textureCoordinates : number[], 
         private material : Material) {
        this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2]
        ];

        const v12 = vec3.create();
        vec3.subtract(v12, v1, v2);
        const v32 = vec3.create();
        vec3.subtract(v32,v3,v2);
        const temp = vec3.create();
        vec3.cross(temp, v12, v32);

        this.normal = [
            temp[0],temp[1],temp[2],
            temp[0],temp[1],temp[2],
            temp[0],temp[1],temp[2]

        ];

        this.textureCoordinates = textureCoordinates;

        this.triangleMaterial = material;
        this.vertexPosAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.vertexPosAttribute);

        this.normalPosAttribute = gl.getAttribLocation(shaderProgram,"aNormalPosition");
        gl.enableVertexAttribArray(this.normalPosAttribute);

        this.texturePosAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(this.texturePosAttribute);


        this.initBuffers();

      
    }

    private initBuffers() {

        
        this.vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.normalPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal), gl.STATIC_DRAW);

        this.texturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), gl.STATIC_DRAW);
    }

    /**
     * Draws the triangle.
     */
    public draw() {
        this.triangleMaterial.draw();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
        gl.vertexAttribPointer(this.vertexPosAttribute, 3, gl.FLOAT, false, 0, 0);

        // Texturkoordinaten
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePosBuffer);
        gl.vertexAttribPointer(this.texturePosAttribute, 2, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPosBuffer);
        gl.vertexAttribPointer(this.normalPosAttribute, 3, gl.FLOAT, false, 0, 0);
        

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        //
}
}
