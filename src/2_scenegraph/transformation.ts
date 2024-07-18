import { mat4, vec3 } from "gl-matrix";
import { SGNode } from "./sgnode";
import { Texture } from "../5_texture/texture";

export class Transformation extends SGNode {

    

    setPosition(position: vec3) {
        mat4.translate(this.transformationMatrix,this.transformationMatrix, position);
    }

    rotateX(angle: number) {
        mat4.rotateX(this.transformationMatrix, this.transformationMatrix, angle);
    }

    rotateY(angle: number) {
        mat4.rotateY(this.transformationMatrix, this.transformationMatrix, angle);  
    }

    rotateZ(angle: number) {
        if (!Number.isNaN(angle)) {
            mat4.rotateZ(this.transformationMatrix, this.transformationMatrix, angle);  
        }
    }
}
