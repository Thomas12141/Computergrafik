import { mat4, vec4 } from "gl-matrix";
import { gl, shaderProgram } from "../webgl2";
import { SGNode } from "../2_scenegraph/sgnode";
import { Component } from "../2_scenegraph/component";

export class Light extends SGNode {
    position: vec4;
    worldposition: vec4;
    ambient: vec4;
    diffuse: vec4;
    specular: vec4;
    isDirectionalLight: boolean;
    lightPosition:WebGLUniformLocation;
    lightAmbient:WebGLUniformLocation;
    lightDiffuse:WebGLUniformLocation;
    lightSpecular:WebGLUniformLocation;


    constructor(position:vec4, ambient:vec4, diffuse:vec4, specular:vec4) {
        super();
        this.position = vec4.set(vec4.create(), position[0], position[1], position[2], position[3]);
        this.worldposition = vec4.clone(this.position);
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.isDirectionalLight = this.position[3] == 0;
        
        if (this.isDirectionalLight) {
            this.position[3] = 1;
        }


        this.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
        this.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
        this.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
        this.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    }

    updatePosition(mvMatrix: mat4) {

        mat4.mul(this.worldposition as mat4, mvMatrix, this.position as mat4);

        if (this.isDirectionalLight) {
            this.worldposition[3] = 0;
        }
    }

    draw() {
        gl.uniform4fv(this.lightPosition, this.worldposition);
        gl.uniform4fv(this.lightAmbient, this.ambient);
        gl.uniform4fv(this.lightDiffuse, this.diffuse);
        gl.uniform4fv(this.lightSpecular, this.specular);
        
    }
}