import { Triangle } from "./triangle";
import { gl, shaderProgram } from "../webgl2";
import { mat4, vec3 } from "gl-matrix";
import { Rectangle } from "./rectangle";
import { Quader } from "./quader";
import { Keyboard } from "../1_controls/keyboard";
import { Cylinder } from "./zylinder";

/**
 * Represents a scene to be rendered in WebGL.
 */
export class Scene {
    /** The uniform location of the projection matrix. */
    private readonly pMatrixUniform: WebGLUniformLocation;

    /** The uniform location of the model view matrix. */
    private readonly mvMatrixUniform: WebGLUniformLocation;

    /** The model view matrix. */
    private readonly modelViewMatrix: mat4;

    /** The projection matrix. */
    private readonly projectionMatrix: mat4;

    /** The triangle to be drawn in the scene. */
    private readonly triangle: Triangle;
    private readonly rectangle: Rectangle;
    private readonly quader : Quader;

    private readonly cylinder : Cylinder;

    private rotationMatrix : mat4;
    /**
     * Creates a new Scene object.
     */
    public constructor() {



        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        this.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        this.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");

        this.modelViewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();
        this.rotationMatrix = mat4.create();

      




        new Keyboard((keyCode) => this.keyControl(keyCode));

        // Zusammensetzen eines Dreiecks

   /*    const v1 = vec3.create();
=======
        /*const v1 = vec3.create();

        vec3.set(v1, -0.75, 0.75, 0.0);

        const v2 = vec3.create();
        vec3.set(v2, -0.75, -0.75, 0.0);

        const v3 = vec3.create();
        vec3.set(v3, 0.75, -0.75, 0.0);
<<<<<<< HEAD
        
         this.triangle = new Triangle(v1,v2,v3);


       */ 

       //  Zusammensetzen eines Vierecks
 /*      const v1 = vec3.create();
        vec3.set(v1, -0.75, 0.75, 0.0);

        const v2 = vec3.create();
        vec3.set(v2, -0.75, -0.75, 0.0);

        const v3 = vec3.create();
        vec3.set(v3, 0.75, -0.75, 0.0);

        const v4 = vec3.create();
        vec3.set(v4, 0.75, 0.75, 0.0);

       
       
        this.rectangle = new Rectangle(v1, v2, v3,v4);

        
*/
       
        // Zusammensetzen eines Quaders

 /*     const v1 = vec3.create(); // Vorderseite, oben links
        vec3.set(v1, -0.5, 0.5, 0.5);

        const v2 = vec3.create(); // Vorderseite, unten links
        vec3.set(v2, -0.5, -0.5, 0.5);

        const v3 = vec3.create(); // Vorderseite, unten rechts
        vec3.set(v3, 0.5, -0.5, 0.5);

        const v4 = vec3.create(); // Vorderseite, oben rechts
        vec3.set(v4, 0.5, 0.5, 0.5);

        const v5 = vec3.create(); // Rückseite, oben links
        vec3.set(v5, -0.5, 0.5, -0.5);

        const v6 = vec3.create(); // Rückseite, oben rechts
        vec3.set(v6, 0.5, 0.5, -0.5);

        const v7 = vec3.create(); // Rückseite, unten rechts
        vec3.set(v7, 0.5, -0.5, -0.5);

        const v8 = vec3.create(); // Rückseite, unten rechts
        vec3.set(v8, -0.5, -0.5, -0.5);
        */

      //  this.quader = new Quader(0.5,0.5,1.0);
        
        const cylinderBaseCenter = vec3.fromValues(0.0,0.0,0.0);
     
        this.cylinder = new Cylinder(cylinderBaseCenter, 0.5, 0.5,50);


    }

    private keyControl(keyCode : string)
    {
        switch(keyCode){
            case "ArrowLeft":
                mat4.rotateY(this.rotationMatrix,this.rotationMatrix,0.1);
                break;
            case "ArrowRight" :
                mat4.rotateY(this.rotationMatrix,this.rotationMatrix,-0.1);
                break;
            case "ArrowDown":
                mat4.rotateX(this.rotationMatrix,this.rotationMatrix,0.1);
                break;
            case "ArrowUp" :
                mat4.rotateX(this.rotationMatrix,this.rotationMatrix,-0.1);
                break;
            }
            console.log("keyCode : " + keyCode);
    }




    /**
     * Draws the scene.
     */
    public draw(): void {
       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



        mat4.identity(this.modelViewMatrix);
        mat4.identity(this.projectionMatrix);
        mat4.multiply(this.modelViewMatrix, this.modelViewMatrix, this.rotationMatrix);


        gl.uniformMatrix4fv(this.pMatrixUniform, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.mvMatrixUniform, false, this.modelViewMatrix);



        //this.rectangle.draw();
        //this.triangle.draw();
      //  this.quader.draw();
        this.cylinder.draw(this.modelViewMatrix,this.projectionMatrix);

    }
    
}
