import { vec3 } from "gl-matrix";
import {Rectangle} from "./rectangle";

export class Quader
{
    /** The first rectangle to be drawn in the scene. */
    private readonly rectangle1: Rectangle;
    /** The second rectangle to be drawn in the scene. */
    private readonly rectangle2: Rectangle;
    /** The third rectangle to be drawn in the scene. */
    private readonly rectangle3: Rectangle;
    /** The fourth rectangle to be drawn in the scene. */
    private readonly rectangle4: Rectangle;
    /** The fifth rectangle to be drawn in the scene. */
    private readonly rectangle5: Rectangle;
    /** The sixth rectangle to be drawn in the scene. */
    private readonly rectangle6: Rectangle;
    

    constructor(private v1: vec3, private v2: vec3, private v3: vec3,private v4 : vec3,private v5:vec3,private v6:vec3, private v7 :vec3,private v8:vec3) {
        this.rectangle1 = new Rectangle(v1, v2, v3, v4);
        this.rectangle2 = new Rectangle(v1, v5, v8, v2);
        this.rectangle3 = new Rectangle(v1, v4, v6, v5);
        this.rectangle4 = new Rectangle(v4, v3, v7, v6);
        this.rectangle5 = new Rectangle(v2, v8, v7, v3);
        this.rectangle6 = new Rectangle(v5, v6, v7, v8);
    }


    /**
     * Draws the Quader.
     */
    public draw() {
        this.rectangle1.draw();
        this.rectangle2.draw();
        this.rectangle3.draw();
        this.rectangle4.draw();
        this.rectangle5.draw();
        this.rectangle6.draw();
    }


}