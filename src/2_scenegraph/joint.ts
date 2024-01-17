import { Component } from "./component";
import { Cylinder } from "../3_shapes/cylinder";
import { Texture } from "../5_texture/texture";
import { Material } from "../4_material_light/material";

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
        this.cylinder = new Cylinder(width/2, height,new Material([0.25, 0.25, 0.25, 1.0], [0.2, 0.2, 0.2, 1.0], [0.54, 0.54, 0.54, 1.0], [0.66, 0.66, 0.66, 1.0], 32.0));
        this.addChild(this.cylinder);
    }
}
