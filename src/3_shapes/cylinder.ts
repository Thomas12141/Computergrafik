import { SGNode } from "../2_scenegraph/sgnode";
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


    private readonly normals : number[] = [];

    private textureCoords: number[] = [];

    constructor(radius: number, height: number) {
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

       

        // Get and enable Attribute location
        const vertexAttributeLocation = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexAttributeLocation);
        gl.vertexAttribPointer(vertexAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        const textureCoordAttributeLocation = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(textureCoordAttributeLocation);
        gl.vertexAttribPointer(textureCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Unbind VAO
        gl.bindVertexArray(null);
        
    }

    initNormalBuffer() {
        const normalAttributeLocation = gl.getAttribLocation(shaderProgram, "aNormalPosition");
        
        // Create and bind a normal buffer
        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

        // Enable and specify the normal attribute for the vertices
        gl.enableVertexAttribArray(normalAttributeLocation);
      //  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); 
        gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
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
    }

    public draw() {
        gl.bindVertexArray(this.vao); // bind VAO

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.numFanVertices);
        gl.drawArrays(gl.TRIANGLE_FAN, this.numFanVertices, this.numFanVertices);
        gl.drawArrays(gl.TRIANGLE_STRIP, this.doubleFanVertices, this.numBodyVertices);
        
        gl.bindVertexArray(null); // unbind VAO
    }
}