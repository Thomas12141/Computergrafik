import {vec2, vec3} from "gl-matrix";
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

  //  private texture : Texture;

    /**
     * Creates a new Triangle object.
     * @param v1 The first vertex of the triangle.
     * @param v2 The second vertex of the triangle.
     * @param v3 The third vertex of the triangle.
     */
    constructor(private v1: vec3, private v2: vec3, private v3: vec3,  private texturepos1 : vec2 , private texturepos2 : vec2
        , private texturepos3 : vec2, private material : Material) {
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

        this.textureCoordinates = [
            texturepos1[0], texturepos1[1],
            texturepos2[0], texturepos2[1],
            texturepos3[0], texturepos3[1]
        ];

        this.triangleMaterial = material;
        this.vertexPosAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.vertexPosAttribute);

        this.normalPosAttribute = gl.getAttribLocation(shaderProgram,"aNormalPosition");
        gl.enableVertexAttribArray(this.normalPosAttribute);

        this.texturePosAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(this.texturePosAttribute);


        this.initBuffers();

      //  this.texture = new Texture("../assets/A5Textur1.png");
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

        //this.texture.draw();

        // Create a texture.
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255]));


        // Asynchronously load an image
        const image = new Image();
        image.src = "../assets/A5Textur1.png";
        image.addEventListener('load', function() {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);
        }); 
    }
}
