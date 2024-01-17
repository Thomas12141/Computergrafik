import { Component } from "../2_scenegraph/component";
import { SGNode } from "../2_scenegraph/sgnode";
import { Material } from "../4_material_light/material";
import { Texture } from "../5_texture/texture";
import { gl, shaderProgram } from "../webgl2";

/**
 *  Cylinder class with VAO (new WebGL2 feature).
 *  Cylinder base is drawn on xy-Plane.
 *  Cylinder "grows" towards z-dimension.
 **/ 

export class Cylinder extends SGNode {

    private readonly slices: number = 100;
    private readonly vertices: number[] = [];
    private readonly numBodyVertices: number = this.slices * 2;
    private readonly numFanVertices = this.slices + 1;
    private readonly doubleFanVertices = 2 * this.numFanVertices;
    private vao: WebGLVertexArrayObject; // vertex array object
    private vbo: WebGLBuffer; // vertex buffer object

    private circleMaterial : Material;

    private readonly normals : number[] = [];
    private normalBuffer: WebGLBuffer;
    

    private textureCoords: number[] = [];
    private texturePosBuffer: WebGLBuffer;
    private texturePosAttribute: number;

    constructor(radius: number, height: number,private material :Material) {
        super();

        const halfheight = height / 2;
        
        // Create vertices
        // Top
        this.computeFanVertices(radius, halfheight);

        // Bottom
        this.computeFanVertices(radius, -halfheight, false);

        // Body
        this.computeBodyVertices(radius, halfheight);

        // Initialize array and buffer objects
        this.initVAO();
        this.initVBO();
       
        this.circleMaterial = material;

        // Unbind VAO
        gl.bindVertexArray(null);

        
    }

   

    private computeFanVertices(radius: number, z: number, ccw = true) {
        // Draw cylinder bottom and top with TRIANGLE_FAN         
        //    3  2  1 
        //    *  *  *
        //   / \ | / \
        //4 * - 0* - * 8    
        //   \ / | \ /
        //    *  *  *
        //    5  6  7

        let sign = 1;
        if (!ccw) // Draw counter-clock-wise?
            sign = -1;

        this.normals.push(0, 0, sign);
        this.vertices.push(0, 0, z); // Center
        for (let j = 0; j < this.slices; j++) {
            const phi = j * 2 * Math.PI / (this.slices - 1);
            const x = radius * Math.cos(sign * phi);
            const y = radius * Math.sin(sign * phi);
            this.vertices.push(x, y, z);
            this.normals.push(0,0,sign);
        }
        const quarterSlices = this.slices / 4;
        const quarterA = Math.PI / 2;

        for(let i = 0; i < quarterSlices; i++)
        {
            const phi = i*Math.PI/2 / (quarterSlices -1);
            this.textureCoords.push(phi,quarterA);
        }

        for(let i = quarterSlices; i > 0; i--)
        {
            const phi = i*Math.PI/2 / (quarterSlices -1);
            this.textureCoords.push(quarterA,phi);
        }

        for(let i = quarterSlices; i > 0; i--)
        {
            const phi = i*Math.PI/2 / (quarterSlices -1);
            this.textureCoords.push(phi,0);
        }

        for(let i = 0; i < quarterSlices; i++)
        {
            const phi = i*Math.PI/2 / (quarterSlices -1);
            this.textureCoords.push(0,phi);
        }
    }

    private computeBodyVertices(radius: number, hh: number) {
        // Draw cylinder body with TRIANGLE_STRIP 
        //      0       2       4    
        //  ... * ----- * ----- * ...
        //      |    /  |    /  |         
        //      |   /   |   /   |
        //  ... * ----- * ----- * ... 
        //      1       3       5

        for (let j = 0; j < this.slices; j++) {
            const phi = j * 2 * Math.PI / (this.slices - 1);
            const x = radius * Math.cos(phi);
            const y = radius * Math.sin(phi);
            this.vertices.push(x, y, hh);
            this.vertices.push(x, y, -hh);
            this.normals.push(x,y,0);
            this.normals.push(x,y,0);
            this.textureCoords.push(phi,0);
            this.textureCoords.push(phi,1);
        }
    
    }

    private initVAO() {
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
    }

    private initVBO() {
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        
        const vertexAttributeLocation = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexAttributeLocation);
        gl.vertexAttribPointer(vertexAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        const normalAttributeLocation = gl.getAttribLocation(shaderProgram, "aNormalPosition");
        gl.enableVertexAttribArray(normalAttributeLocation);
        gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        
        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

        const textureCoordAttributeLocation = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(textureCoordAttributeLocation);
        gl.vertexAttribPointer(textureCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        this.texturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), gl.STATIC_DRAW);
    }

    public draw() {
        this.material.draw();
        gl.bindVertexArray(this.vao); // bind VAO


        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.numFanVertices);
        gl.drawArrays(gl.TRIANGLE_FAN, this.numFanVertices, this.numFanVertices);
        gl.drawArrays(gl.TRIANGLE_STRIP, this.doubleFanVertices, this.numBodyVertices);
       
        
        gl.bindVertexArray(null); // unbind VAO
    }
}