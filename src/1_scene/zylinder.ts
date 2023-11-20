import { vec3,mat4 } from "gl-matrix";
import {gl,shaderProgram} from "../webgl2";

export class Cylinder {

    private vertices : Float32Array;
    private vertexPosBuffer : WebGLBuffer;
    private vertexPosAttribute : number;

    private readonly baseCenter : vec3;
    private readonly radius : number;
    private readonly height :number;
    private readonly numSegments : number;

    private readonly pMatrixUniform : WebGLUniformLocation;
    private readonly mvMatrixUniform : WebGLUniformLocation;


constructor(baseCenter: vec3, radius : number , height : number, numSegments : number)
{
 
    this.baseCenter = baseCenter;
    this.radius = radius;
    this.height = height;
    this.numSegments = numSegments;

    this.vertices =this.generateCylinderVertices();
    this.vertexPosAttribute = gl.getAttribLocation(shaderProgram,"aVertexPosition");
    gl.enableVertexAttribArray(this.vertexPosAttribute);
    this.initBuffers();

    this.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
    this.mvMatrixUniform = gl.getUniformLocation(shaderProgram,"uModelViewMatrix");

}

private generateCylinderVertices(): Float32Array
{
    const vertices = [];
    const normals = [];
    const angleIncrement = (2* Math.PI) / this.numSegments;

    for (let i = 0; i <= this.numSegments; i++) {
        const angle = i * angleIncrement;

        // Calculate the position of a point on the circumference
        const x = this.baseCenter[0] + this.radius * Math.cos(angle);
        const y = this.baseCenter[1] + this.radius * Math.sin(angle);
        
        const zTop = this.baseCenter[2] + this.height /2;
        const zBottom = this.baseCenter[2] - this.height/2;

        // Add the point to the vertices array
        vertices.push(x, y, zTop);
        vertices.push(x,y,zBottom);

        // Normals for the top and bottom
    const normalTop = [0, 0, 1];
    const normalBottom = [0, 0, -1];

    normals.push(...normalTop);
    normals.push(...normalBottom);
    }

    // Add the top and bottom vertices
  for (let i = 0; i <= this.numSegments; i++) {
    const angle = i * angleIncrement;
    const x = this.baseCenter[0] + this.radius * Math.cos(angle);
    const y = this.baseCenter[1] + this.radius * Math.sin(angle);

    // Add the point to the vertices array for the top and bottom bases
    vertices.push(x, y, 0);
    vertices.push(x, y, 0);

    // Normals for the top and bottom
    const normalTop = [0, 0, 1];
    const normalBottom = [0, 0, -1];

    // Add normals for the top and bottom
    normals.push(...normalTop);
    normals.push(...normalBottom);
  }
    return  new Float32Array([...vertices, ...normals]);
}

private initBuffers()
{
    this.vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertices),gl.STATIC_DRAW);
}



public draw(modelViewMatrix:mat4, projectionMatrix:mat4) : void
{
    gl.uniformMatrix4fv(this.pMatrixUniform,false, projectionMatrix);
    gl.uniformMatrix4fv(this.mvMatrixUniform,false,modelViewMatrix);
 

    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexPosBuffer);
   

    
    gl.vertexAttribPointer(this.vertexPosAttribute,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(this.vertexPosAttribute);

    gl.drawArrays(gl.TRIANGLE_STRIP,0,this.numSegments*3);
    
    // Draw the cylinder without bases
  gl.drawArrays(gl.TRIANGLE_FAN, (this.numSegments ) * 2 , this.vertices.length+1);

  
   
   


}

}