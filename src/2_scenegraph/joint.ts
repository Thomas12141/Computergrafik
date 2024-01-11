import { Component } from "./component";
import { Cylinder } from "../3_shapes/cylinder";

/**
 * extends Component
 */
export class Joint extends Component {

    private cylinder: Cylinder;

    /**
     * Creates a new instance of Joint.
     * @param name - The name of the component.
     */
    constructor(name: string, width: GLfloat, height: GLfloat) {
        super(name);
        this.cylinder = new Cylinder(width/2, height);
        this.addChild(this.cylinder);
    }
}
