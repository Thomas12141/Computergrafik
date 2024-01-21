import { SGNode } from "./sgnode";
import { MatrixStack } from "./matrixstack";
import { mat3, mat4 } from "gl-matrix";
import {gl, shaderProgram} from "../webgl2";
import { Light } from "../4_material_light/light";

/**
 * Represents a scenegraph that can be traversed and drawn.
 */
export class Scenegraph {
	private root: SGNode;
	private logStrings: string[] = [];
	private hasPrinted = false;
	private matrixStack: MatrixStack;
	private readonly mvMatrixUniform: WebGLUniformLocation;
	private readonly uNormalMatrix: WebGLUniformLocation;
	
	/**
	 * Creates a new scenegraph with the given root node.
	 * @param rootNode The root node of the scenegraph.
	 */
	constructor(rootNode: SGNode, private modelViewMatrix: mat4) {
		this.root = rootNode;
		this.matrixStack = new MatrixStack();
		this.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
        this.uNormalMatrix = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
		
	}

	/**
	 * Traverses the given node and its children, logging the traversal to the logStrings array.
	 * @param node The node to traverse.
	 */
	traverse(node: SGNode, time : number): void {		
		const mvMat = mat4.create();
		mat4.multiply(mvMat, this.matrixStack.peak(), node.getTransformationMatrix());
		this.matrixStack.push(mvMat);
		
        gl.uniformMatrix4fv(mvMatrixUniform, false,  mvMat);


		
		const normalMatrix = mat3.create();

		mat3.normalFromMat4(normalMatrix, mvMat);
		gl.uniformMatrix3fv(this.uNormalMatrix, false, normalMatrix);
		gl.uniformMatrix3fv(normalMatrixUniform, false,  mat3.normalFromMat4(mat3.create(),mvMat));

		if (node instanceof Light) {
			node.updatePosition(mvMat);
		}
		this.logStrings.push("{");
		
		const traverse: string = node.toString() + "";
		node.draw(time);

		this.logStrings.push(traverse);

		this.logStrings.push("[");

		for (const child of node.getChildren()) {
			this.traverse(child,time);
		}

		this.matrixStack.pop();

		this.logStrings.push("]");

		this.logStrings.push("},");
	}

	/**
	 * Transform our modelViewMatrix with the transformation matrices on the matrixStack
	 */
	private calculateModelViewMatrix() {
		for (let index = 0; index < this.matrixStack.length(); index++) {
			const currentMatrix = this.matrixStack.pop();
			mat4.multiply(this.modelViewMatrix, this.modelViewMatrix, currentMatrix);
			// console.log("MODEL VIEW MATRIX: "+this.modelViewMatrix);
		}
	}

	private counter: number;
	/**
	 * Draws the scenegraph by traversing it and logging the traversal to the console.
	 */
	draw(time: number): void {
		//if (!this.hasPrinted) {
			this.counter = 0;
			this.logStrings = [];
			// console.log("Zeichne Szenegraph:");
			// console.log("Bspl: {Knoten,[{Kind,[]}]}");

			this.traverse(this.root,time);

			// console.log(this.toString());
			// console.log("Zeichnen des Szenegraphen abgeschlossen.");	

			this.hasPrinted = true;
		//}
	}

	/**
	 * Returns a string representation of the scenegraph.
	 * @returns A string representation of the scenegraph.
	 */
	toString(): string {
		return this.logStrings.join("");
	}
}
