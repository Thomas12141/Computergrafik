import { vec4 } from "gl-matrix";
import { gl, shaderProgram, } from "../webgl2";
import { SGNode } from "../2_scenegraph/sgnode";


export class Material {
    emission:vec4;
    ambient: vec4;
    diffuse: vec4;
    specular: vec4;
    shininess: number;

    materialEmission:WebGLUniformLocation;
    materialAmbient:WebGLUniformLocation;
    materialDiffuse:WebGLUniformLocation;
    materialSpecular:WebGLUniformLocation;
    materialShininess:WebGLUniformLocation;


    constructor(emission:vec4, ambient:vec4, diffuse:vec4, specular:vec4, shininess:number) {
       
        this.emission = emission;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;

        this.materialEmission = gl.getUniformLocation(shaderProgram, "uMaterialEmission");
        this.materialAmbient = gl.getUniformLocation(shaderProgram, "uMaterialAmbient");
        this.materialDiffuse = gl.getUniformLocation(shaderProgram, "uMaterialDiffuse");
        this.materialSpecular = gl.getUniformLocation(shaderProgram, "uMaterialSpecular");
        this.materialShininess = gl.getUniformLocation(shaderProgram, "uMaterialShininess");
    }

    draw() {
        gl.uniform4fv(this.materialEmission, this.emission);
        gl.uniform4fv(this.materialAmbient, this.ambient);
        gl.uniform4fv(this.materialDiffuse, this.diffuse);
        gl.uniform4fv(this.materialSpecular, this.specular);
        gl.uniform1f(this.materialShininess, this.shininess);
    }
}