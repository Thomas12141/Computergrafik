import { mat4 } from "gl-matrix";
import { Texture } from "../5_texture/texture";

/**
 * Represents a node in a scene graph.
 */
export class SGNode {
  private children: SGNode[] = [];
	protected transformationMatrix: mat4;

  constructor() {
    this.transformationMatrix = mat4.create();
    mat4.identity(this.transformationMatrix);
}

setTexture(texture: Texture)
    {
        this.addChild(texture);
    }
    
  setTransformationMatrix(transformationMatrix: mat4) {
    this.transformationMatrix = transformationMatrix;
  }

  getTransformationMatrix(): mat4 {
    return this.transformationMatrix;
  }

  /**
   * Returns the children of this node.
   * @returns An array of SGNode objects.
   */
  getChildren(): SGNode[] {
    return this.children;
  }

  /**
   * Adds a child node to this node.
   * @param node The child node to add.
   */
  addChild(node: SGNode): void {
    this.children.push(node);
  }

  /**
   * Removes a child node from this node.
   * @param node The child node to remove.
   */
  removeChild(node: SGNode): void {
    const index = this.children.indexOf(node);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  /**
   * Removes all child nodes from this node.
   */
  removeAllChildren(): void {
    this.children = [];
  }

  /**
   * Draws this node and its children.
   */
  draw(deltaTime : number): void {
    this.children.forEach(child => {
      child.draw(deltaTime);
    });
  }

  toString(): string {
    return "SGNode";
  }
}
