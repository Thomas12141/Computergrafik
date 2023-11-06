import {Triangle} from "./triangle";
import {vec3} from "gl-matrix";

export class Rectangle{
    /** The first triangle to be drawn in the scene. */
    private readonly triangle1: Triangle;
    /** The second triangle to be drawn in the scene. */
    private readonly triangle2: Triangle;

    constructor(private v1: vec3, private v2: vec3, private v3: vec3, private v4: vec3) {

        this.triangle1 = new Triangle(v1, v2, v3);
        this.triangle2 = new Triangle(v1, v3, v4);
    }

    public draw() {
        this.triangle1.draw();
        this.triangle2.draw();
    }
}