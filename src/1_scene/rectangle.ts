import { vec3 } from "gl-matrix";
import { gl, shaderProgram } from "../webgl2";
import { Triangle } from "./triangle";

export class Rectangle
{   //Composition(Rectangle has two Triangles)
    private readonly triangle1 : Triangle; 
    private readonly triangle2 : Triangle;

    constructor(private v1: vec3, private v2: vec3, private v3: vec3,private v4 : vec3) {
     
     this.triangle1 = new Triangle(v1,v2,v3);
     this.triangle2 = new Triangle(v1,v3,v4);
    }
    
    /**
     * Draws the rectangle.
     */
    public draw() {

        //Delegation(to have service from the composition object)
        this.triangle1.draw();
        this.triangle2.draw();
      

              
        
    }


}