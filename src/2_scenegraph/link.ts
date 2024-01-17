import { Cuboid } from "../3_shapes/cuboid";
import { Material } from "../4_material_light/material";
import { Texture } from "../5_texture/texture";
import { Component } from "./component";

/**
 * extends Component
 */
export class Link extends Component {

    private cuboid: Cuboid;
    

    /**
     * Creates a new instance of Link.
     * @param name - The name of the component.
     */
    constructor(name: string, width: GLfloat, height: GLfloat, length: GLfloat) {
        super(name);
        this.cuboid = new Cuboid(width, height, length,new Material([0.25, 0.25, 0.25, 1.0], [0.2, 0.2, 0.2, 1.0], [0.54, 0.54, 0.54, 1.0], [0.66, 0.66, 0.66, 1.0], 32.0));
        this.addChild(this.cuboid);
    }
}
